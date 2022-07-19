package coaching.administrator.classes.PersonContact;

import java.util.List;

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
    public List<PersonContact> addPersonContact(@RequestBody List<PersonContact> personContacts) {
        System.out.println("\033[31minside add personContact\033[0m");

        for (PersonContact personContact : personContacts)
            service.savePersonContact(personContact);
        return service.getPersonContactByPersonId(personContacts.get(0).getPerson().getId());
    }

    @GetMapping("/get-personContact-by-id/{id}")
    public PersonContact getPersonContactById(@PathVariable Integer id) {
        return service.getPersonContactById(id);
    }

    @GetMapping("/get-personContact-by-person/{id}")
    public List<PersonContact> getPersonContactByPersonId(@PathVariable Integer personId) {
        return service.getPersonContactByPersonId(personId);
    }

    @DeleteMapping("/delete-personContact-by-id")
    public String deletePersonContact(@PathVariable Integer id) {
        return service.deletePersonContact(id);
    }
}
