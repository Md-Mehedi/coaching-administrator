package coaching.administrator.classes.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Person.PersonRepository;
import coaching.administrator.classes.Person.PersonService;
import coaching.administrator.classes.Security.PasswordEncoder;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;
    @Autowired
    private PersonService personService;

    public Admin saveAdmin(Admin admin) {
        PasswordEncoder pEncoder = new PasswordEncoder();
        // admin.setPassword(pEncoder.getEncodedPassword(admin.getPassword()));
        return repository.save(admin);
    }

    public Admin getAdminById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Admin getAdminByFullName(String name) {
        return repository.findByFullName(name);
    }

    public Admin getAdminByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String deleteAdmin(Integer id) {

        repository.deleteById(id);
        return "Admin with id : " + id + " deleted";
    }

    public Admin updateAdmin(Admin admin) {
        // Admin oldAdmin = repository.findById(admin.getId()).orElse(null);

        // personService.updatePerson(oldAdmin);

        // return repository.save(oldAdmin);
        return null;
    }

}