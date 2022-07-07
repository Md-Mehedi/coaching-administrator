
package coaching.administrator.classes.Address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    @Autowired
    private AddressService service;

    @PostMapping("/add-address")
    public Address addAddress(@RequestBody Address address) {
        System.out.println("\033[31minside add address\033[0m");

        return service.saveAddress(address);
    }

    @GetMapping("/get-address-by-id/{id}")
    public Address getAddressById(@PathVariable Integer id) {
        return service.getAddressById(id);
    }

    @GetMapping("/get-address-by-name/{name}")
    public Address getAddressByName(@PathVariable String name) {
        return service.getAddressByName(name);
    }

    @DeleteMapping("/delete-address-by-id")
    public String deleteAddress(@PathVariable Integer id) {
        return service.deleteAddress(id);
    }
}
