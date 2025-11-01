package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.exceptions.ResourceNotFoundException;
import um.edu.pizzum.burgum.mapper.PaymentMethodMapper;
import um.edu.pizzum.burgum.repository.PaymentMethodsRepository;
import um.edu.pizzum.burgum.repository.UserRepository;
import um.edu.pizzum.burgum.services.PaymentMethodService;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodsRepository repo;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public PaymentMethodDto create(PaymentMethodDto dto) {
        // validar userId
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("userId is required to create a payment method");
        }
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", dto.getUserId()));

        // validaciones básicas (podés extender)
        validateDtoFields(dto);

        PaymentMethod entity = PaymentMethodMapper.mapToEntity(dto);
        entity.setUser(user); // reemplaza placeholder por la entidad real

        PaymentMethod saved = repo.save(entity);
        return PaymentMethodMapper.mapToDto(saved);
    }

    @Override
    @Transactional
    public PaymentMethodDto update(Long id, PaymentMethodDto dto) {
        PaymentMethod existing = repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PaymentMethod", "id", id));

        // Si llega userId, actualizar el user (opcional, revisar permisos)
        if (dto.getUserId() != null && !Objects.equals(existing.getUser().getId(), dto.getUserId())) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", dto.getUserId()));
            existing.setUser(user);
        }

        if (dto.getCardType() != null) existing.setCardType(dto.getCardType());
        if (dto.getCardHolderName() != null) existing.setCardHolderName(dto.getCardHolderName());
        if (dto.getLastFourDigits() != null) existing.setLastFourDigits(dto.getLastFourDigits());
        if (dto.getExpirationDate() != null) existing.setExpirationDate(dto.getExpirationDate());
        if (dto.getToken() != null) existing.setToken(dto.getToken());

        // validaciones basicas
        validateDtoFields(PaymentMethodMapper.mapToDto(existing));

        PaymentMethod saved = repo.save(existing);
        return PaymentMethodMapper.mapToDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentMethodDto getById(Long id) {
        return repo.findById(id)
                .map(PaymentMethodMapper::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("PaymentMethod", "id", id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentMethodDto> findAll() {
        return repo.findAll().stream().map(PaymentMethodMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentMethodDto> findByUserId(Long userId) {
        return repo.findByUser_Id(userId).stream().map(PaymentMethodMapper::mapToDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) throw new ResourceNotFoundException("PaymentMethod", "id", id);
        repo.deleteById(id);
    }

    // Validaciones simples (podés mover a util o usar javax.validation en DTOs)
    private void validateDtoFields(PaymentMethodDto dto) {
        if (dto.getLastFourDigits() != null && dto.getLastFourDigits().length() != 4) {
            throw new IllegalArgumentException("lastFourDigits must be 4 characters");
        }
        if (dto.getCardHolderName() == null || dto.getCardHolderName().isBlank()) {
            throw new IllegalArgumentException("cardHolderName is required");
        }
        if (dto.getCardType() == null || dto.getCardType().isBlank()) {
            throw new IllegalArgumentException("cardType is required");
        }
        if (dto.getExpirationDate() == null || dto.getExpirationDate().isBlank()) {
            throw new IllegalArgumentException("expirationDate is required");
        }
    }
}
