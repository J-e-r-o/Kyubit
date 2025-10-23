package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.edu.pizzum.burgum.entities.Creation;
import um.edu.pizzum.burgum.entities.Order;

import java.math.BigDecimal;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {

    private Long id;
    private Order order;
    private Creation creation;
    private Integer quantity;
    private BigDecimal unitPrice;

}
