package um.edu.pizzum.burgum.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AddItemRequest { // Renombrado de CreateOrderRequest

    private Long userId;

    // Una sola creación, porque el usuario agrega una cosa a la vez
    private CreationDto creation;

    private Integer quantity;
    private BigDecimal unitPrice;
}