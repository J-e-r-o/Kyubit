package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import um.edu.pizzum.burgum.entities.Token;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    /**
     * Consulta personalizada para encontrar todos los tokens de un usuario que aún son válidos.
     * Esta versión usa la navegación de objetos de JPQL (t.user.id), que es la forma correcta
     * y más limpia de escribir la consulta.
     */
    @Query("""
        SELECT t FROM Token t
        WHERE t.user.id = :userId AND (t.expired = false OR t.revoked = false)
    """)
    List<Token> findAllValidTokenByUser(Long userId);

    Optional<Token> findByToken(String token);
}

