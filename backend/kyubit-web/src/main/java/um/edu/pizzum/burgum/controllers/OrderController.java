package um.edu.pizzum.burgum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.OrderRequestDto;
import um.edu.pizzum.burgum.dto.OrderResponseDto;
import um.edu.pizzum.burgum.services.OrderService;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponseDto> placeOrder(@RequestBody OrderRequestDto req) {
        OrderResponseDto resp = orderService.placeOrder(req);
        if ("APPROVED".equals(resp.getStatus())) {
            return ResponseEntity.ok(resp);
        } else if ("REJECTED".equals(resp.getStatus())) {
            return ResponseEntity.unprocessableEntity().body(resp); // 422
        } else {
            return ResponseEntity.status(202).body(resp); // PENDING (no usado aquí pero por compatibilidad)
        }
    }
}
