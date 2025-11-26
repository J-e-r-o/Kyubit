package um.edu.pizzum.burgum.mapper;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import um.edu.pizzum.burgum.dto.IngredientDto;
import um.edu.pizzum.burgum.entities.Ingredient;
import um.edu.pizzum.burgum.services.IngredientService;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class IngredientMapper {

    IngredientService ingredientService;
    public static Ingredient mapToIngredient(IngredientDto dto) {
        if (dto == null) return null;
        return Ingredient.builder()
                .id(dto.getId())
                .name(dto.getName())
                .cost(dto.getCost())
                .stock(dto.getStock())
                .type(dto.getType())
                .creations(new HashSet<>())
                .build();
    }

    public static IngredientDto mapToIngredientDto(Ingredient ingredient) {
        if (ingredient == null) return null;
        return IngredientDto.builder()
                .id(ingredient.getId())
                .name(ingredient.getName())
                .cost(ingredient.getCost())
                .stock(ingredient.getStock())
                .type(ingredient.getType())
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

    @GetMapping
    public ResponseEntity<List<IngredientDto>> list(@RequestParam(required = false) String type) {
        if (type != null) {
            // Lógica para filtrar por tipo
            return ResponseEntity.ok(ingredientService.getIngredientsByType(type));
        }
        return ResponseEntity.ok(ingredientService.getAllIngredients());
    }
}
