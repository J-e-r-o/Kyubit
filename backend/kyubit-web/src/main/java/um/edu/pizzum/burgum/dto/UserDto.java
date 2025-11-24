package um.edu.pizzum.burgum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import um.edu.pizzum.burgum.entities.User;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String lastname;
    private String email;
    private LocalDate birthdate;
    private User.Role role;

    // Listas de IDs
    private List<Long> tokenIds;
    private List<Long> addressIds;
    private List<Long> createdProductIds;

    // ELIMINADO: private Set<Long> favoriteCreationIds;
}