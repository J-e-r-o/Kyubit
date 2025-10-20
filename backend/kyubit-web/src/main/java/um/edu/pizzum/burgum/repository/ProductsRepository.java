package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.Products;

public interface ProductsRepository extends JpaRepository<Products,Long> {


}
