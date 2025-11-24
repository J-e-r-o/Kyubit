package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.UserDto;
import um.edu.pizzum.burgum.entities.Address;
import um.edu.pizzum.burgum.entities.Creation;
import um.edu.pizzum.burgum.entities.Token;
import um.edu.pizzum.burgum.entities.User;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    public static UserDto mapToDto(User entity) {
        if (entity == null) {
            return null;
        }

        // 1. Mapeo defensivo de Tokens (Evita NPE)
        List<Long> tokenIds = (entity.getTokens() != null)
                ? entity.getTokens().stream().map(Token::getId).collect(Collectors.toList())
                : Collections.emptyList();

        // 2. Mapeo defensivo de Direcciones
        List<Long> addressIds = (entity.getAddresses() != null)
                ? entity.getAddresses().stream().map(Address::getId).collect(Collectors.toList())
                : Collections.emptyList();

        // 3. Mapeo defensivo de Productos Creados (Admins)
        List<Long> createdProductIds = (entity.getCreatedProducts() != null)
                ? entity.getCreatedProducts().stream().map(Creation::getId).collect(Collectors.toList())
                : Collections.emptyList();

        // 4. ELIMINADO: favoriteCreationIds (Ya no existe en la entidad)

        return UserDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .lastname(entity.getLastname())
                .email(entity.getEmail())
                .birthdate(entity.getBirthdate())
                .role(entity.getRole())
                .tokenIds(tokenIds)
                .addressIds(addressIds)
                .createdProductIds(createdProductIds)
                // .favoriteCreationIds(...) -> ELIMINADO
                .build();
    }

    public static User mapToEntityForUpdate(UserDto dto) {
        if (dto == null) return null;

        return User.builder()
                .id(dto.getId())
                .name(dto.getName())
                .lastname(dto.getLastname())
                .email(dto.getEmail())
                .birthdate(dto.getBirthdate())
                .role(dto.getRole())
                // Las listas se inicializan vacías por defecto en la entidad gracias a @Builder.Default
                .build();
    }

    public static List<UserDto> mapToDtoList(List<User> entities) {
        if (entities == null) return Collections.emptyList();
        return entities.stream()
                .map(UserMapper::mapToDto)
                .collect(Collectors.toList());
    }
}