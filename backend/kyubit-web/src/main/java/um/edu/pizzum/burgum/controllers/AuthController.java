package um.edu.pizzum.burgum.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import um.edu.pizzum.burgum.dto.LoginDto;
import um.edu.pizzum.burgum.dto.RegisterRequestDTO;
import um.edu.pizzum.burgum.services.AuthService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController { //esta clase es para chequear el inicio de sesion


    private final AuthService authService;


    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody final RegisterRequestDTO request){

        return ResponseEntity.ok(authService.register(request));
    }

//    @PostMapping("/register/admin")
//    public ResponseEntity<TokenResponse> registerAdmin(@RequestBody final RegisterRequestDTO request){
//        final TokenResponse tokenResponse = authService.registerAdmin(request);
//        return ResponseEntity.ok(tokenResponse);
//    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginClient(@RequestBody LoginDto request){  //uso responseEntity poruqe me represetna toda la respuesta http

      return  ResponseEntity.ok(authService.login(request));

    }






}
