package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    boolean existsByName(String name);
}
