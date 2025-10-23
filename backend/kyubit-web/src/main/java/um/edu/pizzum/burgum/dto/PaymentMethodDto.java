package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.edu.pizzum.burgum.entities.User;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentMethodDto {

    private Long id;
    private String cardType;
    private String cardHolderName;
    private String lastFourDigits;
    private String expirationDate;
    private String token;
    private User user;

}
