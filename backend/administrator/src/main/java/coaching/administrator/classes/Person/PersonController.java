
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
import org.springframework.web.servlet.ModelAndView;

import coaching.administrator.classes.Global.Global;

@RestController
public class PersonController {

    @Autowired
    private PersonService service;

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/add-person")
    public String addPerson(@RequestBody Person person) {
        System.out.println("\033[31minside add person\033[0m");
        Person existingPerson = service.getPersonByEmail(person.getEmail());

        if (existingPerson != null) {
            return "email already taken";
        }

        person.setActivated("F");
        service.savePerson(person);
        person = service.getPersonById(person.getId());
        ConfirmationToken confirmationToken = new ConfirmationToken(person.getId());

        confirmationTokenRepository.save(confirmationToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(person.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                + Global.BASE_PATH + "/confirm-person?token=" + confirmationToken.getConfirmationToken());

        emailService.sendEmail(mailMessage);

        return "person set for email confirmation";

    }

    @RequestMapping(value = "/confirm-person", method = { RequestMethod.GET, RequestMethod.POST })
    public String confirmPerson(@RequestParam("token") String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (token != null) {
            Person person = service.getPersonById(token.getPersonId());
            person.setActivated("T");
            service.updatePerson(person);
            return "person account verified with email";
        } else {
            return "The link is invalid or broken";
        }

    }

    @GetMapping("/get-person-by-id/{id}")
    public Person getPersonById(@PathVariable Integer id) {
        return service.getPersonById(id);
    }

    @GetMapping("/helloworld")
    public String helloWorld() {
        System.out.println("\033[31minside spring boot hello world.\033[0m");
        return "Hello Spring Boot";
    }

    @GetMapping("/get-person-by-full-name/{name}")
    public Person getPersonByFullName(@PathVariable String name) {
        return service.getPersonByFullName(name);
    }

    @PutMapping("/update-person-by-id")
    public Person updatePerson(@RequestBody Person person) {
        return service.updatePerson(person);
    }
}
