package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.CreationDto;
import um.edu.pizzum.burgum.entities.Creation;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.entities.Ingredient;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class CreationMapper {

    /**
     * Convierte el DTO (CreationDto) a la Entidad (Creation).
     * ⚠️ IMPORTANTE: Crea 'placeholders' para User e Ingredients.
     * La capa de servicio DEBE buscar y asignar estas entidades.
     */
    public static Creation mapToCreation(CreationDto creationDto) {
        if (creationDto == null) {
            return null;
        }

        // 1. Crear placeholder para User
        User userPlaceHolder = (creationDto.getUserId() != null)
                ? User.builder().id(creationDto.getUserId()).build()
                : null;

        // 2. Crear placeholders para Ingredients
        Set<Ingredient> ingredientsPlaceHolder = (creationDto.getIngredientIds() != null)
                ? creationDto.getIngredientIds().stream()
                .map(id -> Ingredient.builder().id(id).build())
                .collect(Collectors.toSet())
                : new HashSet<>(); // Devolver un set vacío si es nulo

        // 3. Usar el constructor de la Entidad.
        // Asumiendo que @AllArgsConstructor sigue el orden de la entidad:
        // id, user, name, productType, ingredients, orderItems
        return new Creation(
                creationDto.getId(),
                userPlaceHolder,
                creationDto.getName(),
                creationDto.getProductType(),
                ingredientsPlaceHolder,
                null // 'orderItems' no se gestiona desde el DTO.
        );
    }

    /**
     * Convierte la Entidad (Creation) al DTO (CreationDto).
     * Extrae los IDs de las entidades User e Ingredients.
     */
    public static CreationDto mapToCreationDto(Creation creation) {
        if (creation == null) {
            return null;
        }

        // 1. Extraer ID de User
        Long userId = (creation.getUser() != null) ? creation.getUser().getId() : null;

        // 2. Extraer IDs de Ingredients
        Set<Long> ingredientIds = creation.getIngredients().stream()
                .map(Ingredient::getId)
                .collect(Collectors.toSet());

        // 3. Usar el constructor del DTO
        // Asumiendo que @AllArgsConstructor sigue el orden del DTO:
        // id, name, productType, userId, ingredientIds
        return new CreationDto(
                creation.getId(),
                creation.getName(),
                creation.getProductType(),
                userId,
                ingredientIds
        );
    }

    // --- Métodos de utilidad para Listas ---

    public static List<CreationDto> mapToDtoList(List<Creation> entities) {
        return entities.stream()
                .map(CreationMapper::mapToCreationDto)
                .collect(Collectors.toList());
    }

    public static List<Creation> mapToEntityList(List<CreationDto> dtos) {
        return dtos.stream()
                .map(CreationMapper::mapToCreation)
                .collect(Collectors.toList());
    }
}


