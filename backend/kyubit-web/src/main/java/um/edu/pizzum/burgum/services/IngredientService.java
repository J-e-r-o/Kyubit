package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.IngredientDto;
import java.util.List;

public interface IngredientService {


    //Crear
    IngredientDto createIngredient(IngredientDto ingredientDto);


    //Obtiener todos los ingredientes.
    List<IngredientDto> getAllIngredients();

    //Obtiene un ingrediente por su ID.
    IngredientDto getIngredientById(Long id);

    //Actualizar
    IngredientDto updateIngredient(Long id, IngredientDto ingredientDto);

    //Eliminar
    void deleteIngredient(Long id);
}

