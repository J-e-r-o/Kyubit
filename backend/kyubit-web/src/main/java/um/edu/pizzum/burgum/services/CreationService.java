package um.edu.pizzum.burgum.services;


import um.edu.pizzum.burgum.dto.CreationDto;

import java.util.List;

public interface CreationService {
    CreationDto create(CreationDto dto);
    CreationDto getById(Long id);
    List<CreationDto> findAll();
    List<CreationDto> findByUserId(Long userId);
    CreationDto update(Long id, CreationDto dto);
    void delete(Long id);
}
