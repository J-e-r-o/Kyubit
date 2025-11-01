package um.edu.pizzum.burgum.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/stats")
    public ResponseEntity<Map<String,Object>> stats() {
        Map<String, Object> m = Map.of(
                "users", 42,
                "creations", 12
        );
        return ResponseEntity.ok(m);
    }
}
