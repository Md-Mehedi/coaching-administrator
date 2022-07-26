package coaching.administrator.classes.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.APIMessage;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Person.ConfirmationToken;
import coaching.administrator.classes.Person.ConfirmationTokenRepository;
import coaching.administrator.classes.Person.EmailService;
import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.Person.PersonService;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;
    @Autowired
    private PersonService personService;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    private EmailService emailService;

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
        // Admin oldAdmin = repository.findById(admin.getPerson_id()).orElse(null);
        // oldadm

        return repository.save(admin);
    }

    public ObjectNode authenticateAdmin(String email, String password) {
        ObjectNode node = mapper.createObjectNode();

        // PasswordEncoder pEncoder = new PasswordEncoder();
        // String encodedPasssword = pEncoder.getEncodedPassword(password);
        Admin admin = getAdminByEmail(email);

        if (admin == null)
            return node
                    .put("success", false)
                    .put("message", "User not found. Please, register first.");
        else if (!password.equals(admin.getPerson().getPassword()))
            return node
                    .put("success", false)
                    .put("message", "Password does not match");
        else if (password.equals(admin.getPerson().getPassword()))
            return node
                    .put("success", true)
                    .put("message", "Login successful")
                    .put("adminId", admin.getPerson().getId());
        else
            return node
                    .put("success", false)
                    .put("message", "Server error. Try again.");
    }

    public ObjectNode addAdmin(Admin admin) {

        ObjectNode node = mapper.createObjectNode();
        try {
            System.out.println("\033[31minside add admin\033[0m");

            // personService.savePerson(admin);
            System.out.println("Admin id : " + admin.getPerson().getId());
            saveAdmin(admin);

            return node
                    .put("success", true)
                    .put("message", "Information successfully submitted");
        } catch (Exception e) {

            System.out.println("\033[31minside Exception in add admin\033[0m");
            e.printStackTrace();
        }
        return node
                .put("success", false)
                .put("message", "Server error. Try again.");
    }

    public ObjectNode confirmAdmin(String confirmationToken) {

        ObjectNode node = mapper.createObjectNode();
        try {
            ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

            if (token != null) {
                if (getAdminByEmail(token.getEmail()) != null)
                    return node
                            .put("success", false)
                            .put("message", "Email already taken");
                Person person = new Person();
                // admin.setActivated("T");
                person.setPassword(token.getPassword());
                person.setEmail(token.getEmail());
                // personService.savePerson(person);
                // person = personService.getPersonByEmail(token.getEmail());
                Admin admin = new Admin();
                admin.setPerson(person);
                saveAdmin(admin);
                return node
                        .put("success", true)
                        .put("message", "Account verified successfully");
            } else {
                return node
                        .put("success", false)
                        .put("message", "Link is broken or invalid");
            }
        } catch (Exception e) {
            System.out.println("\033[31minside Exception in confirm admin\033[0m");
            e.printStackTrace();
            return node
                    .put("success", false)
                    .put("message", "Server error. Try again.");
        }

    }

    public ObjectNode verifyAdmin(String email, String password) {

        ObjectNode node = mapper.createObjectNode();
        try {
            Admin existingAdmin = getAdminByEmail(email);
            if (existingAdmin != null) {
                return node
                        .put("success", false)
                        .put("message", "Email already taken");
            }

            ConfirmationToken confirmationToken = new ConfirmationToken(email, password);
            confirmationTokenRepository.save(confirmationToken);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
                    + Global.FRONTEND_PATH + "/auth/confirm-admin?token=" + confirmationToken.getConfirmationToken());

            emailService.sendEmail(mailMessage);

            return node
                    .put("success", true)
                    .put("message", "Please verify your email");

        } catch (Exception e) {
            // service.deleteAdmin(unVerifiedAdmin.getId());
            System.out.println("\033[31minside Exception in add admin\033[0m");
            e.printStackTrace();
        }
        return node
                .put("success", false)
                .put("message", "Server error.Try again");
    }

}