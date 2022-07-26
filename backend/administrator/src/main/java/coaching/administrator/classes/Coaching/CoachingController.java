
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

import coaching.administrator.classes.Global.APIMessage;
import coaching.administrator.classes.Global.Global;

@RestController
public class CoachingController {

    @Autowired
    private CoachingService service;

    @PostMapping("/add-coaching")
    public APIMessage addAdmin(@RequestBody Coaching coaching) {

        try {
            System.out.println("\033[31minside add coaching\033[0m");
            Coaching existingCoaching = service.getCoachingByEmail(coaching.getEmail());

            if (existingCoaching != null) {
                return new APIMessage(false, "Email already taken");
            }

            service.saveCoaching(coaching);
            // coaching = service.getCoachingById(coaching.getId());
            return new APIMessage(true, "Information successfully submitted");
        } catch (Exception e) {
            service.deleteCoaching(coaching.getId());
            System.out.println("\033[31minside Exception in add coaching\033[0m");
            e.printStackTrace();
        }
        return new APIMessage(true, "Server error. Try again.");
    }

    @GetMapping("/get-coaching-by-id/{id}")
    public Coaching getCoachingById(@PathVariable Integer id) {
        return service.getCoachingById(id);
    }

    @GetMapping("/get-coaching-by-admin-id/{id}")
    public Coaching getCoachingByAdminId(@PathVariable Integer id) {
        return service.getCoachingByAdminId(id);
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
