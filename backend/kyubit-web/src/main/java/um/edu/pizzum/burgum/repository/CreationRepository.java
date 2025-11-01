package um.edu.pizzum.burgum.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import um.edu.pizzum.burgum.entities.Creation;


import java.util.Optional;


public interface CreationRepository extends JpaRepository<Creation, Long> {


    @Query("select c from Creation c left join fetch c.ingredients where c.id = :id")
    Optional<Creation> findByIdWithIngredients(@Param("id") Long id);


    @Query("select distinct c from Creation c left join fetch c.ingredients where c.user.id = :userId")
    java.util.List<Creation> findByUserIdWithIngredients(@Param("userId") Long userId);


}
