package um.edu.pizzum.burgum.controllers;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import um.edu.pizzum.burgum.dto.AddressDto;
import um.edu.pizzum.burgum.dto.PaymentMethodDto;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private Long id;
    private String email;
    private String name;
    private String lastname;
    private String role;
    private List<AddressDto> addresses;
    private List<PaymentMethodDto> payments;
}


