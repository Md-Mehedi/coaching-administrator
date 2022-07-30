package coaching.administrator.classes.PersonContact;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonContactService {

    @Autowired
    private PersonContactRepository repository;

    public PersonContact savePersonContact(PersonContact personContact) {
        return repository.save(personContact);
    }

    public PersonContact getPersonContactById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public String deletePersonContact(Integer id) {
        repository.deleteById(id);
        return "PersonContact with id : " + id + " deleted";
    }

}