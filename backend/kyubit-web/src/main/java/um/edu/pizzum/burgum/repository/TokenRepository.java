package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; // <-- 1. IMPORTA @Param
import um.edu.pizzum.burgum.entities.Token;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    /**
     * Consulta personalizada para encontrar todos los tokens de un usuario que aún son válidos.
     * Esta versión incluye AMBAS correcciones:
     * 1. Usa 'FROM tokens t' (el nombre de la entidad de tu @Entity(name="tokens"))
     * 2. Usa 't.user.id = :userId' para comparar el ID del usuario (Long) con el parámetro (Long).
     */
    @Query("""
        SELECT t FROM tokens t
        WHERE t.user.id = :userId AND (t.expired = false AND t.revoked = false)
    """) // <-- 2. CAMBIADO DE 'OR' A 'AND'
    List<Token> findAllValidTokenByUser(@Param("userId") Long userId); // <-- 3. AÑADIDO @Param("userId")

    Optional<Token> findByToken(String token);
}