package um.edu.pizzum.burgum.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

    private String email;
    private String password;



}
