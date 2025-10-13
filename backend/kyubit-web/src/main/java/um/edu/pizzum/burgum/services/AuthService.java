package um.edu.pizzum.burgum.services;


import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import um.edu.pizzum.burgum.config.AppConfig;
import um.edu.pizzum.burgum.controllers.TokenResponse;
import um.edu.pizzum.burgum.dto.RegisterRequestDTO;
import um.edu.pizzum.burgum.entities.Token;
import um.edu.pizzum.burgum.entities.Token.*;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.repository.TokenRepository;
import um.edu.pizzum.burgum.config.AppConfig.*;
import um.edu.pizzum.burgum.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public TokenResponse register(RegisterRequestDTO registerRequestDTO) {


        //hacer los chequeos de previa existencia, formatos etcc

        var user = User.builder()
                .name(registerRequestDTO.getName())
                .lastname(registerRequestDTO.getLastname())
                .email(registerRequestDTO.getEmail())
                .password(passwordEncoder.encode(registerRequestDTO.getPassword()))
                .role(User.Role.ROLE_CLIENTE)
                .build();


        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(savedUser);
        var refreshToken = jwtService.generateRefreshToken(savedUser);
        saveUserToken(savedUser,jwtToken);
        return new TokenResponse(jwtToken, refreshToken);

    }


    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    public TokenResponse refreshToken(final String authHeader) {
        return null;
    }
}
