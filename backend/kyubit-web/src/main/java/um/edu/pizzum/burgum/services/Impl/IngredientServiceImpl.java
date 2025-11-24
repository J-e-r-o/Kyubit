package um.edu.pizzum.burgum.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.IngredientDto;
import um.edu.pizzum.burgum.entities.Ingredient;
import um.edu.pizzum.burgum.exceptions.BadRequestException; // O tu excepción personalizada
import um.edu.pizzum.burgum.exceptions.ResourceNotFoundException;
import um.edu.pizzum.burgum.mapper.IngredientMapper;
import um.edu.pizzum.burgum.repository.IngredientRepository;
import um.edu.pizzum.burgum.services.IngredientService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class IngredientServiceImpl implements IngredientService {

    private final IngredientRepository ingredientRepository;

    public IngredientServiceImpl(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public IngredientDto createIngredient(IngredientDto dto) {
        if (dto == null) throw new BadRequestException("El DTO no puede ser nulo");
        if (dto.getType() == null) throw new BadRequestException("El tipo de ingrediente es obligatorio (MEAT, BREAD, etc)");

        if (dto.getName() != null && ingredientRepository.existsByName(dto.getName())) {
            throw new BadRequestException("El ingrediente '" + dto.getName() + "' ya existe");
        }

        Ingredient saved = ingredientRepository.save(IngredientMapper.mapToIngredient(dto));
        return IngredientMapper.mapToIngredientDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<IngredientDto> getAllIngredients() {
        return ingredientRepository.findAll().stream()
                .map(IngredientMapper::mapToIngredientDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<IngredientDto> getIngredientsByType(String typeName) {
        try {
            // Convertimos el String (ej: "MEAT") al Enum
            Ingredient.IngredientType type = Ingredient.IngredientType.valueOf(typeName.toUpperCase());
            return ingredientRepository.findByType(type).stream()
                    .map(IngredientMapper::mapToIngredientDto)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Tipo de ingrediente inválido: " + typeName);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public IngredientDto getIngredientById(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ingredient", "id", id));
        return IngredientMapper.mapToIngredientDto(ingredient);
    }

    @Override
    public IngredientDto updateIngredient(Long id, IngredientDto dto) {
        Ingredient existing = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ingredient", "id", id));

        if (dto.getName() != null && !dto.getName().equals(existing.getName())) {
            if (ingredientRepository.existsByName(dto.getName())) {
                throw new BadRequestException("Nombre ya existe: " + dto.getName());
            }
            existing.setName(dto.getName());
        }

        if (dto.getCost() != null) existing.setCost(dto.getCost());
        if (dto.getStock() != null) existing.setStock(dto.getStock());
        if (dto.getType() != null) existing.setType(dto.getType()); // Actualizar tipo

        Ingredient saved = ingredientRepository.save(existing);
        return IngredientMapper.mapToIngredientDto(saved);
    }

    @Override
    public void deleteIngredient(Long id) {
        Ingredient existing = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ingredient", "id", id));

        // Limpiar relaciones antes de borrar para evitar errores de FK
        if (existing.getCreations() != null) {
            existing.getCreations().forEach(c -> c.getIngredients().remove(existing));
        }

        ingredientRepository.delete(existing);
    }
}