package um.edu.pizzum.burgum.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.CreateUserRequest;
import um.edu.pizzum.burgum.dto.UserDto;
import um.edu.pizzum.burgum.services.UserService;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserService userService;

    public AdminController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String,Object>> stats() {
        Map<String, Object> m = Map.of(
                "users", 42,
                "creations", 12
        );
        return ResponseEntity.ok(m);
    }

    // --- NUEVO ENDPOINT ---
    @PostMapping("/create-official")
    public ResponseEntity<UserDto> createOfficial(@RequestBody CreateUserRequest request) {
        UserDto newAdmin = userService.createAdminUser(request);
        return ResponseEntity.ok(newAdmin);
    }
}
