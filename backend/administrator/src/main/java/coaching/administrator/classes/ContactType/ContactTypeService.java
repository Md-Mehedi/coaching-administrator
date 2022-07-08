package coaching.administrator.classes.ContactType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactTypeService {

    @Autowired
    private ContactTypeRepository repository;

    public ContactType saveContactType(ContactType contactType) {
        return repository.save(contactType);
    }

    public ContactType getContactTypeById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public ContactType getContactTypeByName(String name) {
        return repository.findByName(name);
    }

    public String deleteContactType(Integer id) {
        repository.deleteById(id);
        return "ContactType with id : " + id + " deleted";
    }

}