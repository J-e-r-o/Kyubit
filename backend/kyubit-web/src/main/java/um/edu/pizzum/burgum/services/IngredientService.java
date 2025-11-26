package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.IngredientDto;
import java.util.List;

public interface IngredientService {


    IngredientDto createIngredient(IngredientDto ingredientDto);

    List<IngredientDto> getAllIngredients();

    IngredientDto getIngredientById(Long id);

    IngredientDto updateIngredient(Long id, IngredientDto ingredientDto);

    void deleteIngredient(Long id);

    List<IngredientDto> getIngredientsByType(String typeName);
}

