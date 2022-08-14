
package coaching.administrator.classes.Coaching;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.APIMessage;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
public class CoachingController {

    @Autowired
    private CoachingService service;

    @PostMapping("/add-coaching")
    public APIMessage addAdmin(@RequestPart("coaching") Coaching coaching, @RequestPart("image") MultipartFile image) {

        try {
            System.out.println("\033[31minside add coaching\033[0m");
            Coaching existingCoaching = service.getCoachingByEmail(coaching.getEmail());

            if (existingCoaching != null) {
                return new APIMessage(false, "Email already taken");
            }

            service.saveCoaching(coaching, image);
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

    // #TODO Update
    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-coaching-by-admin-id/{id}")
    public ObjectNode getCoachingByAdminId(@PathVariable Integer id) {
        Coaching coaching = service.getCoachingByAdminId(id);
        if (coaching == null) {
            return Global.createErrorMessage("Coaching not found");
        }
        if (coaching.getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Coaching found")
                    .putPOJO("object", coaching);
        } else {
            return Global.createErrorMessage("Not eligible to fetch coaching");
        }
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
