package um.edu.pizzum.burgum.mapper;

import org.springframework.stereotype.Component; // Para inyectar en Spring
import um.edu.pizzum.burgum.dto.OrderDto;
import um.edu.pizzum.burgum.dto.OrderItemDto;
import um.edu.pizzum.burgum.entities.Order;
import um.edu.pizzum.burgum.entities.OrderItem;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Mapper que convierte entre Order Entity y Order DTO.
 * Es una clase @Component para permitir la inyección de OrderItemMapper.
 */
@Component // Lo convertimos en un bean de Spring
public class OrderMapper {

    /**
     * Convierte la Entidad (Order) al DTO (OrderDto).
     * Extrae IDs y mapea la colección de items a DTOs.
     */
    public static OrderDto mapToOrderDto (Order order){
        if (order == null) {
            return null;
        }

        // 1. Extracción de IDs (con chequeo de nulidad)
        Long clientId = (order.getClient() != null) ? order.getClient().getId() : null;
        Long paymentMethodId = (order.getPaymentMethod() != null) ? order.getPaymentMethod().getId() : null;

        // 2. Mapeo de la colección de items (Entity List -> DTO List)
        List<OrderItemDto> itemsDto = order.getItems().stream()
                .map(OrderItemMapper::mapToDto) // ¡Reutilizamos el mapper de OrderItem!
                .collect(Collectors.toList());

        return OrderDto.builder()
                .id(order.getId())
                .clientId(clientId)
                .paymentMethodId(paymentMethodId)
                .createdAt(order.getCreatedAt())
                .status(order.getStatus())
                .items(itemsDto)
                .build();
    }


    /**
     * Convierte el DTO (OrderDto) a la Entidad (Order).
     * ⚠️ ATENCIÓN: Crea 'placeholders' para Client y PaymentMethod.
     * La capa de servicio DEBE buscar y asignar las entidades completas.
     * También, los items DTO deben ser convertidos a entidades OrderItem (placeholders o completas).
     */
    public static Order mapToOrder (OrderDto orderDto){
        if (orderDto == null) {
            return null;
        }

        // 1. Crear placeholders para User y PaymentMethod
        User clientPlaceHolder = (orderDto.getClientId() != null)
                ? User.builder().id(orderDto.getClientId()).build()
                : null;

        PaymentMethod paymentMethodPlaceHolder = (orderDto.getPaymentMethodId() != null)
                ? PaymentMethod.builder().id(orderDto.getPaymentMethodId()).build()
                : null;

        // 2. Mapeo de la colección de items (DTO List -> Entity List)
        // NOTA: Estos OrderItem serán *placeholders* que el servicio debe manejar.
        List<OrderItem> itemsEntity = orderDto.getItems().stream()
                .map(OrderItemMapper::mapToEntity) // Reutilizamos el mapper de OrderItem
                .collect(Collectors.toList());

        // 3. Usar el constructor de la Entidad (usando @Builder porque tienes Lombok)
        return Order.builder()
                .id(orderDto.getId())
                .client(clientPlaceHolder)
                .paymentMethod(paymentMethodPlaceHolder)
                .createdAt(orderDto.getCreatedAt())
                .status(orderDto.getStatus())
                .items(itemsEntity) // La lista de OrderItem placeholders
                .build();
    }

    // --- Métodos de utilidad para Listas ---

    public static List<OrderDto> mapToDtoList(List<Order> entities) {
        return entities.stream()
                .map(OrderMapper::mapToOrderDto)
                .collect(Collectors.toList());
    }

    public static List<Order> mapToEntityList(List<OrderDto> dtos) {
        return dtos.stream()
                .map(OrderMapper::mapToOrder)
                .collect(Collectors.toList());
    }
}