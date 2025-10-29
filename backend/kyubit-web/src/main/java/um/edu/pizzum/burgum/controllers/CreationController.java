package um.edu.pizzum.burgum.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import um.edu.pizzum.burgum.dto.CreationDto;
import um.edu.pizzum.burgum.services.CreationService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/creations")
@RequiredArgsConstructor
public class CreationController {

    private final CreationService creationService;

    @GetMapping
    public ResponseEntity<List<CreationDto>> list(
            @RequestParam(value = "userId", required = false) Long userId) {
        List<CreationDto> list = (userId != null)
                ? creationService.findByUserId(userId)
                : creationService.findAll();
        return ResponseEntity.ok(list);
    }


    @GetMapping("/{id}")
    public ResponseEntity<CreationDto> get(@PathVariable Long id) {
        return ResponseEntity.ok(creationService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CreationDto> create(@Valid @RequestBody CreationDto dto,
                                              UriComponentsBuilder uriBuilder) {
        CreationDto saved = creationService.create(dto);
        URI location = uriBuilder.path("/api/creations/{id}").buildAndExpand(saved.getId()).toUri();
        return ResponseEntity.created(location).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CreationDto> update(@PathVariable Long id,
                                              @Valid @RequestBody CreationDto dto) {
        CreationDto updated = creationService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        creationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
