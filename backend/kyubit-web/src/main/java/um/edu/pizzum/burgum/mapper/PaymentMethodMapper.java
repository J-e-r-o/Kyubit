package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;

import java.util.List;
import java.util.stream.Collectors;


public class PaymentMethodMapper {

    /**
     * Convierte la Entidad PaymentMethod a su DTO.
     * Mapea la relación User a su ID.
     */
    public static PaymentMethodDto mapToDto(PaymentMethod entity) {
        if (entity == null) {
            return null;
        }

        Long userId = (entity.getUser() != null) ? entity.getUser().getId() : null;

        return PaymentMethodDto.builder()
                .id(entity.getId())
                .cardType(entity.getCardType())
                .cardHolderName(entity.getCardHolderName())
                .lastFourDigits(entity.getLastFourDigits())
                .expirationDate(entity.getExpirationDate())
                .token(entity.getToken())
                .userId(userId)
                .build();
    }

    /**
     * Convierte el DTO a la Entidad PaymentMethod.
     * IMPORTANTE: La relación User se inicializa con solo su ID.
     * La capa de servicio debe BUSCAR la entidad User completa
     * antes de persistir la entidad PaymentMethod.
     */
    public static PaymentMethod mapToEntity(PaymentMethodDto dto) {
        if (dto == null) {
            return null;
        }

        // Creamos un objeto PlaceHolder/Dummy para User usando solo el ID.
        // Asume que la entidad User tiene un constructor o builder que acepta solo el ID.
        User userPlaceHolder = (dto.getUserId() != null)
                ? User.builder().id(dto.getUserId()).build()
                : null;

        return new PaymentMethod(
                dto.getId(),
                dto.getCardType(),
                dto.getCardHolderName(),
                dto.getLastFourDigits(),
                dto.getExpirationDate(),
                dto.getToken(),
                userPlaceHolder // Relación incompleta, necesita ser cargada en el servicio
        );
    }

    /**
     * Convierte una lista de entidades a una lista de DTOs.
     */
    public static List<PaymentMethodDto> mapToDtoList(List<PaymentMethod> entities) {
        return entities.stream()
                .map(PaymentMethodMapper::mapToDto)
                .collect(Collectors.toList());
    }

    /**
     * Convierte una lista de DTOs a una lista de entidades.
     */
    public static List<PaymentMethod> mapToEntityList(List<PaymentMethodDto> dtos) {
        return dtos.stream()
                .map(PaymentMethodMapper::mapToEntity)
                .collect(Collectors.toList());
    }
}
