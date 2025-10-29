package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreationDto {

    private Long id;
    private String name;
    private String productType;

    //Tenemos que usar el id del usuario NO TODA LA ENTIDADDD
    private Long userId;

    private Set<Long> ingredientIds;
}
