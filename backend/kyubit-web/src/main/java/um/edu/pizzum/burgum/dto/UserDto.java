package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import um.edu.pizzum.burgum.entities.User;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

/**
 * DTO de salida (Output DTO) para exponer la información del usuario.
 * Nota: El campo 'password' se excluye por seguridad.
 * Las relaciones complejas se mapean solo a sus IDs.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private String name;
    private String lastname;
    private String email;
    private LocalDate birthdate;
    private User.Role role; // O simplemente String, si prefieres

    // Relaciones mapeadas a IDs para evitar problemas de JPA y exponer detalles internos:
    private List<Long> tokenIds;
    private Set<Long> favoriteCreationIds;
    private List<Long> addressIds;
    private List<Long> createdProductIds;
}