package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.AddressDto;
import um.edu.pizzum.burgum.dto.PaymentMethodDto;

public interface UserService {
    AddressDto addAddressToUser(Long userId, AddressDto addressDto);
    PaymentMethodDto addPaymentToUser(Long userId, PaymentMethodDto paymentDto);
}