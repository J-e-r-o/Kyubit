package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.PaymentMethodDto;

import java.util.List;

public interface PaymentMethodService {

    //Creo que no esta bien porque tambien deberia pasarle el id del usuario duenio del metodo de pago

    //Post
    PaymentMethodDto createPaymentMethod (PaymentMethodDto paymentMethodDto);

    //Get
    PaymentMethodDto getPaymentMethodById(Long paymentMethodId);

    //Update
    PaymentMethodDto updatePaymentMethod(Long paymentMethodId, PaymentMethodDto updatedPaymentMethod);

    //Delete
    void deletePaymentMethod(Long paymentMethodId);


}

