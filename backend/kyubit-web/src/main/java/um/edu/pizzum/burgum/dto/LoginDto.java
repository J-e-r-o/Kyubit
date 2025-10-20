package um.edu.pizzum.burgum.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

    private String email;
    private Role role;
    private String password;

    public enum Role {
        ROLE_ADMIN,
        ROLE_CLIENTE
    }

}
