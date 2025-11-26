package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
    private Long id;
    private Long clientId;
    private Long paymentMethodId;
    private LocalDateTime createdAt;
    private String status;
    private BigDecimal total;
    private List<OrderItemDto> items;
}