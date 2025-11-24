package um.edu.pizzum.burgum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.AddItemRequest;
import um.edu.pizzum.burgum.dto.ConfirmOrderRequest;
import um.edu.pizzum.burgum.dto.OrderDto;
import um.edu.pizzum.burgum.services.OrderService;

import java.util.List;

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

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long itemId) {
        orderService.removeItemFromOrder(itemId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/confirm")
    public ResponseEntity<OrderDto> confirmOrder(
            @PathVariable Long id,
            @RequestBody ConfirmOrderRequest request) {

        OrderDto confirmedOrder = orderService.confirmOrder(id, request);
        return ResponseEntity.ok(confirmedOrder);
    }

    @GetMapping("/history")
    public ResponseEntity<List<OrderDto>> getHistory(@RequestParam Long userId) {
        return ResponseEntity.ok(orderService.getUserOrderHistory(userId));
    }
}