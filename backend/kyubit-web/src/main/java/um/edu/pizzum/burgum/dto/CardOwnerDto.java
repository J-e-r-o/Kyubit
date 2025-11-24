package um.edu.pizzum.burgum.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardOwnerDto {
    private String cardHolderName; // Nombre en la tarjeta
    private String userFullName;   // Nombre real del usuario
    private String email;
    private String role;
}