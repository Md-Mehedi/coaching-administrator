package coaching.administrator.classes.PersonContact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonContactController {

    @Autowired
    private PersonContactService service;

    @PostMapping("/add-personContact")
    public PersonContact addPersonContact(@RequestBody PersonContact personContact) {
        System.out.println("\033[31minside add personContact\033[0m");

        return service.savePersonContact(personContact);
    }

    @GetMapping("/get-personContact-by-id/{id}")
    public PersonContact getPersonContactById(@PathVariable Integer id) {
        return service.getPersonContactById(id);
    }

    @DeleteMapping("/delete-personContact-by-id")
    public String deletePersonContact(@PathVariable Integer id) {
        return service.deletePersonContact(id);
    }
}
