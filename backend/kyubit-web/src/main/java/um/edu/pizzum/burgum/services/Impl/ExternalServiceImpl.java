package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import um.edu.pizzum.burgum.dto.CardOwnerDto;
import um.edu.pizzum.burgum.dto.OrderDto;
import um.edu.pizzum.burgum.entities.Order;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.mapper.OrderMapper;
import um.edu.pizzum.burgum.repository.OrderRepository;
import um.edu.pizzum.burgum.repository.UserRepository;
import um.edu.pizzum.burgum.services.ExternalService;
import um.edu.pizzum.burgum.repository.PaymentMethodsRepository;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExternalServiceImpl implements ExternalService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final PaymentMethodsRepository paymentMethodRepository;

    @Override
    public List<OrderDto> getSalesByDate(LocalDate date) {
        // Convertimos la fecha "2023-11-24" en un rango:
        // Desde: 2023-11-24 00:00:00
        // Hasta: 2023-11-24 23:59:59.999
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        // Buscamos solo las CONFIRMED (Ventas reales)
        List<Order> orders = orderRepository.findByCreatedAtBetweenAndStatus(startOfDay, endOfDay, "CONFIRMED");

        return orders.stream()
                .map(OrderMapper::mapToOrderDto)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Object> getEmployeeCount() {
        // Ahora sí coincide: Pasamos un Enum y el Repo espera un Enum.
        long count = userRepository.countByRoleNot(User.Role.ROLE_CLIENTE);

        return Map.of(
                "empresa", "PizzUM & BurgUM",
                "cantidad_funcionarios", count
        );
    }

    @Override
    public List<CardOwnerDto> getCardOwnerInfo(String cardNumber) {
        // 1. Validación mínima
        if (cardNumber == null || cardNumber.length() < 4) {
            throw new RuntimeException("Número de tarjeta inválido");
        }

        // 2. Extraer los últimos 4 dígitos
        String lastFour = cardNumber.substring(cardNumber.length() - 4);

        // 3. Buscar en la BD
        List<PaymentMethod> methods = paymentMethodRepository.findByLastFourDigits(lastFour);

        // 4. Mapear a DTO con los datos del dueño
        return methods.stream().map(pm -> {
            User owner = pm.getUser(); // Asumiendo que la relación se llama 'client'
            return CardOwnerDto.builder()
                    .cardHolderName(pm.getCardHolderName())
                    .userFullName(owner.getName() + " " + owner.getLastname())
                    .email(owner.getEmail())
                    .role(owner.getRole().name())
                    .build();
        }).collect(Collectors.toList());
    }
}