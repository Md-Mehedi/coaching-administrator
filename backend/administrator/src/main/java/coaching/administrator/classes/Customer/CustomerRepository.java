package coaching.administrator.classes.Customer;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findByName(String name);
    List<Customer> findAll();
    //Customer findById(Integer id);
}
