package um.edu.pizzum.burgum.dto;


import um.edu.pizzum.burgum.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressDto {

    private Long id;
    private String street;
    private Integer number;
    private String city;
    private String zipCode;
    private String notes;

    //Estas cosas de los atributos que resultan de las @ManyToOne y esas cosas van tambien en los dto???
    private User user;

}
