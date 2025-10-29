package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.OrderItemDto;
import um.edu.pizzum.burgum.entities.Creation;
import um.edu.pizzum.burgum.entities.Order;
import um.edu.pizzum.burgum.entities.OrderItem;

import java.util.List;
import java.util.stream.Collectors;

public class OrderItemMapper {


    public static OrderItemDto mapToDto(OrderItem entity) {
        if (entity == null) {
            return null;
        }

        // 1. Extraer IDs (con chequeo de nulidad)
        Long orderId = (entity.getOrder() != null) ? entity.getOrder().getId() : null;
        Long creationId = (entity.getCreation() != null) ? entity.getCreation().getId() : null;

        return OrderItemDto.builder()
                .id(entity.getId())
                .orderId(orderId)
                .creationId(creationId)
                .quantity(entity.getQuantity())
                .unitPrice(entity.getUnitPrice())
                .build();
    }


    public static OrderItem mapToEntity(OrderItemDto dto) {
        if (dto == null) {
            return null;
        }

        Order orderPlaceHolder = (dto.getOrderId() != null)
                ? Order.builder().id(dto.getOrderId()).build()
                : null;

        Creation creationPlaceHolder = (dto.getCreationId() != null)
                ? Creation.builder().id(dto.getCreationId()).build()
                : null;

        return OrderItem.builder()
                .id(dto.getId())
                .order(orderPlaceHolder) // Placeholder
                .creation(creationPlaceHolder) // Placeholder
                .quantity(dto.getQuantity())
                .unitPrice(dto.getUnitPrice())
                .build();
    }

    // --- Métodos de utilidad para Listas ---

    public static List<OrderItemDto> mapToDtoList(List<OrderItem> entities) {
        return entities.stream()
                .map(OrderItemMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public static List<OrderItem> mapToEntityList(List<OrderItemDto> dtos) {
        return dtos.stream()
                .map(OrderItemMapper::mapToEntity)
                .collect(Collectors.toList());
    }
}