package um.edu.pizzum.burgum.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
public class LoginDto {

    private String email;
    private Role role;
    private String password;

    public enum Role {
        ROLE_ADMIN,
        ROLE_CLIENTE
    }

}
