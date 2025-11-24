package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.AddressDto;
import um.edu.pizzum.burgum.dto.CreateUserRequest;
import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.dto.UserDto;

public interface UserService {
    AddressDto addAddressToUser(Long userId, AddressDto addressDto);
    PaymentMethodDto addPaymentToUser(Long userId, PaymentMethodDto paymentDto);
    UserDto createAdminUser(CreateUserRequest request);
    void deleteUserLogical(Long userId);
}