package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.AddressDto;
import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.entities.Address;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.repository.AddressRepository;
import um.edu.pizzum.burgum.repository.PaymentMethodsRepository;
import um.edu.pizzum.burgum.repository.UserRepository;
import um.edu.pizzum.burgum.services.UserService;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PaymentMethodsRepository paymentMethodRepository;

    @Override
    @Transactional
    public AddressDto addAddressToUser(Long userId, AddressDto dto) {
        // 1. Buscar Usuario
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // 2. Mapear DTO -> Entidad Address
        Address address = new Address();
        address.setStreet(dto.getStreet());
        address.setNumber(dto.getNumber());   // Integer, coincide con tu DTO
        address.setCity(dto.getCity());
        address.setZipCode(dto.getZipCode());
        address.setNotes(dto.getNotes());     // Agregamos el campo 'notes'

        // 3. Vincular al Usuario
        // NOTA: Asegúrate que en tu entidad Address el campo se llame 'user'
        address.setUser(user);

        // 4. Guardar
        Address saved = addressRepository.save(address);

        // 5. Actualizar DTO con el ID generado y devolver
        dto.setId(saved.getId());
        dto.setUserId(user.getId()); // Seteamos el ID del usuario por consistencia
        return dto;
    }

    @Override
    @Transactional
    public PaymentMethodDto addPaymentToUser(Long userId, PaymentMethodDto dto) {
        // 1. Buscar Usuario
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // 2. Mapear DTO -> Entidad PaymentMethod
        PaymentMethod pm = new PaymentMethod();
        pm.setCardType(dto.getCardType());
        pm.setCardHolderName(dto.getCardHolderName());
        pm.setLastFourDigits(dto.getLastFourDigits());
        pm.setExpirationDate(dto.getExpirationDate());
        pm.setToken(dto.getToken()); // Agregamos el campo 'token' que está en tu DTO

        // 3. Vincular al Usuario
        // NOTA: Asegúrate que en tu entidad PaymentMethod el campo se llame 'client' o 'user'
        // Basado en tu Order.java, parece que usas 'client' para referirte al User.
        pm.setUser(user);

        // 4. Guardar
        PaymentMethod saved = paymentMethodRepository.save(pm);

        // 5. Retornar DTO actualizado
        dto.setId(saved.getId());
        dto.setUserId(user.getId());
        return dto;
    }
}