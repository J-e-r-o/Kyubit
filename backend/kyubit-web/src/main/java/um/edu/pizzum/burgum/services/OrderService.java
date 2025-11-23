package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.AddItemRequest;
import um.edu.pizzum.burgum.dto.OrderDto;

public interface OrderService {
    OrderDto addItemToOrder(AddItemRequest request);
    OrderDto getCartByUserId(Long userId);
}