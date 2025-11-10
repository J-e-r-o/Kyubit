package um.edu.pizzum.burgum.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import um.edu.pizzum.burgum.dto.CreationDto;
import um.edu.pizzum.burgum.entities.Creation;
import um.edu.pizzum.burgum.entities.Ingredient;
import um.edu.pizzum.burgum.entities.User;
import um.edu.pizzum.burgum.exceptions.CreationNotFoundException;
import um.edu.pizzum.burgum.mapper.CreationMapper;
import um.edu.pizzum.burgum.repository.CreationRepository;
import um.edu.pizzum.burgum.repository.IngredientRepository;
import um.edu.pizzum.burgum.repository.UserRepository;
import um.edu.pizzum.burgum.services.CreationService;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CreationServiceImpl implements CreationService {

    private final CreationRepository creationRepository;
    private final UserRepository userRepository;
    private final IngredientRepository ingredientRepository;

    @Override
    @Transactional
    public CreationDto create(CreationDto dto) {
        // map DTO -> entidad (placeholders)
        Creation creation = CreationMapper.mapToCreation(dto);

        // 1) resolver user
        if (dto.getUserId() == null) {
            throw new CreationNotFoundException("User id is required for creation");
        }
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new CreationNotFoundException("User", "id", dto.getUserId()));
        creation.setUser(user);


        // 2) resolver ingredientes desde DB
        Set<Ingredient> resolvedIngredients = resolveIngredients(dto.getIngredientIds());
        creation.setIngredients(resolvedIngredients);


        // 3) guardar
        Creation saved = creationRepository.save(creation);
        // 4) volver a leer la entidad con ingredients inicializados
        Creation withIngredients = creationRepository.findByIdWithIngredients(saved.getId())
                .orElse(saved);

        return CreationMapper.mapToCreationDto(withIngredients);
    }

    @Override
    @Transactional(readOnly = true)
    public CreationDto getById(Long id) {
        Creation c = creationRepository.findById(id)
                .orElseThrow(() -> new CreationNotFoundException("Creation", "id", id));
        return CreationMapper.mapToCreationDto(c);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CreationDto> findAll() {
        return creationRepository.findAll()
                .stream()
                .map(CreationMapper::mapToCreationDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CreationDto> findByUserId(Long userId) {
        return creationRepository.findAll()
                .stream()
                .filter(c -> c.getUser() != null && userId.equals(c.getUser().getId()))
                .map(CreationMapper::mapToCreationDto)
                .toList();
    }

    @Override
    @Transactional
    public CreationDto update(Long id, CreationDto dto) {
        Creation existing = creationRepository.findById(id)
                .orElseThrow(() -> new CreationNotFoundException("Creation", "id", id));

        // campos simples
        if (dto.getName() != null) existing.setName(dto.getName());
        if (dto.getProductType() != null) existing.setProductType(dto.getProductType());

        // user
        if (dto.getUserId() != null) {
            User user = userRepository.findById(dto.getUserId())
                    .orElseThrow(() -> new CreationNotFoundException("User", "id", dto.getUserId()));
            existing.setUser(user);
        }


        // ingredients -> reemplazar
        if (dto.getIngredientIds() != null) {
            Set<Ingredient> resolvedIngredients = resolveIngredients(dto.getIngredientIds());
            existing.getIngredients().clear();
            existing.getIngredients().addAll(resolvedIngredients);
        }

        Creation saved = creationRepository.save(existing);
        Creation withIngredients = creationRepository.findByIdWithIngredients(saved.getId()).orElse(saved);
        return CreationMapper.mapToCreationDto(withIngredients);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!creationRepository.existsById(id)) {
            throw new CreationNotFoundException("Creation", "id", id);
        }
        creationRepository.deleteById(id);
    }

    /**
     * Helper: convierte ids -> Set<Ingredient> y valida que existan todos.
     */
    private Set<Ingredient> resolveIngredients(Set<Long> ingredientIds) {
        if (ingredientIds == null || ingredientIds.isEmpty()) return Collections.emptySet();


        Iterable<Ingredient> found = ingredientRepository.findAllById(ingredientIds);
        Set<Ingredient> foundSet = StreamSupport.stream(found.spliterator(), false)
                .collect(Collectors.toSet());


        Set<Long> foundIds = foundSet.stream().map(Ingredient::getId).collect(Collectors.toSet());
        Set<Long> missing = ingredientIds.stream().filter(id -> !foundIds.contains(id)).collect(Collectors.toSet());
        if (!missing.isEmpty()) {
            throw new CreationNotFoundException("Ingredients not found with ids: " + missing);
        }
        return foundSet;
    }
}
