package um.edu.pizzum.burgum.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CreateUserRequest {
    private String name;
    private String lastname;
    private String email;
    private String password;
    private LocalDate birthdate;
}