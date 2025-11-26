package um.edu.pizzum.burgum.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AddItemRequest {

    private Long userId;


    private CreationDto creation;

    private Integer quantity;
    private BigDecimal unitPrice;
}