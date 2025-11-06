package um.edu.pizzum.burgum.dto;

import lombok.Data;

@Data
public class OrderRequestDto {
    private Long creationId;
    private Long paymentMethodId;
    private Long userId;

}
