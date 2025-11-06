package um.edu.pizzum.burgum.dto;

import lombok.Data;

@Data
public class CheckoutRequestDto {
    private Long paymentMethodId;
    private Long userId;
}
