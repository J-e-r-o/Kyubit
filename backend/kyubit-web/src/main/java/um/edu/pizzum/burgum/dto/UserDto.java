package um.edu.pizzum.burgum.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.edu.pizzum.burgum.entities.Address;
import um.edu.pizzum.burgum.entities.Creation;
import um.edu.pizzum.burgum.entities.Token;
import um.edu.pizzum.burgum.entities.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String name;
    private String lastname;
    private String email;
    private String password;
    private LocalDate birthdate;
    //private User.Role role;
    private List<Token> tokens;
    private Set<Creation> favoriteCreations;
    private List<Address> addresses;
    private List<Creation> createdProducts;


}
