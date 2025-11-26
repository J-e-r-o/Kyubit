package um.edu.pizzum.burgum.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardOwnerDto {
    private String cardHolderName;
    private String userFullName;
    private String email;
    private String role;
}