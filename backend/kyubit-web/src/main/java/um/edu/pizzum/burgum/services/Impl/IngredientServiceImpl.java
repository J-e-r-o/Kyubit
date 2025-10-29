package um.edu.pizzum.burgum.services.Impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.IngredientDto;
import um.edu.pizzum.burgum.entities.Ingredient;
import um.edu.pizzum.burgum.exceptions.BadRequestException;
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
    public IngredientDto createIngredient(IngredientDto ingredientDto) {
        if (ingredientDto == null) throw new BadRequestException("ingredientDto cannot be null");

        if (ingredientDto.getName() != null && ingredientRepository.existsByName(ingredientDto.getName())) {
            throw new BadRequestException("Ingredient with name '" + ingredientDto.getName() + "' already exists");
        }

        Ingredient toSave = IngredientMapper.mapToIngredient(ingredientDto);
        Ingredient saved = ingredientRepository.save(toSave);
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
    public IngredientDto getIngredientById(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ingredient", "id", id));
        return IngredientMapper.mapToIngredientDto(ingredient);
    }

    @Override
    public IngredientDto updateIngredient(Long id, IngredientDto ingredientDto) {
        if (ingredientDto == null) throw new BadRequestException("ingredientDto cannot be null");

        Ingredient existing = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ingredient", "id", id));

        String newName = ingredientDto.getName();
        if (newName != null && !newName.equals(existing.getName())) {
            if (ingredientRepository.existsByName(newName)) {
                throw new BadRequestException("Ingredient with name '" + newName + "' already exists");
            }
            existing.setName(newName);
        }

        if (ingredientDto.getCost() != null) existing.setCost(ingredientDto.getCost());
        if (ingredientDto.getStock() != null) existing.setStock(ingredientDto.getStock());

        Ingredient saved = ingredientRepository.save(existing);
        return IngredientMapper.mapToIngredientDto(saved);
    }

    @Override
    public void deleteIngredient(Long id) {
        Ingredient existing = ingredientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ingredient", "id", id));

        if (existing.getCreations() != null) {
            existing.getCreations().forEach(c -> c.getIngredients().remove(existing));
            existing.getCreations().clear();
        }

        ingredientRepository.delete(existing);
    }
}
