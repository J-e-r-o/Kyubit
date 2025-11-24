package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.Ingredient;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    boolean existsByName(String name);
    // Buscar por tipo
    List<Ingredient> findByType(Ingredient.IngredientType type);

    // Buscar por lista de tipos (ej: Dame vegetales y quesos)
    List<Ingredient> findByTypeIn(List<Ingredient.IngredientType> types);
}
