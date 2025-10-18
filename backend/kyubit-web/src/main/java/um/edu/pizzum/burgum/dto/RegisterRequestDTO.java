package um.edu.pizzum.burgum.dto;

import lombok.Data;


@Data

public class RegisterRequestDTO {
    private String name;
    private String lastname;
    private String email;
    private String password;
    private Role role;


    public enum Role {
        ROLE_ADMIN,
        ROLE_CLIENTE
    }
}
