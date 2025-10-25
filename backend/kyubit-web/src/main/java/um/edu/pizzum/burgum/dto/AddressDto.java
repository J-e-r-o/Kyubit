package um.edu.pizzum.burgum.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {

    private Long id;
    private String street;
    private Integer number;
    private String city;
    private String zipCode;
    private String notes;

    // ¡CORRECCIÓN! Solo el ID del usuario, no la entidad completa.
    private Long userId;

}