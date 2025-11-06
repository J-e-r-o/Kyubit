package um.edu.pizzum.burgum.dto;

import lombok.Data;

@Data
public class CartItemDto {
    private Long id;
    private Long creationId;
    private String creationName;
    private Integer quantity;
}
