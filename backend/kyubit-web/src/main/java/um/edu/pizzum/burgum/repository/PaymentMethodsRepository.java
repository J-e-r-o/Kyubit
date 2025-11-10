package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.PaymentMethod;

import java.util.List;
import java.util.Optional;

public interface PaymentMethodsRepository extends JpaRepository<PaymentMethod, Long> {
    List<PaymentMethod> findByUser_Id(Long userId);
    Optional<PaymentMethod> findByIdAndUser_Id(Long id, Long userId); // opcional: para control de propietario
}
