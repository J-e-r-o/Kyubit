package um.edu.pizzum.burgum.mapper;

import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;

import java.util.List;
import java.util.stream.Collectors;


public class PaymentMethodMapper {


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


    public static PaymentMethod mapToEntity(PaymentMethodDto dto) {
        if (dto == null) {
            return null;
        }

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
                userPlaceHolder
        );
    }


    public static List<PaymentMethodDto> mapToDtoList(List<PaymentMethod> entities) {
        return entities.stream()
                .map(PaymentMethodMapper::mapToDto)
                .collect(Collectors.toList());
    }


    public static List<PaymentMethod> mapToEntityList(List<PaymentMethodDto> dtos) {
        return dtos.stream()
                .map(PaymentMethodMapper::mapToEntity)
                .collect(Collectors.toList());
    }
}
