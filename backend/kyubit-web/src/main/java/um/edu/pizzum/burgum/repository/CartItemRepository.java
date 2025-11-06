package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
