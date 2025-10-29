package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
