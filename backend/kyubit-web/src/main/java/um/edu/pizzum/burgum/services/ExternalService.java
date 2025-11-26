package um.edu.pizzum.burgum.services;

import um.edu.pizzum.burgum.dto.CardOwnerDto;
import um.edu.pizzum.burgum.dto.OrderDto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ExternalService {
    List<OrderDto> getSalesByDate(LocalDate date);

    Map<String, Object> getEmployeeCount();
    List<CardOwnerDto> getCardOwnerInfo(String cardNumber);
}