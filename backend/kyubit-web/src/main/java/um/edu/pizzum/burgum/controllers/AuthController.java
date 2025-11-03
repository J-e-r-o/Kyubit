package um.edu.pizzum.burgum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.LoginDto;
import um.edu.pizzum.burgum.dto.RegisterRequestDTO;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.services.Impl.AuthService;
import um.edu.pizzum.burgum.repository.UserRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody final RegisterRequestDTO request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/registerAdmin")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody final RegisterRequestDTO request){
        return ResponseEntity.ok(authService.registerAdmin(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDto request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal User user) {
        // Spring inyecta automáticamente el usuario autenticado gracias al token JWT
        return ResponseEntity.ok(user);
    }



}
