package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.Order;
import um.edu.pizzum.burgum.entities.User;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByClient(User client);

    List<Order> findByClientId(Long clientId);
}
