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
     * Convierte la Entidad (BD) al DTO (Frontend)
     */
    public static CreationDto mapToCreationDto(Creation entity) {
        if (entity == null) {
            return null;
        }

        // Extraer IDs de los ingredientes para enviarlos al front
        Set<Long> ingredientIds = (entity.getIngredients() != null)
                ? entity.getIngredients().stream().map(Ingredient::getId).collect(Collectors.toSet())
                : Collections.emptySet();

        return CreationDto.builder()
                .id(entity.getId())
                .userId(entity.getUser() != null ? entity.getUser().getId() : null)
                .name(entity.getName())
                .productType(entity.getProductType()) // PIZZA o BURGER

                // Campos Base (Pizza y Burger comparten crust/pan)
                .size(entity.getSize())
                .crust(entity.getCrust())
                .sauce(entity.getSauce())
                .cheese(entity.getCheese())

                // Campos Específicos de Burger
                .meatCount(entity.getMeatCount())
                .meatType(entity.getMeatType())

                // Colección de IDs
                .ingredientIds(ingredientIds)
                .build();
    }

    /**
     * Convierte el DTO (Frontend) a la Entidad (BD)
     * Nota: Los ingredientes se resuelven en el Servicio, aquí solo inicializamos el Set vacío.
     */
    public static Creation mapToCreation(CreationDto dto) {
        if (dto == null) {
            return null;
        }

        // Placeholder para el usuario (El servicio buscará el real)
        User userPlaceholder = null;
        if (dto.getUserId() != null) {
            userPlaceholder = User.builder().id(dto.getUserId()).build();
        }

        return Creation.builder()
                .id(dto.getId())
                .user(userPlaceholder)
                .name(dto.getName())
                .productType(dto.getProductType())

                // Campos Base
                .size(dto.getSize())
                .crust(dto.getCrust())
                .sauce(dto.getSauce())
                .cheese(dto.getCheese())

                // Campos Burger
                .meatCount(dto.getMeatCount())
                .meatType(dto.getMeatType())

                // Inicializamos la lista de ingredientes vacía para evitar NullPointer
                // (El Service se encarga de buscar los Ingredients por ID y llenarla)
                .ingredients(new HashSet<>())
                .build();
    }

    // --- Métodos para Listas ---

    public static List<CreationDto> mapToCreationDtoList(List<Creation> entities) {
        if (entities == null) return Collections.emptyList();
        return entities.stream()
                .map(CreationMapper::mapToCreationDto)
                .collect(Collectors.toList());
    }
}