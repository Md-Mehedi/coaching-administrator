
package coaching.administrator.classes.Admin;

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

// @RestController
// public class AdminController {

// @Autowired
// private AdminService service;

// @Autowired
// private ConfirmationTokenRepository confirmationTokenRepository;

// @Autowired
// private EmailService emailService;

// @PostMapping("/add-admin")
// public String addAdmin(@RequestBody Admin admin) {

// try {
// System.out.println("\033[31minside add admin\033[0m");
// Admin existingAdmin = service.getAdminByEmail(admin.getEmail());

// if (existingAdmin != null) {
// return "email already taken";
// }

// admin.setActivated("F");
// service.saveAdmin(admin);
// admin = service.getAdminById(admin.getId());
// ConfirmationToken confirmationToken = new ConfirmationToken(admin.getId());

// confirmationTokenRepository.save(confirmationToken);

// SimpleMailMessage mailMessage = new SimpleMailMessage();
// mailMessage.setTo(admin.getEmail());
// mailMessage.setSubject("Complete Registration!");
// mailMessage.setText("To confirm your account, please click here : "
// + Global.BASE_PATH + "/confirm-admin?token=" +
// confirmationToken.getConfirmationToken());

// emailService.sendEmail(mailMessage);

// return "admin set for email confirmation";
// } catch (Exception e) {
// service.deleteAdmin(admin.getId());
// System.out.println("\033[31minside Exception in add admin\033[0m");
// e.printStackTrace();
// }
// return null;
// }

// @RequestMapping(value = "/confirm-admin", method = { RequestMethod.GET,
// RequestMethod.POST })
// public String confirmAdmin(@RequestParam("token") String confirmationToken) {
// try {
// ConfirmationToken token =
// confirmationTokenRepository.findByConfirmationToken(confirmationToken);

// if (token != null) {
// Admin admin = service.getAdminById(token.getPersonId());
// admin.setActivated("T");
// service.updateAdmin(admin);
// return "admin account verified with email";
// } else {
// return "The link is invalid or broken";
// }
// } catch (Exception e) {
// System.out.println("\033[31minside Exception in add admin\033[0m");
// e.printStackTrace();
// }
// return null;
// }

// @GetMapping("/get-admin-by-id/{id}")
// public Admin getAdminById(@PathVariable Integer id) {
// return service.getAdminById(id);
// }

// @GetMapping("/helloworld")
// public String helloWorld() {
// System.out.println("\033[31minside spring boot hello world.\033[0m");
// return "Hello Spring Boot";
// }

// @GetMapping("/get-admin-by-full-name/{name}")
// public Admin getAdminByFullName(@PathVariable String name) {
// return service.getAdminByFullName(name);
// }

// @PutMapping("/update-admin-by-id")
// public Admin updateAdmin(@RequestBody Admin admin) {
// return service.updateAdmin(admin);
// }
// }
