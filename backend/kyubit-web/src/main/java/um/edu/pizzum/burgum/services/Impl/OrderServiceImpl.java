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
import um.edu.pizzum.burgum.services.Impl.PaymentMockService; // Asegúrate que importe el correcto (no el de Impl)
import um.edu.pizzum.burgum.repository.PaymentMethodsRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CreationService creationService;
    private final CreationRepository creationRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressRepository addressRepository;
    private final PaymentMethodsRepository paymentMethodRepository; // Corregí el nombre (suele ser singular/plural checkea tu repo)
    private final PaymentMockService paymentMockService;

    @Override
    @Transactional
    public OrderDto addItemToOrder(AddItemRequest request) {
        // 1. Validar Usuario
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. Guardar la Creación
        request.getCreation().setUserId(user.getId());
        CreationDto savedCreation = creationService.create(request.getCreation());

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

        order.getItems().add(item);
        return OrderMapper.mapToOrderDto(order);
    }

    @Override
    public OrderDto getCartByUserId(Long userId) {
        Order order = orderRepository.findByClient_IdAndStatus(userId, "CART")
                .orElseThrow(() -> new RuntimeException("No hay carrito activo"));
        return OrderMapper.mapToOrderDto(order);
    }

    @Override
    @Transactional
    public void removeItemFromOrder(Long itemId) {
        // LÓGICA DE BORRADO ROBUSTA (Romper relación bidireccional)
        OrderItem itemToDelete = orderItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item no encontrado"));

        Order parentOrder = itemToDelete.getOrder();

        // 1. Sacarlo de la lista del padre
        if (parentOrder != null) {
            parentOrder.getItems().removeIf(i -> i.getId().equals(itemId));
            orderRepository.save(parentOrder);
        }

        // 2. Dejarlo huérfano explícitamente
        itemToDelete.setOrder(null);

        // 3. Borrar
        orderItemRepository.delete(itemToDelete);
    }

    @Override
    @Transactional
    public OrderDto confirmOrder(Long orderId, ConfirmOrderRequest request) {
        // 1. Buscar y Validar Orden
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Orden no encontrada"));

        if (!"CART".equals(order.getStatus())) {
            throw new RuntimeException("Esta orden no está activa");
        }

        // 2. Buscar Datos
        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

        PaymentMethod payment = paymentMethodRepository.findById(request.getPaymentMethodId())
                .orElseThrow(() -> new RuntimeException("Método de pago no encontrado"));

        // 3. PROCESAR PAGO (MOCK) - ¡ESTO FALTABA!
        // Calculamos total para simular el monto
        double totalAmount = order.getItems().stream()
                .mapToDouble(i -> i.getUnitPrice().doubleValue() * i.getQuantity())
                .sum();

        // Llamamos al servicio. Si la tarjeta es '0000' o falla el random,
        // lanzará Exception y hará Rollback (no se guardará nada abajo).
        paymentMockService.processPayment(payment, totalAmount);

        // 4. ACTUALIZAR Y GUARDAR
        // Si llegamos aquí, el pago pasó.
        order.setDeliveryAddress(address);
        order.setPaymentMethod(payment);
        order.setStatus("CONFIRMED");

        Order savedOrder = orderRepository.save(order);

        return OrderMapper.mapToOrderDto(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> getUserOrderHistory(Long userId) {
        // 1. Traemos todo lo del usuario ordenado por fecha
        List<Order> allOrders = orderRepository.findAllByClient_IdOrderByCreatedAtDesc(userId);

        // 2. Filtramos: Excluir lo que esté en "CART" (porque eso es el carrito actual, no historial)
        // y Mapeamos a DTO
        return allOrders.stream()
                .filter(order -> !"CART".equals(order.getStatus())) // Solo confirmadas
                .map(OrderMapper::mapToOrderDto)
                .collect(Collectors.toList());
    }
}