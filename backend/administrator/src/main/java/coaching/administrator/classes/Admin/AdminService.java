package coaching.administrator.classes.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.Person.PersonService;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;
    @Autowired
    private PersonService personService;

    public Admin saveAdmin(Admin admin) {
        // PasswordEncoder pEncoder = new PasswordEncoder();
        // admin.setPassword(pEncoder.getEncodedPassword(admin.getPerson().getPassword()));
        return repository.save(admin);
    }

    public Admin getAdminById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Admin getAdminByFullName(String name) {
        Person person = personService.getPersonByFullName(name);
        Admin admin = new Admin();
        admin.setPerson(person);
        return admin;
    }

    public Admin getAdminByEmail(String email) {
        Person person = personService.getPersonByEmail(email);
        if (person == null)
            return null;
        Admin admin = new Admin();
        admin.setPerson(person);
        return admin;
    }

    public String deleteAdmin(Integer id) {

        repository.deleteById(id);
        return "Admin with id : " + id + " deleted";
    }

    public Admin updateAdmin(Admin admin) {

        // personService.updatePerson(admin);
        // Admin newAdmin = repository.findById(admin.getId()).orElse(null);
        // return newAdmin;
        return repository.save(admin);
    }

}