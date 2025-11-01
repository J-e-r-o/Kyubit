package um.edu.pizzum.burgum.controllers;



import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.PaymentMethodDto;
import um.edu.pizzum.burgum.services.PaymentMethodService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/payment-methods")
@RequiredArgsConstructor
public class PaymentMethodController {

    private final PaymentMethodService service;

    @GetMapping
    public ResponseEntity<List<PaymentMethodDto>> list(@RequestParam(value = "userId", required = false) Long userId) {
        List<PaymentMethodDto> result = (userId == null) ? service.findAll() : service.findByUserId(userId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentMethodDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping
    public ResponseEntity<PaymentMethodDto> create(@RequestBody PaymentMethodDto dto) {
        PaymentMethodDto saved = service.create(dto);
        return ResponseEntity.created(URI.create("/api/payment-methods/" + saved.getId())).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethodDto> update(@PathVariable Long id, @RequestBody PaymentMethodDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
