
package coaching.administrator.classes.Coaching;

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

@RestController
public class CoachingController {

    @Autowired
    private CoachingService service;

    @PostMapping("/add-coaching")
    public String addAdmin(@RequestBody Coaching coaching) {

        try {
            System.out.println("\033[31minside add coaching\033[0m");
            Coaching existingCoaching = service.getCoachingByEmail(coaching.getEmail());

            if (existingCoaching != null) {
                return "email already taken";
            }

            coaching.setActivated("F");
            service.saveCoaching(coaching);
            coaching = service.getCoachingById(coaching.getId());
            ConfirmationToken confirmationToken = new ConfirmationToken(coaching.getId());

            confirmationTokenRepository.save(confirmationToken);

            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(coaching.getEmail());
            mailMessage.setSubject("Complete Registration!");
            mailMessage.setText("To confirm your account, please click here : "
                    + Global.BASE_PATH + "/confirm-admin?token=" + confirmationToken.getConfirmationToken());

            emailService.sendEmail(mailMessage);

            return "coaching set for email confirmation";
        } catch (Exception e) {
            service.deleteCoaching(coaching.getId());
            System.out.println("\033[31minside Exception in add coaching\033[0m");
            e.printStackTrace();
        }
        return null;
    }

    // @RequestMapping(value = "/confirm-admin", method = { RequestMethod.GET,
    // RequestMethod.POST })
    // public String confirmCoaching(@RequestParam("token") String
    // confirmationToken) {
    // try {
    // ConfirmationToken token =
    // confirmationTokenRepository.findByConfirmationToken(confirmationToken);

    // if (token != null) {
    // Coaching coaching = service.getCoachingById(token.getCoachingId());
    // coaching.setActivated("T");
    // service.updateCoaching(coaching);
    // return "coaching account verified with email";
    // } else {
    // return "The link is invalid or broken";
    // }
    // } catch (Exception e) {
    // System.out.println("\033[31minside Exception in add coaching\033[0m");
    // e.printStackTrace();
    // }
    // return null;
    // }

    @GetMapping("/get-coaching-by-id/{id}")
    public Coaching getCoachingById(@PathVariable Integer id) {
        return service.getCoachingById(id);
    }

    @GetMapping("/helloworld")
    public String helloWorld() {
        System.out.println("\033[31minside spring boot hello world.\033[0m");
        return "Hello Spring Boot";
    }

    @GetMapping("/get-coaching-by-name/{name}")
    public Coaching getCoachingByName(@PathVariable String name) {
        return service.getCoachingByName(name);
    }

    @GetMapping("/get-coaching-by-eamil/{email}")
    public Coaching getCoachingByEmail(@PathVariable String email) {
        return service.getCoachingByEmail(email);
    }

    @PutMapping("/update-coaching-by-id")
    public Coaching updateCoaching(@RequestBody Coaching coaching) {
        return service.updateCoaching(coaching);
    }
}
