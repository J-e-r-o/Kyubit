package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.PaymentMethodDto;

import java.util.List;

public interface PaymentMethodService {

    PaymentMethodDto create(PaymentMethodDto dto);

    PaymentMethodDto update(Long id, PaymentMethodDto dto);

    PaymentMethodDto getById(Long id);

    List<PaymentMethodDto> findAll();

    List<PaymentMethodDto> findByUserId(Long userId);

    void delete(Long id);
}


