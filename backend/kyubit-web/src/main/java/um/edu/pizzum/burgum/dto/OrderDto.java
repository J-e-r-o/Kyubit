package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {

    private Long id;


    private Long clientId;
    private Long paymentMethodId;

    private LocalDateTime createdAt;
    private String status;


    private List<OrderItemDto> items;
}