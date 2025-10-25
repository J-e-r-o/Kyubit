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
public class IngredientDto {

    private Long id;
    private String name;
    private Integer cost;
    private Integer stock;

    private Set<Long> creationIds;
}