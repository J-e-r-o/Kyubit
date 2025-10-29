package um.edu.pizzum.burgum.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.edu.pizzum.burgum.dto.IngredientDto;
import um.edu.pizzum.burgum.exceptions.BadRequestException;
import um.edu.pizzum.burgum.exceptions.ResourceNotFoundException;
import um.edu.pizzum.burgum.services.IngredientService;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid IngredientDto dto) {
        try {
            IngredientDto created = ingredientService.createIngredient(dto);
            return ResponseEntity.created(URI.create("/api/ingredients/" + created.getId())).body(created);
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<IngredientDto>> list() {
        return ResponseEntity.ok(ingredientService.getAllIngredients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        try {
            IngredientDto dto = ingredientService.getIngredientById(id);
            return ResponseEntity.ok(dto);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody @Valid IngredientDto dto) {
        try {
            IngredientDto updated = ingredientService.updateIngredient(id, dto);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (BadRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            ingredientService.deleteIngredient(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
