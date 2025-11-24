package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.AddItemRequest;
import um.edu.pizzum.burgum.dto.ConfirmOrderRequest;
import um.edu.pizzum.burgum.dto.CreationDto;
import um.edu.pizzum.burgum.dto.OrderDto;
import um.edu.pizzum.burgum.entities.*;
import um.edu.pizzum.burgum.mapper.OrderMapper;
import um.edu.pizzum.burgum.repository.*;
import um.edu.pizzum.burgum.services.CreationService;
import um.edu.pizzum.burgum.services.OrderService;
import um.edu.pizzum.burgum.services.Impl.PaymentMockService;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CreationService creationService;
    private final CreationRepository creationRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressRepository addressRepository;
    private final PaymentMethodsRepository paymentMethodRepository;
    private final PaymentMockService paymentMockService;

    @Override
    @Transactional
    public OrderDto addItemToOrder(AddItemRequest request) {
        // 1. Validar Usuario
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Guardar la Creación (Pizza)
        request.getCreation().setUserId(user.getId());
        CreationDto savedCreation = creationService.create(request.getCreation());

        // Recuperar entidad Creation para vincular
        Creation creationEntity = creationRepository.findById(savedCreation.getId())
                .orElseThrow(() -> new RuntimeException("Error al guardar creación"));

        // 3. Buscar o Crear Orden (CART)
        Order order = orderRepository.findByClient_IdAndStatus(user.getId(), "CART")
                .orElseGet(() -> {
                    Order newOrder = Order.builder()
                            .client(user)
                            .status("CART")
                            .createdAt(LocalDateTime.now())
                            .build();
                    return orderRepository.save(newOrder);
                });

        // 4. Crear Item y Guardar
        OrderItem item = OrderItem.builder()
                .order(order)
                .creation(creationEntity)
                .quantity(request.getQuantity())
                .unitPrice(request.getUnitPrice())
                .build();

        orderItemRepository.save(item);

        // Actualizar memoria para retorno correcto
        order.getItems().add(item);
        return OrderMapper.mapToOrderDto(order);
    }

    @Override
    public OrderDto getCartByUserId(Long userId) {
        Order order = orderRepository.findByClient_IdAndStatus(userId, "CART")
                .orElseThrow(() -> new RuntimeException("No hay carrito activo para este usuario"));
        return OrderMapper.mapToOrderDto(order);
    }

    @Override
    @Transactional
    public void removeItemFromOrder(Long itemId) {
        // 1. Buscar el Item
        OrderItem item = orderItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        // 2. Obtener la Orden Padre
        Order order = item.getOrder();

        // 3. CRUCIAL: Remover el item de la lista de la Orden
        // Usamos removeIf para evitar problemas de equals/hashCode con Lombok
        boolean removed = order.getItems().removeIf(i -> i.getId().equals(itemId));

        if (removed) {
            // 4. Guardar la Orden.
            // Al tener orphanRemoval=true, JPA detecta que falta un item y lo borra de la BD.
            orderRepository.save(order);
        } else {
            // Fallback por si acaso no estaba en la lista pero sí en BD (raro)
            orderItemRepository.delete(item);
        }


    }

    @Override
    @Transactional
    public OrderDto confirmOrder(Long orderId, ConfirmOrderRequest request) {
        // 1. Validaciones (Igual que antes)
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Dirección no válida"));

        PaymentMethod payment = paymentMethodRepository.findById(request.getPaymentMethodId())
                .orElseThrow(() -> new RuntimeException("Método de pago no válido"));

        // 2. SIMULACIÓN DE PAGO (Nuevo Paso)
        // Calculamos el total (asegúrate de tener un método para esto o usar el del DTO)
        double totalAmount = order.getItems().stream()
                .mapToDouble(item -> item.getUnitPrice().doubleValue() * item.getQuantity())
                .sum();

        // Llamamos a la pasarela falsa. Si falla, lanza Exception y corta el flujo aquí.
        try {
            paymentMockService.processPayment(payment, totalAmount);
        } catch (RuntimeException e) {
            // Opcional: Podrías guardar un log de intento fallido
            throw new RuntimeException("Pago Rechazado: " + e.getMessage());
        }

        // 3. Si llegamos acá, el pago fue exitoso. Guardamos.
        order.setDeliveryAddress(address);
        order.setPaymentMethod(payment);
        order.setStatus("CONFIRMED");

        Order savedOrder = orderRepository.save(order);
        return OrderMapper.mapToOrderDto(savedOrder);
    }

}