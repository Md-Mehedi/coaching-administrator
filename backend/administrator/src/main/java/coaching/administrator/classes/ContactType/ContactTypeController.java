
package coaching.administrator.classes.ContactType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactTypeController {

    @Autowired
    private ContactTypeService service;

    @PostMapping("/add-contactType")
    public ContactType addContactType(@RequestBody ContactType contactType) {
        System.out.println("\033[31minside add contactType\033[0m");

        return service.saveContactType(contactType);
    }

    @GetMapping("/get-contactType-by-id/{id}")
    public ContactType getContactTypeById(@PathVariable Integer id) {
        return service.getContactTypeById(id);
    }

    @GetMapping("/get-contactType-by-name/{name}")
    public ContactType getContactTypeByName(@PathVariable String name) {
        return service.getContactTypeByName(name);
    }

    @DeleteMapping("/delete-contactType-by-id")
    public String deleteContactType(@PathVariable Integer id) {
        return service.deleteContactType(id);
    }

    @GetMapping("/get-all-contactType")
    public List<ContactType> deleteContactType() {
        return service.getAllContactType();
    }
}
