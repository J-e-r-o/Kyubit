package um.edu.pizzum.burgum.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.CardOwnerDto;
import um.edu.pizzum.burgum.dto.OrderDto;
import um.edu.pizzum.burgum.services.ExternalService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/external")
@RequiredArgsConstructor
public class ExternalController {

    private final ExternalService externalService;

    /**
     * Servicio para DGI: Devuelve tickets de venta por fecha.
     * Ejemplo: GET /api/external/dgi/sales?date=2025-11-23
     */
    @GetMapping("/dgi/sales")
    public ResponseEntity<List<OrderDto>> getDgiSales(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(externalService.getSalesByDate(date));
    }

    /**
     * Servicio para BPS: Devuelve cantidad de funcionarios.
     * Ejemplo: GET /api/external/bps/employees
     */
    @GetMapping("/bps/employees")
    public Object getBpsEmployees() {
        return ResponseEntity.ok(externalService.getEmployeeCount());
    }
    @GetMapping("/cards/{cardNumber}/owner")
    public ResponseEntity<List<CardOwnerDto>> getCardOwner(@PathVariable String cardNumber) {
        return ResponseEntity.ok(externalService.getCardOwnerInfo(cardNumber));
    }


}