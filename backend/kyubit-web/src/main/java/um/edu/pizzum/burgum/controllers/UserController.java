package um.edu.pizzum.burgum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.AddressDto; // Asumo que tienes o crearás estos DTOs
import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.services.UserService; // Debes tener un servicio para esto

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // Agregar Dirección
    @PostMapping("/{userId}/addresses")
    public ResponseEntity<AddressDto> addAddress(@PathVariable Long userId, @RequestBody AddressDto addressDto) {
        AddressDto savedAddress = userService.addAddressToUser(userId, addressDto);
        return ResponseEntity.ok(savedAddress);
    }

    // Agregar Método de Pago
    @PostMapping("/{userId}/payments")
    public ResponseEntity<PaymentMethodDto> addPayment(@PathVariable Long userId, @RequestBody PaymentMethodDto paymentDto) {
        PaymentMethodDto savedPayment = userService.addPaymentToUser(userId, paymentDto);
        return ResponseEntity.ok(savedPayment);
    }
}