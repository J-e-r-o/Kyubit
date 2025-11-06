package um.edu.pizzum.burgum.dto;

import lombok.Data;

@Data
public class AddCartItemRequest {
    private Long creationId;
    private Integer quantity = 1;
}
