
package coaching.administrator.classes.Admin;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Global.UserType;
import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.Person.PersonRepository;
import coaching.administrator.classes.Security.jwt.JwtUtils;
import coaching.administrator.classes.Security.services.UserDetailsImpl;

@RestController
@CrossOrigin(origins = Global.FRONTEND_PATH, maxAge = 3600)
public class AdminController {

    @Autowired
    private AdminService service;

    @Autowired
    PersonRepository personRepository;

    
    @PostMapping("/auth/verify-admin")
    public ObjectNode verifyAdmin(@RequestBody Map<String, Object> adminMap) {

        String email = (String) adminMap.get("email");
        String password = (String) adminMap.get("password");
        return service.verifyAdmin(email, password);
    }


    @RequestMapping(value = "/auth/confirm-admin", method = { RequestMethod.GET, RequestMethod.POST })
    public ObjectNode confirmAdmin(@RequestParam("token") String confirmationToken) {

        return service.confirmAdmin(confirmationToken);
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-admin")
    public ObjectNode addAdmin(@RequestBody Admin admin) {
        return service.addAdmin(admin);
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-admin")
    public Admin getAdmin() {
        return service.getAdminById(JwtUtils.getUserId());
    }

    // @GetMapping("/helloworld")
    // public String helloWorld() {
    // System.out.println("\033[31minside spring boot hello world.\033[0m");
    // return "Hello Spring Boot";
    // }

    // @GetMapping("/get-admin-by-full-name/{name}")
    // public Admin getAdminByFullName(@PathVariable String name) {
    // return service.getAdminByFullName(name);
    // }

    // @GetMapping("/get-admin-by-email/{email}")
    // public Admin getAdminByEmail(@PathVariable String email) {
    // return service.getAdminByEmail(email);
    // }

    // @PutMapping("/update-admin-by-id")
    // public Admin updateAdmin(@RequestBody Admin admin) {
    // return service.updateAdmin(admin);
    // }


    @PostMapping("/auth/authenticate-admin")
    public ObjectNode authenticateAdmin(@RequestBody Map<String, String> adminMap) {

        String email = adminMap.get("email");
        String password = adminMap.get("password");
        return service.authenticateAdmin(email, password);

    }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @GetMapping("/is-allowed-to-proceed")
    // public ObjectNode isAllowedToProceed() {
    //     Integer adminId = JwtUtils.getUserId();
    //     Person person = personRepository.findById(adminId).orElse(null);
    //     if (person != null) {
    //         if (person.getFullName().isEmpty()) {
    //             return Global.createErrorMessage("Please provide your information at first to proceed");
    //         }
    //         if (person.getCoaching() == null) {
    //             return Global.createErrorMessage("Please provide your coaching information at first to proceed");
    //         }
    //         return null;
    //     }
    //     return Global.createErrorMessage("Admin id not found");
    // }
}
