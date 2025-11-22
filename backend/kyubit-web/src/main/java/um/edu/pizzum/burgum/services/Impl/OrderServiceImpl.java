package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.AddItemRequest;
import um.edu.pizzum.burgum.dto.CreationDto;
import um.edu.pizzum.burgum.dto.OrderDto;
import um.edu.pizzum.burgum.entities.*;
import um.edu.pizzum.burgum.mapper.OrderMapper;
import um.edu.pizzum.burgum.repository.*;
import um.edu.pizzum.burgum.services.CreationService;
import um.edu.pizzum.burgum.services.OrderService;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CreationService creationService;
    private final CreationRepository creationRepository;
    private final OrderItemRepository orderItemRepository;

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
}