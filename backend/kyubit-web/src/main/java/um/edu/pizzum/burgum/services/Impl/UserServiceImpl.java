package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.AddressDto;
import um.edu.pizzum.burgum.dto.CreateUserRequest;
import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.dto.UserDto;
import um.edu.pizzum.burgum.entities.Address;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.mapper.UserMapper;
import um.edu.pizzum.burgum.repository.AddressRepository;
import um.edu.pizzum.burgum.repository.PaymentMethodsRepository;
import um.edu.pizzum.burgum.repository.UserRepository;
import um.edu.pizzum.burgum.services.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import um.edu.pizzum.burgum.dto.CreateUserRequest;
import um.edu.pizzum.burgum.dto.UserDto;
import um.edu.pizzum.burgum.mapper.UserMapper;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PaymentMethodsRepository paymentMethodRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public AddressDto addAddressToUser(Long userId, AddressDto dto) {
        // 1. Buscar Usuario
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        // 2. Mapear DTO -> Entidad Address
        Address address = new Address();
        address.setStreet(dto.getStreet());
        address.setNumber(dto.getNumber());   
        address.setCity(dto.getCity());
        address.setZipCode(dto.getZipCode());
        address.setNotes(dto.getNotes());     

        // 3. Vincular al Usuario
        address.setUser(user);

        // 4. Guardar
        Address saved = addressRepository.save(address);

        // 5. Actualizar DTO con el ID generado y devolver
        dto.setId(saved.getId());
        dto.setUserId(user.getId()); 
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
        pm.setToken(dto.getToken()); 

        // 3. Vincular al Usuario
        pm.setUser(user);

        // 4. Guardar
        PaymentMethod saved = paymentMethodRepository.save(pm);

        // 5. Retornar DTO actualizado
        dto.setId(saved.getId());
        dto.setUserId(user.getId());
        return dto;
    }

    @Override
    @Transactional
    public UserDto createAdminUser(CreateUserRequest request) {
        // 1. Verificar si el email ya existe
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }

        // 2. Crear la entidad User
        User newAdmin = User.builder()
                .name(request.getName())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .birthdate(request.getBirthdate())
                // Encriptamos la contraseña antes de guardar
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.ROLE_ADMIN) 
                .build();

        // 3. Guardar
        User savedAdmin = userRepository.save(newAdmin);

        return UserMapper.mapToDto(savedAdmin);
    }

    @Override
    @Transactional
    public void deleteUserLogical(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

    
        user.setIsActive(false);



        userRepository.save(user);
    }


}