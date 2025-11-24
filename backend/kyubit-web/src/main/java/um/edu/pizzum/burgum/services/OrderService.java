package um.edu.pizzum.burgum.services;

import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.AddItemRequest;
import um.edu.pizzum.burgum.dto.ConfirmOrderRequest;
import um.edu.pizzum.burgum.dto.OrderDto;

public interface OrderService {
    OrderDto addItemToOrder(AddItemRequest request);
    OrderDto getCartByUserId(Long userId);
    void removeItemFromOrder(Long itemId);

    @Transactional
    OrderDto confirmOrder(Long orderId, ConfirmOrderRequest request);


}