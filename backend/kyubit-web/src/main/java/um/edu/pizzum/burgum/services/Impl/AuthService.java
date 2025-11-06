package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.controllers.AuthResponse;
import um.edu.pizzum.burgum.dto.AddressDto;
import um.edu.pizzum.burgum.dto.LoginDto;
import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.dto.RegisterRequestDTO;
import um.edu.pizzum.burgum.entities.*;
import um.edu.pizzum.burgum.repository.AddressRepository;
import um.edu.pizzum.burgum.repository.PaymentMethodsRepository;
import um.edu.pizzum.burgum.repository.TokenRepository;
import um.edu.pizzum.burgum.repository.UserRepository;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final AddressRepository addressRepository;
    private final PaymentMethodsRepository paymentMethodRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * 🔐 LOGIN
     */
    public AuthResponse login(LoginDto request) {
        // 1️⃣ Autenticación
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        // 2️⃣ Buscar usuario
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // 3️⃣ Token JWT
        String token = jwtService.getToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, token);

        // 4️⃣ Obtener direcciones
        List<Address> addresses = addressRepository.findByUserId(user.getId());
        List<AddressDto> addressDtos = addresses.stream()
                .map(a -> AddressDto.builder()
                        .id(a.getId())
                        .street(a.getStreet())
                        .number(a.getNumber())
                        .city(a.getCity())
                        .zipCode(a.getZipCode())
                        .notes(a.getNotes())
                        .userId(user.getId())
                        .build())
                .toList();

        // 5️⃣ Obtener métodos de pago
        List<PaymentMethod> payments = paymentMethodRepository.findByUserId(user.getId());
        List<PaymentMethodDto> paymentDtos = payments.stream()
                .map(p -> PaymentMethodDto.builder()
                        .id(p.getId())
                        .cardType(p.getCardType())
                        .cardHolderName(p.getCardHolderName())
                        .lastFourDigits(p.getLastFourDigits())
                        .expirationDate(p.getExpirationDate())
                        .token(p.getToken())
                        .userId(user.getId())
                        .build())
                .toList();

        // 6️⃣ Construir respuesta completa
        return AuthResponse.builder()
                .token(token)
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .lastname(user.getLastname())
                .role(user.getRole().name())
                .addresses(addressDtos)
                .payments(paymentDtos)
                .build();
    }

    /**
     * 🧾 REGISTRO DE CLIENTE (con dirección y método de pago)
     */
    @Transactional
    public AuthResponse register(RegisterRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya se encuentra registrado.");
        }

        // 1️⃣ Crear y guardar usuario
        User user = User.builder()
                .name(request.getName())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.ROLE_CLIENTE)
                .birthdate(parseBirthdate(request.getBirthdate()))
                .build();

        User savedUser = userRepository.save(user);

        // 2️⃣ Guardar dirección
        AddressDto addressDto = request.getAddress();
        if (addressDto != null) {
            Address address = Address.builder()
                    .street(addressDto.getStreet())
                    .number(addressDto.getNumber())
                    .city(addressDto.getCity())
                    .zipCode(addressDto.getZipCode())
                    .notes(addressDto.getNotes())
                    .user(savedUser)
                    .build();
            addressRepository.save(address);
        }

        // 3️⃣ Guardar método de pago
        PaymentMethodDto paymentDto = request.getPayment();
        if (paymentDto != null) {
            PaymentMethod payment = PaymentMethod.builder()
                    .cardHolderName(paymentDto.getCardHolderName())
                    .expirationDate(paymentDto.getExpirationDate())
                    .lastFourDigits(extractLastFourDigits(paymentDto.getLastFourDigits()))
                    .cardType(paymentDto.getCardType())
                    .token(paymentDto.getToken())
                    .user(savedUser)
                    .build();
            paymentMethodRepository.save(payment);
        }

        String token = jwtService.getToken(savedUser);
        saveUserToken(savedUser, token);

// 5️⃣ Obtener direcciones y métodos de pago guardados
        List<Address> addresses = addressRepository.findByUserId(savedUser.getId());
        List<AddressDto> addressDtos = addresses.stream()
                .map(a -> AddressDto.builder()
                        .id(a.getId())
                        .street(a.getStreet())
                        .number(a.getNumber())
                        .city(a.getCity())
                        .zipCode(a.getZipCode())
                        .notes(a.getNotes())
                        .userId(savedUser.getId())
                        .build())
                .toList();

        List<PaymentMethod> payments = paymentMethodRepository.findByUserId(savedUser.getId());
        List<PaymentMethodDto> paymentDtos = payments.stream()
                .map(p -> PaymentMethodDto.builder()
                        .id(p.getId())
                        .cardType(p.getCardType())
                        .cardHolderName(p.getCardHolderName())
                        .lastFourDigits(p.getLastFourDigits())
                        .expirationDate(p.getExpirationDate())
                        .token(p.getToken())
                        .userId(savedUser.getId())
                        .build())
                .toList();

// 6️⃣ Construir respuesta completa
        return AuthResponse.builder()
                .token(token)
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .name(savedUser.getName())
                .lastname(savedUser.getLastname())
                .role(savedUser.getRole().name())
                .addresses(addressDtos)
                .payments(paymentDtos)
                .build();
    }


    public AuthResponse registerAdmin(RegisterRequestDTO request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("El email ya se encuentra registrado.");
        }

        User u = User.builder()
                .name(request.getName())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.ROLE_ADMIN)
                .build();

        User savedUser = userRepository.save(u);
        String token = jwtService.getToken(savedUser);
        saveUserToken(savedUser, token);

        return AuthResponse.builder()
                .token(token)
                .id(savedUser.getId())
                .email(savedUser.getEmail())
                .name(savedUser.getName())
                .lastname(savedUser.getLastname())
                .role(savedUser.getRole().name())
                .build();
    }

    // --- 🔧 MÉTODOS PRIVADOS DE UTILIDAD ---

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(Token.TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty()) return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private LocalDate parseBirthdate(String birthdate) {
        if (birthdate == null || birthdate.isEmpty()) return null;
        try {
            return LocalDate.parse(birthdate);
        } catch (DateTimeParseException e) {
            System.err.println("Formato de fecha inválido: " + birthdate);
            return null;
        }
    }

    private String extractLastFourDigits(String cardNumber) {
        if (cardNumber == null) return null;
        String cleaned = cardNumber.replaceAll("[\\s-]+", "");
        return cleaned.length() < 4 ? cleaned : cleaned.substring(cleaned.length() - 4);
    }
}
