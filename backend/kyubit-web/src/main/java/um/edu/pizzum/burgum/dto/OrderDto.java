package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import um.edu.pizzum.burgum.entities.OrderItem;
import um.edu.pizzum.burgum.entities.PaymentMethod;
import um.edu.pizzum.burgum.entities.User;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private Long id;
    private User client;
    private PaymentMethod paymentMethod;
    private LocalDateTime creditedAt;
    private String status;
    private List<OrderItem> items;


}
