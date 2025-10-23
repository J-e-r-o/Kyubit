package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.edu.pizzum.burgum.entities.Ingredient;
import um.edu.pizzum.burgum.entities.OrderItem;
import um.edu.pizzum.burgum.entities.User;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreationDto {

    private Long id;
    private User user;
    private String name;
    private String productType;
    private Set<Ingredient> ingredients;
    private List<OrderItem> orderItems;

}
