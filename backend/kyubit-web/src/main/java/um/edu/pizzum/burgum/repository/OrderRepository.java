package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.Order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByClient_IdAndStatus(Long clientId, String status);
    List<Order> findAllByClient_IdOrderByCreatedAtDesc(Long clientId);
    List<Order> findByCreatedAtBetweenAndStatus(LocalDateTime start, LocalDateTime end, String status);
}