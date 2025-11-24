package um.edu.pizzum.burgum.dto;

import lombok.Data;

@Data
public class ConfirmOrderRequest {
    private Long addressId;
    private Long paymentMethodId;
}