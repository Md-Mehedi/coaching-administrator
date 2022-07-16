
package coaching.administrator.classes.Person;

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

import coaching.administrator.classes.Global.Global;
import net.bytebuddy.build.EntryPoint.Unvalidated;

@RestController
public class PersonController {

    @Autowired
    private PersonService service;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    // @PostMapping("/verify-person")
    // public String addAdmin(@RequestParam("email") String email,
    // @RequestParam("password") String password) {

    // Person unVerifiedPerson = new Person();
    // try {
    // Person existingPerson = service.getPersonByEmail(email);
    // if (existingPerson != null) {
    // return "email already taken";
    // }

    // unVerifiedPerson.setEmail(email);
    // unVerifiedPerson.setPassword(password);
    // unVerifiedPerson.setActivated("F");
    // service.savePerson(unVerifiedPerson);

    // unVerifiedPerson = service.getPersonByEmail(email);
    // ConfirmationToken confirmationToken = new
    // ConfirmationToken(unVerifiedPerson.getId());
    // confirmationTokenRepository.save(confirmationToken);
    // SimpleMailMessage mailMessage = new SimpleMailMessage();
    // mailMessage.setTo(unVerifiedPerson.getEmail());
    // mailMessage.setSubject("Complete Registration!");
    // mailMessage.setText("To confirm your account, please click here : "
    // + Global.BASE_PATH + "/confirm-person?token=" +
    // confirmationToken.getConfirmationToken());

    // emailService.sendEmail(mailMessage);

    // return "person set for email confirmation";

    // } catch (Exception e) {
    // service.deletePerson(unVerifiedPerson.getId());
    // System.out.println("\033[31minside Exception in add person\033[0m");
    // e.printStackTrace();
    // }
    // return null;
    // }

    // @RequestMapping(value = "/confirm-person", method = { RequestMethod.GET,
    // RequestMethod.POST })
    // public String confirmPerson(@RequestParam("token") String confirmationToken)
    // {
    // try {
    // ConfirmationToken token =
    // confirmationTokenRepository.findByConfirmationToken(confirmationToken);

    // if (token != null) {
    // Person person = service.getPersonById(token.getPersonId());
    // person.setActivated("T");
    // service.updatePerson(person);
    // return "person account verified with email";
    // } else {
    // return "The link is invalid or broken";
    // }
    // } catch (Exception e) {
    // System.out.println("\033[31minside Exception in confirm person\033[0m");
    // e.printStackTrace();
    // }
    // return null;
    // }

    // @PostMapping("/add-person")
    // public String addAdmin(@RequestBody Person person) {

    // try {
    // System.out.println("\033[31minside add person\033[0m");

    // service.savePerson(person);

    // } catch (Exception e) {
    // service.deletePerson(person.getId());
    // System.out.println("\033[31minside Exception in add person\033[0m");
    // e.printStackTrace();
    // }
    // return null;
    // }

    @GetMapping("/get-person-by-id/{id}")
    public Person getPersonById(@PathVariable Integer id) {
        return service.getPersonById(id);
    }

    // @GetMapping("/helloworld")
    // public String helloWorld() {
    // System.out.println("\033[31minside spring boot hello world.\033[0m");
    // return "Hello Spring Boot";
    // }

    @GetMapping("/get-person-by-full-name/{name}")
    public Person getPersonByFullName(@PathVariable String name) {
        return service.getPersonByFullName(name);
    }

    @GetMapping("/get-person-by-eamil/{email}")
    public Person getPersonByEmail(@PathVariable String email) {
        return service.getPersonByEmail(email);
    }

    @PutMapping("/update-person-by-id")
    public Person updatePerson(@RequestBody Person person) {
        return service.updatePerson(person);
    }
}
