
package coaching.administrator.classes.Admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import coaching.administrator.classes.Global.APIMessage;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Person.ConfirmationToken;
import coaching.administrator.classes.Person.ConfirmationTokenRepository;
import coaching.administrator.classes.Person.EmailService;
import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.Security.PasswordEncoder;

@RestController
public class AdminController {

    @Autowired
    private AdminService service;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/verify-admin")
    public APIMessage addAdmin(@RequestBody Map<String, Object> adminMap) {

        String email = (String) adminMap.get("email");
        String password = (String) adminMap.get("password");
        // Admin unVerifiedAdmin = new Admin();
        try {
            Admin existingAdmin = service.getAdminByEmail(email);
            if (existingAdmin != null) {
                return new APIMessage(false, "Email already taken");
            }

            // unVerifiedAdmin.setEmail(email);
            // unVerifiedAdmin.setPassword(password);
            // unVerifiedAdmin.setActivated("F");
            // personService.savePerson(unVerifiedAdmin);
            // service.saveAdmin(unVerifiedAdmin);

            // unVerifiedAdmin = service.getAdminByEmail(email);
            ConfirmationToken confirmationToken = new ConfirmationToken(email, password);
            confirmationTokenRepository.save(confirmationToken);
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(email);
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
                    + Global.FRONTEND_PATH + "/auth/confirm-admin?token=" + confirmationToken.getConfirmationToken());

            emailService.sendEmail(mailMessage);

            return new APIMessage(true, "Registration successful");

        } catch (Exception e) {
            // service.deleteAdmin(unVerifiedAdmin.getId());
            System.out.println("\033[31minside Exception in add admin\033[0m");
            e.printStackTrace();
        }
        return new APIMessage(false, "Server error. Please try again");
    }

    @RequestMapping(value = "/confirm-admin", method = { RequestMethod.GET, RequestMethod.POST })
    public APIMessage confirmAdmin(@RequestParam("token") String confirmationToken) {
        try {
            ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

            if (token != null) {
                if (service.getAdminByEmail(token.getEmail()) != null)
                    return new APIMessage(false, "Email already taken");
                Person person = new Person();
                // admin.setActivated("T");
                person.setPassword(token.getPassword());
                person.setEmail(token.getEmail());
                // personService.savePerson(person);
                // person = personService.getPersonByEmail(token.getEmail());
                Admin admin = new Admin();
                admin.setPerson(person);
                service.saveAdmin(admin);
                return new APIMessage(true, "Account verified successfully");
            } else {
                return new APIMessage(false, "The link is invalid or broken");
            }
        } catch (Exception e) {
            System.out.println("\033[31minside Exception in confirm admin\033[0m");
            e.printStackTrace();
            return new APIMessage(false, "Server error. Please try again");
        }
        // return null;
    }

    @PostMapping("/add-admin")
    public APIMessage addAdmin(@RequestBody Admin admin) {

        try {
            System.out.println("\033[31minside add admin\033[0m");

            // personService.savePerson(admin);
            service.saveAdmin(admin);

        } catch (Exception e) {
            service.deleteAdmin(admin.getPerson().getId());
            System.out.println("\033[31minside Exception in add admin\033[0m");
            e.printStackTrace();
            return new APIMessage(false, "Something went wrong. Please try again");
        }
        return null;
    }

    @GetMapping("/get-admin-by-id/{id}")
    public Admin getAdminById(@PathVariable Integer id) {
        return service.getAdminById(id);
    }

    @GetMapping("/helloworld")
    public String helloWorld() {
        System.out.println("\033[31minside spring boot hello world.\033[0m");
        return "Hello Spring Boot";
    }

    @GetMapping("/get-admin-by-full-name/{name}")
    public Admin getAdminByFullName(@PathVariable String name) {
        return service.getAdminByFullName(name);
    }

    @GetMapping("/get-admin-by-email/{email}")
    public Admin getAdminByEmail(@PathVariable String email) {
        return service.getAdminByEmail(email);
    }

    @PutMapping("/update-admin-by-id")
    public Admin updateAdmin(@RequestBody Admin admin) {
        return service.updateAdmin(admin);
    }

    @GetMapping("/authenticate-admin")
    public APIMessage authenticateAdmin(@RequestBody Map<String, String> adminMap) {

        String email = adminMap.get("email");
        String password = adminMap.get("password");

        PasswordEncoder pEncoder = new PasswordEncoder();
        String encodedPasssword = pEncoder.getEncodedPassword(password);
        Admin admin = service.getAdminByEmail(email);
        if (admin == null) {
            if (confirmationTokenRepository.findByEmail(email) != null)
                return new APIMessage(false, "Check your inbox to verify account !");
            else
                return new APIMessage(false, "Please register first");

        } else if (!encodedPasssword.equals(admin.getPerson().getPassword()))
            return new APIMessage(false, "Please enter correct password !");
        else if (encodedPasssword.equals(admin.getPerson().getPassword()))
            return new APIMessage(false, "Login successful");
        else
            return new APIMessage(false, "Something went wrong. Please try again");
    }

}
