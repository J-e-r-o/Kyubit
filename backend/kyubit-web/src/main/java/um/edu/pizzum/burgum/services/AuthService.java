package um.edu.pizzum.burgum.services;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import um.edu.pizzum.burgum.controllers.TokenResponse;
import um.edu.pizzum.burgum.dto.LoginDto;
import um.edu.pizzum.burgum.dto.RegisterRequestDTO;
import um.edu.pizzum.burgum.entities.User.Role;
import um.edu.pizzum.burgum.entities.Token;
import um.edu.pizzum.burgum.entities.Token;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.exceptions.UserAlreadyExists;
import um.edu.pizzum.burgum.repository.TokenRepository;
import um.edu.pizzum.burgum.repository.UserRepository;

import java.util.List;
@Data
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public TokenResponse register(RegisterRequestDTO registerRequestDTO) throws UserAlreadyExists {
        return registerUser(registerRequestDTO, Role.ROLE_CLIENTE);
    }

    public TokenResponse registerAdmin(RegisterRequestDTO registerRequestDTO) throws UserAlreadyExists {
        return registerUser(registerRequestDTO, Role.ROLE_ADMIN);
    }

    public TokenResponse login(LoginDto loginDto) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()
                )
        );

        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);

        // Lógica de seguridad: revocamos todos los tokens anteriores del usuario
        revokeAllUserTokens(user);
        // Guardamos el nuevo token
        saveUserToken(user, jwtToken);

        return new TokenResponse(jwtToken, refreshToken);
    }


    private TokenResponse registerUser(RegisterRequestDTO registerRequestDTO, Role role) {

        if (userRepository.findByEmail(registerRequestDTO.getEmail()).isPresent()) {
            throw new UserAlreadyExists("Este email ya fue registrado");
        }

        User user = User.builder()
                .name(registerRequestDTO.getName())
                .lastname(registerRequestDTO.getLastname())
                .email(registerRequestDTO.getEmail())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .role(role)
                .build();

        User savedUser = userRepository.save(user);
        String jwtToken = jwtService.generateToken(savedUser);
        String refreshToken = jwtService.generateRefreshToken(savedUser);
        saveUserToken(savedUser, jwtToken);
        return new TokenResponse(jwtToken, refreshToken);
    }

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
        List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public TokenResponse refreshToken(final String authHeader) {

        return null;
    }
}

