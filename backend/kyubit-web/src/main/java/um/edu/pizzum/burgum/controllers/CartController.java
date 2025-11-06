package um.edu.pizzum.burgum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.*;
import um.edu.pizzum.burgum.services.CartService;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<CartDto> getCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUser(userId));
    }

    @PostMapping("/{userId}")
    public ResponseEntity<CartDto> createCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.createCartForUser(userId));
    }

    @PostMapping("/{userId}/items")
    public ResponseEntity<CartItemDto> addItem(@PathVariable Long userId, @RequestBody AddCartItemRequest req) {
        return ResponseEntity.ok(cartService.addItemToCart(userId, req));
    }

    @PutMapping("/{userId}/items/{itemId}")
    public ResponseEntity<CartDto> updateItem(@PathVariable Long userId, @PathVariable Long itemId,
                                              @RequestBody UpdateCartItemRequest req) {
        return ResponseEntity.ok(cartService.updateCartItem(userId, itemId, req));
    }

    @DeleteMapping("/{userId}/items/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Long userId, @PathVariable Long itemId) {
        cartService.removeItemFromCart(userId, itemId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{userId}/checkout")
    public ResponseEntity<um.edu.pizzum.burgum.dto.OrderResponseDto> checkout(@PathVariable Long userId,
                                                                              @RequestBody CheckoutRequestDto req) {
        um.edu.pizzum.burgum.dto.OrderResponseDto resp = cartService.checkout(userId, req);
        if ("APPROVED".equals(resp.getStatus())) return ResponseEntity.ok(resp);
        return ResponseEntity.unprocessableEntity().body(resp);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> clearCartEndpoint(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
