package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.IngredientDto;
import um.edu.pizzum.burgum.entities.Creation; // Necesario para el stream
import um.edu.pizzum.burgum.entities.Ingredient;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class IngredientMapper {

    /**
     * Debido a 'mappedBy = "ingredients"', JPA no permite actualizar
     * la relación desde la entidad Ingredient. Debe hacerse desde Creation.
     */
    public static Ingredient mapToIngredient(IngredientDto ingredientDto) {
        if (ingredientDto == null) {
            return null;
        }

        return new Ingredient(
                ingredientDto.getId(),
                ingredientDto.getName(),
                ingredientDto.getCost(),
                ingredientDto.getStock(),
                // Se pasa un Set vacío porque Ingredient NO es dueño de la relación.
                new HashSet<>()
        );
    }

    /**
     * Convierte la Entidad (Ingredient) al DTO (IngredientDto).
     * Extrae los IDs del Set<Creation> relacionado.
     */
    public static IngredientDto mapToIngredientDto(Ingredient ingredient) {
        if (ingredient == null) {
            return null;
        }

        // 1. Extraer los IDs de las creaciones (con chequeo de nulidad)
        Set<Long> creationIds = (ingredient.getCreations() != null)
                ? ingredient.getCreations().stream()
                .map(Creation::getId)
                .collect(Collectors.toSet())
                : new HashSet<>();

        // 2. Usar el constructor del DTO
        return new IngredientDto(
                ingredient.getId(),
                ingredient.getName(),
                ingredient.getCost(),
                ingredient.getStock(),
                creationIds // Asignamos solo los IDs
        );
    }

    // --- Métodos de utilidad para Listas ---

    public static List<IngredientDto> mapToDtoList(List<Ingredient> entities) {
        return entities.stream()
                .map(IngredientMapper::mapToIngredientDto)
                .collect(Collectors.toList());
    }

    public static List<Ingredient> mapToEntityList(List<IngredientDto> dtos) {
        return dtos.stream()
                .map(IngredientMapper::mapToIngredient)
                .collect(Collectors.toList());
    }
}