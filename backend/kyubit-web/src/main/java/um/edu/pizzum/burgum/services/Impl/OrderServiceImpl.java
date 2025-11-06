package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.OrderRequestDto;
import um.edu.pizzum.burgum.dto.OrderResponseDto;
import um.edu.pizzum.burgum.entities.*;
import um.edu.pizzum.burgum.exceptions.ResourceNotFoundException;
import um.edu.pizzum.burgum.repository.*;
import um.edu.pizzum.burgum.services.OrderService;
import um.edu.pizzum.burgum.services.PaymentSimulator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final CreationRepository creationRepository;
    private final PaymentMethodsRepository paymentMethodsRepository;
    private final IngredientRepository ingredientRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final PaymentSimulator paymentSimulator;

    @Override
    @Transactional
    public OrderResponseDto placeOrder(OrderRequestDto request) {
        // 1) Validar creation
        if (request.getCreationId() == null) {
            return new OrderResponseDto(null, "REJECTED", "creationId is required");
        }
        Creation creation = creationRepository.findById(request.getCreationId())
                .orElseThrow(() -> new ResourceNotFoundException("Creation", "id", request.getCreationId()));

        // 2) Validar payment method (si viene)
        PaymentMethod pm = null;
        if (request.getPaymentMethodId() != null) {
            pm = paymentMethodsRepository.findById(request.getPaymentMethodId())
                    .orElseThrow(() -> new ResourceNotFoundException("PaymentMethod", "id", request.getPaymentMethodId()));
            if (!pm.getUser().getId().equals(request.getUserId()) && request.getUserId() != null) {
                // opcional: asegurar que el payment method pertenezca al cliente
                // no hacemos rejections estrictas aquí, sólo advertimos (si querés forzar, descomenta)
                // throw new IllegalArgumentException("Payment method does not belong to user");
            }
        }

        // 3) Resolver cliente (user) — Order.client es non-null (según tu entidad)
        User client = null;
        if (request.getUserId() != null) {
            client = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.getUserId()));
        } else if (pm != null && pm.getUser() != null) {
            client = pm.getUser();
        } else {
            return new OrderResponseDto(null, "REJECTED", "userId is required (or payment method with user)");
        }

        // 4) Simular pago (90% approve)
        boolean approved = paymentSimulator.approve();

        if (!approved) {
            // crear orden REJECTED para auditar (opcional)
            Order rejectedOrder = Order.builder()
                    .client(client)
                    .paymentMethod(pm)
                    .createdAt(LocalDateTime.now())
                    .status("REJECTED")
                    .build();
            Order savedRejected = orderRepository.save(rejectedOrder);
            return new OrderResponseDto(savedRejected.getId(), "REJECTED", "Payment rejected by simulator");
        }

        // 5) Antes de decrementar, comprobamos stock de todos los ingredientes
        // Recogemos referencias persistidas de cada ingrediente
        List<Ingredient> persistedIngredients = new ArrayList<>();
        for (Ingredient ing : creation.getIngredients()) {
            Ingredient persisted = ingredientRepository.findById(ing.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ingredient", "id", ing.getId()));
            persistedIngredients.add(persisted);
        }

        // 6) Comprobar stock suficiente
        for (Ingredient p : persistedIngredients) {
            if (p.getStock() == null || p.getStock() <= 0) {
                return new OrderResponseDto(null, "REJECTED", "Insufficient stock for ingredient id: " + p.getId());
            }
        }

        // 7) Decrementar stock (1 unidad por ingrediente)
        for (Ingredient p : persistedIngredients) {
            p.setStock(p.getStock() - 1);
            ingredientRepository.save(p);
        }

        // 8) Crear orden APPROVED y su OrderItem
        // calcular unitPrice como suma de costos de ingredientes (puedes cambiar la lógica)
        int sumCost = persistedIngredients.stream().mapToInt(Ingredient::getCost).sum();
        BigDecimal unitPrice = BigDecimal.valueOf(sumCost);

        Order order = Order.builder()
                .client(client)
                .paymentMethod(pm)
                .createdAt(LocalDateTime.now())
                .status("APPROVED")
                .build();
        Order savedOrder = orderRepository.save(order);

        OrderItem item = OrderItem.builder()
                .order(savedOrder)
                .creation(creation)
                .quantity(1)
                .unitPrice(unitPrice)
                .build();
        OrderItem savedItem = orderItemRepository.save(item);

        // actualizar la lista en la orden
        savedOrder.getItems().add(savedItem);
        orderRepository.save(savedOrder);

        return new OrderResponseDto(savedOrder.getId(), "APPROVED", "Order placed successfully");
    }
}
