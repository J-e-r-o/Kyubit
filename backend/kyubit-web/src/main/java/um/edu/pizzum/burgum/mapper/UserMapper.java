package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.UserDto;
import um.edu.pizzum.burgum.entities.Address;
import um.edu.pizzum.burgum.entities.Creation;
import um.edu.pizzum.burgum.entities.Token;
import um.edu.pizzum.burgum.entities.User;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {

    /**
     * Convierte la Entidad User a su DTO (Output DTO).
     * Mapea todas las colecciones a listas/sets de IDs.
     */
    public static UserDto mapToDto(User entity) {
        if (entity == null) {
            return null;
        }

        // Mapeo de colecciones a IDs
        List<Long> tokenIds = entity.getTokens().stream()
                .map(Token::getId)
                .collect(Collectors.toList());

        Set<Long> favoriteCreationIds = entity.getFavoriteCreations().stream()
                .map(Creation::getId)
                .collect(Collectors.toSet());

        List<Long> addressIds = entity.getAddresses().stream()
                .map(Address::getId)
                .collect(Collectors.toList());

        List<Long> createdProductIds = entity.getCreatedProducts().stream()
                .map(Creation::getId)
                .collect(Collectors.toList());


        return UserDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .lastname(entity.getLastname())
                .email(entity.getEmail())
                .birthdate(entity.getBirthdate())
                .role(entity.getRole())
                .tokenIds(tokenIds)
                .favoriteCreationIds(favoriteCreationIds)
                .addressIds(addressIds)
                .createdProductIds(createdProductIds)
                .build();
    }


    /**
     * Convierte un DTO de entrada (UserDTO) a una Entidad User para actualización.
     * ⚠️ ATENCIÓN: Este método NO mapea el 'password' ni las colecciones (tokens, addresses, etc.).
     * La lógica de seguridad (password) y la actualización de relaciones
     * (añadir/quitar favoritos, direcciones) debe manejarse en la capa de servicio.
     */
    public static User mapToEntityForUpdate(UserDto dto) {
        if (dto == null) {
            return null;
        }

        // Usamos el constructor/builder de la Entidad User
        return User.builder()
                .id(dto.getId())
                .name(dto.getName())
                .lastname(dto.getLastname())
                .email(dto.getEmail())
                .birthdate(dto.getBirthdate())
                .role(dto.getRole())
                // NOTA: 'password', 'tokens', 'favoriteCreations', 'addresses', y 'createdProducts'
                // se dejan en null/vacío para que el servicio los cargue desde la DB
                // o maneje su actualización explícitamente.
                .build();
    }


    /**
     * Convierte una lista de entidades a una lista de DTOs.
     */
    public static List<UserDto> mapToDtoList(List<User> entities) {
        return entities.stream()
                .map(UserMapper::mapToDto)
                .collect(Collectors.toList());
    }
}