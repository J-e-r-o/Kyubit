package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.*;

public interface CartService {
    CartDto getCartByUser(Long userId);
    CartDto createCartForUser(Long userId);
    CartItemDto addItemToCart(Long userId, AddCartItemRequest req);
    CartDto updateCartItem(Long userId, Long itemId, UpdateCartItemRequest req);
    void removeItemFromCart(Long userId, Long itemId);
    void clearCart(Long userId);

    um.edu.pizzum.burgum.dto.OrderResponseDto checkout(Long userId, CheckoutRequestDto req);
}
