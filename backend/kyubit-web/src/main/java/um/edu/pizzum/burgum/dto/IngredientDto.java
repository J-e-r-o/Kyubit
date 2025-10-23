package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.edu.pizzum.burgum.entities.Creation;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IngredientDto {

    private Long id;
    private String name;
    private Integer cost;
    private Integer stock;
    private Set<Creation> creations;
}
