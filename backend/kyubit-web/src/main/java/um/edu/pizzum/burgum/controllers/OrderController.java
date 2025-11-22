package um.edu.pizzum.burgum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.AddItemRequest;
import um.edu.pizzum.burgum.dto.OrderDto;
import um.edu.pizzum.burgum.services.OrderService;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/add-item")
    public ResponseEntity<OrderDto> addItem(@RequestBody AddItemRequest request) {
        return ResponseEntity.ok(orderService.addItemToOrder(request));
    }

    @GetMapping("/cart")
    public ResponseEntity<OrderDto> getCart(@RequestParam Long userId) {
        return ResponseEntity.ok(orderService.getCartByUserId(userId));
    }
}