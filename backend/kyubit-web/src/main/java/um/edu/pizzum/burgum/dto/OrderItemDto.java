package um.edu.pizzum.burgum.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDto {

    private Long id;


    private Long orderId;
    private Long creationId;

    private Integer quantity;
    private BigDecimal unitPrice;
}