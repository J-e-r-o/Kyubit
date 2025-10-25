package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.CreationDto;
import um.edu.pizzum.burgum.entities.Creation;
import um.edu.pizzum.burgum.entities.Ingredient;
import um.edu.pizzum.burgum.entities.User;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class CreationMapper {

    /**
     * DTO -> Entidad.
     * Crea placeholders para User e Ingredients (sólo with id) — la capa de servicio
     * DEBE buscar las entidades reales y reemplazar/validar antes de persistir.
     */
    public static Creation mapToCreation(CreationDto dto) {
        if (dto == null) return null;

        User userPlaceholder = (dto.getUserId() != null)
                ? User.builder().id(dto.getUserId()).build()
                : null;

        Set<Ingredient> ingredientsPlaceholder = (dto.getIngredientIds() != null)
                ? dto.getIngredientIds().stream()
                .filter(id -> id != null)
                .map(id -> Ingredient.builder().id(id).build())
                .collect(Collectors.toSet())
                : new HashSet<>();

        return Creation.builder()
                .id(dto.getId())
                .user(userPlaceholder)
                .name(dto.getName())
                .productType(dto.getProductType())
                .ingredients(ingredientsPlaceholder)
                .orderItems(Collections.emptyList())
                .build();
    }

    /**
     * Entidad -> DTO.
     */
    public static CreationDto mapToCreationDto(Creation creation) {
        if (creation == null) return null;

        Long userId = (creation.getUser() != null) ? creation.getUser().getId() : null;

        Set<Long> ingredientIds = (creation.getIngredients() != null)
                ? creation.getIngredients().stream()
                .filter(i -> i != null && i.getId() != null)
                .map(Ingredient::getId)
                .collect(Collectors.toSet())
                : Collections.emptySet();

        return CreationDto.builder()
                .id(creation.getId())
                .name(creation.getName())
                .productType(creation.getProductType())
                .userId(userId)
                .ingredientIds(ingredientIds)
                .build();
    }

    public static List<CreationDto> mapToDtoList(List<Creation> entities) {
        if (entities == null) return Collections.emptyList();
        return entities.stream()
                .map(CreationMapper::mapToCreationDto)
                .collect(Collectors.toList());
    }

    public static List<Creation> mapToEntityList(List<CreationDto> dtos) {
        if (dtos == null) return Collections.emptyList();
        return dtos.stream()
                .map(CreationMapper::mapToCreation)
                .collect(Collectors.toList());
    }
}


