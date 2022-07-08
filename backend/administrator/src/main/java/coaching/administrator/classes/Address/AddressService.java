package coaching.administrator.classes.Address;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    @Autowired
    private AddressRepository repository;

    public Address saveAddress(Address address) {
        return repository.save(address);
    }

    public Address getAddressById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Address getAddressByName(String name) {
        return repository.findByName(name);
    }

    public String deleteAddress(Integer id) {
        repository.deleteById(id);
        return "Address with id : " + id + " deleted";
    }

}