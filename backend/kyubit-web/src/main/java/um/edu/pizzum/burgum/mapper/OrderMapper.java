package um.edu.pizzum.burgum.mapper;

import org.springframework.stereotype.Component;
import um.edu.pizzum.burgum.dto.OrderDto;
import um.edu.pizzum.burgum.dto.OrderItemDto;
import um.edu.pizzum.burgum.entities.Order;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    public static OrderDto mapToOrderDto(Order order) {
        if (order == null) return null;

        List<OrderItemDto> itemsDto = order.getItems().stream()
                .map(OrderItemMapper::mapToDto)
                .collect(Collectors.toList());

        BigDecimal total = itemsDto.stream()
                .map(item -> item.getUnitPrice().multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return OrderDto.builder()
                .id(order.getId())
                .clientId(order.getClient() != null ? order.getClient().getId() : null)
                .paymentMethodId(order.getPaymentMethod() != null ? order.getPaymentMethod().getId() : null)
                .createdAt(order.getCreatedAt())
                .status(order.getStatus())
                .items(itemsDto)
                .total(total)
                .build();
    }

    public static Order mapToOrder(OrderDto orderDto) {
        if (orderDto == null) return null;

        User clientHolder = (orderDto.getClientId() != null) ? User.builder().id(orderDto.getClientId()).build() : null;
        PaymentMethod pmHolder = (orderDto.getPaymentMethodId() != null) ? PaymentMethod.builder().id(orderDto.getPaymentMethodId()).build() : null;

        return Order.builder()
                .id(orderDto.getId())
                .client(clientHolder)
                .paymentMethod(pmHolder)
                .createdAt(orderDto.getCreatedAt())
                .status(orderDto.getStatus())
                .build();
    }
}