package coaching.administrator.classes.Global;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Admin.AdminService;
import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Security.services.UserDetailsImpl;
import lombok.Data;

@Data
public class Global {

    @Autowired
    private static CoachingService coachingService;
    @Autowired
    private static AdminService adminService;

    public static final String BASE_PATH = "http://localhost:7982";
    public static final String FRONTEND_PATH = "http://localhost:3000";
    public static final Integer coachingId = 1;

    public static void colorPrint(Object str) {
        System.out.println("\033[31m" + str + "\033[0m");
    }

    public static ObjectNode createMessage(String message, Boolean success) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode node = mapper.createObjectNode();
        return node.put("success", success)
                .put("message", message);
    }

    public static ObjectNode createSuccessMessage(String message) {
        return createMessage(message, true);
    }

    public static ObjectNode createErrorMessage(String message) {
        return createMessage(message, false);
    }

    // public static String getCurrentUserEmail() {
    // if
    // (SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser"))
    // return "";
    // UserDetailsImpl userDetails = (UserDetailsImpl)
    // SecurityContextHolder.getContext().getAuthentication()
    // .getPrincipal();
    // Global.colorPrint(userDetails.getEmail());
    // return userDetails.getEmail();
    // }
}
