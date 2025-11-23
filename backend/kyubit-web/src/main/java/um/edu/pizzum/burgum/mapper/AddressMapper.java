package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.AddressDto;
import um.edu.pizzum.burgum.entities.Address;
import um.edu.pizzum.burgum.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class AddressMapper {

    public static Address mapToAddress(AddressDto addressDto) {
        if (addressDto == null) {
            return null;
        }

        // 1. Crear el placeholder del Usuario
        User userPlaceHolder = (addressDto.getUserId() != null)
                ? User.builder().id(addressDto.getUserId()).build()
                : null;

        // 2. Usar el constructor de la Entidad Address
        return new Address(
                addressDto.getId(),
                addressDto.getStreet(),
                addressDto.getNumber(),
                addressDto.getCity(),
                addressDto.getZipCode(),
                addressDto.getNotes(),
                userPlaceHolder // Asignacion el placeholder
        );
    }


    public static AddressDto mapToAddressDto(Address address) {
        if (address == null) {
            return null;
        }

        // 1. Extraer el ID del Usuario (con chequeo de nulidad)
        Long userId = (address.getUser() != null) ? address.getUser().getId() : null;

        // 2. Usar el constructor del DTO
        return new AddressDto(
                address.getId(),
                address.getStreet(),
                address.getNumber(),
                address.getCity(),
                address.getZipCode(),
                address.getNotes(),
                userId
        );
    }

    // --- Métodos de utilidad para Listas ---

    public static List<AddressDto> mapToDtoList(List<Address> entities) {
        return entities.stream()
                .map(AddressMapper::mapToAddressDto)
                .collect(Collectors.toList());
    }

    public static List<Address> mapToEntityList(List<AddressDto> dtos) {
        return dtos.stream()
                .map(AddressMapper::mapToAddress)
                .collect(Collectors.toList());
    }
}
