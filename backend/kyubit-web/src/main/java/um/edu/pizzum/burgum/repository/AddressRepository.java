package um.edu.pizzum.burgum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.edu.pizzum.burgum.entities.Address;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address,Long> {


    List<Address> findByUserId(Long userId);


}
