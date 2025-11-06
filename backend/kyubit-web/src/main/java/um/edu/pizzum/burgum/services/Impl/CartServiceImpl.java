package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.*;
import um.edu.pizzum.burgum.entities.*;
import um.edu.pizzum.burgum.exceptions.ResourceNotFoundException;
import um.edu.pizzum.burgum.repository.*;
import um.edu.pizzum.burgum.services.CartService;
import um.edu.pizzum.burgum.services.PaymentSimulator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final CreationRepository creationRepository;
    private final IngredientRepository ingredientRepository;
    private final PaymentMethodsRepository paymentMethodsRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentSimulator paymentSimulator;

    @Override
    @Transactional(readOnly = true)
    public CartDto getCartByUser(Long userId) {
        Cart cart = cartRepository.findByUser_Id(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));
        return mapToDto(cart);
    }

    @Override
    @Transactional
    public CartDto createCartForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        // si ya existe devolvemos la existente
        Optional<Cart> existing = cartRepository.findByUser_Id(userId);
        if (existing.isPresent()) return mapToDto(existing.get());

        Cart cart = Cart.builder()
                .user(user)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        Cart saved = cartRepository.save(cart);
        return mapToDto(saved);
    }

    @Override
    @Transactional
    public CartItemDto addItemToCart(Long userId, AddCartItemRequest req) {
        if (req.getCreationId() == null) throw new IllegalArgumentException("creationId required");
        if (req.getQuantity() == null || req.getQuantity() <= 0) req.setQuantity(1);

        Cart cart = cartRepository.findByUser_Id(userId).orElseGet(() -> {
            // create a cart if not exists
            Cart newCart = new Cart();
            User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
            newCart.setUser(user);
            newCart.setCreatedAt(LocalDateTime.now());
            newCart.setUpdatedAt(LocalDateTime.now());
            return cartRepository.save(newCart);
        });

        Creation creation = creationRepository.findById(req.getCreationId())
                .orElseThrow(() -> new ResourceNotFoundException("Creation", "id", req.getCreationId()));

        // si ya existe un item para la misma creation, acumulamos
        Optional<CartItem> existing = cart.getItems().stream()
                .filter(i -> i.getCreation().getId().equals(req.getCreationId()))
                .findFirst();

        CartItem item;
        if (existing.isPresent()) {
            item = existing.get();
            item.setQuantity(item.getQuantity() + req.getQuantity());
        } else {
            item = CartItem.builder()
                    .cart(cart)
                    .creation(creation)
                    .quantity(req.getQuantity())
                    .build();
            cart.getItems().add(item);
        }
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart); // cascade persists item

        // map to DTO
        CartItemDto dto = new CartItemDto();
        dto.setId(item.getId());
        dto.setCreationId(creation.getId());
        dto.setCreationName(creation.getName());
        dto.setQuantity(item.getQuantity());
        return dto;
    }

    @Override
    @Transactional
    public CartDto updateCartItem(Long userId, Long itemId, UpdateCartItemRequest req) {
        Cart cart = cartRepository.findByUser_Id(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("CartItem", "id", itemId));
        if (req.getQuantity() == null || req.getQuantity() <= 0) throw new IllegalArgumentException("quantity must be > 0");
        item.setQuantity(req.getQuantity());
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);
        return mapToDto(cart);
    }

    @Override
    @Transactional
    public void removeItemFromCart(Long userId, Long itemId) {
        Cart cart = cartRepository.findByUser_Id(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("CartItem", "id", itemId));
        cart.getItems().remove(item);
        cartItemRepository.delete(item);
        cart.setUpdatedAt(LocalDateTime.now());
        cartRepository.save(cart);
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        cartRepository.findByUser_Id(userId).ifPresent(cart -> {
            cart.getItems().clear();
            cartRepository.save(cart);
        });
    }

    /**
     * Checkout: valida stock para **todos** los ingredientes acumulados,
     * llama al PaymentSimulator UNA vez, decrementa stocks, crea una sola Order con varios OrderItem.
     */
    @Override
    @Transactional
    public um.edu.pizzum.burgum.dto.OrderResponseDto checkout(Long userId, CheckoutRequestDto req) {
        Cart cart = cartRepository.findByUser_Id(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart", "userId", userId));

        if (cart.getItems().isEmpty()) {
            return new um.edu.pizzum.burgum.dto.OrderResponseDto(null, "REJECTED", "Cart is empty");
        }

        // resolve client
        User client = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));

        // validate payment method if provided
        PaymentMethod pm = null;
        if (req.getPaymentMethodId() != null) {
            pm = paymentMethodsRepository.findById(req.getPaymentMethodId())
                    .orElseThrow(() -> new ResourceNotFoundException("PaymentMethod", "id", req.getPaymentMethodId()));
            // optional: validate ownership
            if (pm.getUser() != null && !pm.getUser().getId().equals(userId)) {
                return new um.edu.pizzum.burgum.dto.OrderResponseDto(null, "REJECTED", "Payment method does not belong to user");
            }
        }

        // 1) CALCULAR requerimiento total por ingrediente (sumando cantidades por creation*quantity)
        Map<Long, Integer> ingredientRequired = new HashMap<>(); // ingredientId -> required units
        // también construir lista de creations y cantidades para crear order items luego
        List<CartItem> itemsSnapshot = new ArrayList<>(cart.getItems());

        for (CartItem ci : itemsSnapshot) {
            Creation creation = creationRepository.findById(ci.getCreation().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Creation", "id", ci.getCreation().getId()));

            int quantityOfCreation = ci.getQuantity() == null ? 1 : ci.getQuantity();

            for (Ingredient ing : creation.getIngredients()) {
                ingredientRequired.merge(ing.getId(), quantityOfCreation, Integer::sum);
            }
        }

        // 2) cargar ingredientes y verificar stock
        Map<Long, Ingredient> persistedIngredients = new HashMap<>();
        for (Map.Entry<Long, Integer> e : ingredientRequired.entrySet()) {
            Ingredient p = ingredientRepository.findById(e.getKey())
                    .orElseThrow(() -> new ResourceNotFoundException("Ingredient", "id", e.getKey()));
            if (p.getStock() == null || p.getStock() < e.getValue()) {
                return new um.edu.pizzum.burgum.dto.OrderResponseDto(null, "REJECTED",
                        "Insufficient stock for ingredient id: " + p.getId());
            }
            persistedIngredients.put(p.getId(), p);
        }

        // 3) Simular pago UNA vez
        boolean approved = paymentSimulator.approve();
        if (!approved) {
            Order rejectedOrder = Order.builder()
                    .client(client)
                    .paymentMethod(pm)
                    .createdAt(LocalDateTime.now())
                    .status("REJECTED")
                    .build();
            Order savedRejected = orderRepository.save(rejectedOrder);
            return new um.edu.pizzum.burgum.dto.OrderResponseDto(savedRejected.getId(), "REJECTED", "Payment rejected by simulator");
        }

        // 4) Decrementar stock según ingredientRequired
        for (Map.Entry<Long, Integer> e : ingredientRequired.entrySet()) {
            Ingredient p = persistedIngredients.get(e.getKey());
            p.setStock(p.getStock() - e.getValue());
            ingredientRepository.save(p);
        }

        // 5) Crear orden APPROVED
        Order order = Order.builder()
                .client(client)
                .paymentMethod(pm)
                .createdAt(LocalDateTime.now())
                .status("APPROVED")
                .build();
        Order savedOrder = orderRepository.save(order);

        // 6) Crear OrderItems (uno por CartItem)
        for (CartItem ci : itemsSnapshot) {
            Creation creation = creationRepository.findById(ci.getCreation().getId()).orElseThrow();
            // calcular unit price = suma de costs de ingredientes de la creation
            int sumCost = creation.getIngredients().stream().mapToInt(Ingredient::getCost).sum();
            BigDecimal unitPrice = BigDecimal.valueOf(sumCost);

            OrderItem oi = OrderItem.builder()
                    .order(savedOrder)
                    .creation(creation)
                    .quantity(ci.getQuantity())
                    .unitPrice(unitPrice)
                    .build();
            orderItemRepository.save(oi);
            savedOrder.getItems().add(oi);
        }
        orderRepository.save(savedOrder);

        // 7) vaciar carrito (o eliminarlo)
        cart.getItems().clear();
        cartRepository.save(cart);

        return new um.edu.pizzum.burgum.dto.OrderResponseDto(savedOrder.getId(), "APPROVED", "Checkout successful");
    }

    // Helper mapper
    private CartDto mapToDto(Cart cart) {
        CartDto dto = new CartDto();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUser().getId());
        dto.setCreatedAt(cart.getCreatedAt());
        dto.setUpdatedAt(cart.getUpdatedAt());
        List<CartItemDto> itemDtos = cart.getItems().stream().map(i -> {
            CartItemDto it = new CartItemDto();
            it.setId(i.getId());
            it.setCreationId(i.getCreation().getId());
            it.setCreationName(i.getCreation().getName());
            it.setQuantity(i.getQuantity());
            return it;
        }).collect(Collectors.toList());
        dto.setItems(itemDtos);
        dto.setTotalItems(itemDtos.stream().mapToInt(CartItemDto::getQuantity).sum());
        return dto;
    }
}
