package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.IngredientDto;
import um.edu.pizzum.burgum.entities.Ingredient;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class IngredientMapper {

    /**
     * Mapea DTO -> Entidad.
     * Como Ingredient no es el lado propietario de la relación ManyToMany,
     * se deja el Set<Creation> vacío. La gestión se hace desde Creation.
     */
    public static Ingredient mapToIngredient(IngredientDto dto) {
        if (dto == null) return null;

        return Ingredient.builder()
                .id(dto.getId())
                .name(dto.getName())
                .cost(dto.getCost())
                .stock(dto.getStock())
                .creations(new HashSet<>())
                .build();
    }

    /**
     * Mapea Entidad -> DTO.
     */
    public static IngredientDto mapToIngredientDto(Ingredient ingredient) {
        if (ingredient == null) return null;

        return IngredientDto.builder()
                .id(ingredient.getId())
                .name(ingredient.getName())
                .cost(ingredient.getCost())
                .stock(ingredient.getStock())
                .build();
    }

    public static List<IngredientDto> mapToDtoList(List<Ingredient> entities) {
        if (entities == null) return Collections.emptyList();
        return entities.stream()
                .map(IngredientMapper::mapToIngredientDto)
                .collect(Collectors.toList());
    }

    public static List<Ingredient> mapToEntityList(List<IngredientDto> dtos) {
        if (dtos == null) return Collections.emptyList();
        return dtos.stream()
                .map(IngredientMapper::mapToIngredient)
                .collect(Collectors.toList());
    }
}
