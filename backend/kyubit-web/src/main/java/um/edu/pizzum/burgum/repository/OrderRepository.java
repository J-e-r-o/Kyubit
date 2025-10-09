package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.Order;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
