package coaching.administrator.classes.Global;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Admin.Admin;
import coaching.administrator.classes.Admin.AdminService;
import coaching.administrator.classes.Coaching.Coaching;
import coaching.administrator.classes.Coaching.CoachingRepository;
import coaching.administrator.classes.Coaching.CoachingService;

public class Global {

    @Autowired
    private static CoachingService coachingService;
    @Autowired
    private static AdminService adminService;

    public static final String BASE_PATH = "http://localhost:7982";
    public static final String FRONTEND_PATH = "http://localhost:3000";

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
}
