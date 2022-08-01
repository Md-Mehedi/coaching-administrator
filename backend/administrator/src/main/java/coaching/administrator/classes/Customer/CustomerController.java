
package coaching.administrator.classes.Customer;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class CustomerController {

    @Autowired
    private CustomerRepository repository;

    private ObjectMapper mapper;

    @PostMapping("/add-customer")
    public Customer addCustomer(@RequestBody Customer customer) {
        System.out.println("\033[31minside add customer\033[0m");

        return repository.save(customer);

    }

    @GetMapping("/get-customer-by-id/{id}")
    public Customer getCustomerById(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/get-all-customers")
    public List<Customer> getCustomers() {
        return repository.findAll();
    }

    @GetMapping("/get-customer-by-name/{name}")
    public Customer getCustomerByName(@PathVariable String name) {
        return repository.findByName(name);
    }


    @DeleteMapping("/delete-customer-by-id")
    public String deleteCustomer(@PathVariable Integer id) {
        return "Customer with id : " + id + " deleted";
    }
}
