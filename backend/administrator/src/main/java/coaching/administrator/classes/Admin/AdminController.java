
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

import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/verify-admin")
    public ObjectNode verifyAdmin(@RequestBody Map<String, Object> adminMap) {

        String email = (String) adminMap.get("email");
        String password = (String) adminMap.get("password");
        return service.verifyAdmin(email, password);
    }

    @RequestMapping(value = "/confirm-admin", method = { RequestMethod.GET, RequestMethod.POST })
    public ObjectNode confirmAdmin(@RequestParam("token") String confirmationToken) {

        return service.confirmAdmin(confirmationToken);
    }

    @PostMapping("/add-admin")
    public ObjectNode addAdmin(@RequestBody Admin admin) {
        return service.addAdmin(admin);
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

    @PostMapping("/authenticate-admin")
    public ObjectNode authenticateAdmin(@RequestBody Map<String, String> adminMap) {

        String email = adminMap.get("email");
        String password = adminMap.get("password");
        return service.authenticateAdmin(email, password);

    }
}
