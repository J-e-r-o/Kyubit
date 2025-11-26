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

                .alias(entity.getAlias())           // Mapeamos el nombre personalizado
                .isFavorite(entity.getIsFavorite()) // Mapeamos el estado de favorito
                // --------------------------------

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

    public static Creation mapToCreation(CreationDto dto) {
        if (dto == null) {
            return null;
        }

        // Placeholder para el usuario
        User userPlaceholder = null;
        if (dto.getUserId() != null) {
            userPlaceholder = User.builder().id(dto.getUserId()).build();
        }

        return Creation.builder()
                .id(dto.getId())
                .user(userPlaceholder)
                .name(dto.getName())
                .productType(dto.getProductType())

                .alias(dto.getAlias())
                // Si viene nulo, asumimos false para evitar problemas en la BD
                .isFavorite(dto.getIsFavorite() != null ? dto.getIsFavorite() : false)


                .size(dto.getSize())
                .crust(dto.getCrust())
                .sauce(dto.getSauce())
                .cheese(dto.getCheese())


                .meatCount(dto.getMeatCount())
                .meatType(dto.getMeatType())

                // Inicializamos la lista de ingredientes vacía
                .ingredients(new HashSet<>())
                .build();
    }


    public static List<CreationDto> mapToCreationDtoList(List<Creation> entities) {
        if (entities == null) return Collections.emptyList();
        return entities.stream()
                .map(CreationMapper::mapToCreationDto)
                .collect(Collectors.toList());
    }
}