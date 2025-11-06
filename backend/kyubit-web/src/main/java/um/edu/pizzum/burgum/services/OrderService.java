package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.OrderRequestDto;
import um.edu.pizzum.burgum.dto.OrderResponseDto;

public interface OrderService {
    OrderResponseDto placeOrder(OrderRequestDto request);
}
