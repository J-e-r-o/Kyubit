package um.edu.pizzum.burgum.dto;

import lombok.*;
import um.edu.pizzum.burgum.entities.User;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaymentMethodDto {

    private Long id;
    private String cardType;
    private String cardHolderName;
    private String lastFourDigits;
    private String expirationDate;
    private String token;
    private Long userId;
}
