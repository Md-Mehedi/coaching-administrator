
package coaching.administrator.classes.Teacher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
public class TeacherController {

    @Autowired
    private TeacherService service;

    @Autowired
    private TeacherRepository repository;

    @Autowired
    private CoachingService coachingService;

    @PostMapping("/add-teacher")
    // public ObjectNode addTeacher(@RequestBody Object teacher,
    // @RequestPart("image") MultipartFile image) {
    public ObjectNode addTeacher(@RequestPart("object") Teacher teacher, @RequestPart("file") MultipartFile image) {
        teacher.getPerson().setCoaching(coachingService.getCoachingById(JwtUtils.getCoachingId()));
        return service.saveTeacher(teacher, image);
        // return null;
    }

    @GetMapping("/get-teacher-by-id/{id}")
    public Teacher getTeacherById(@PathVariable Integer id) {
        return service.getTeacherById(id);
    }

    // @GetMapping("/helloworld")
    // public String helloWorld() {
    // System.out.println("\033[31minside spring boot hello world.\033[0m");
    // return "Hello Spring Boot";
    // }

    @GetMapping("/get-teacher-by-full-name/{name}")
    public Teacher getTeacherByFullName(@PathVariable String name) {
        return service.getTeacherByFullName(name);
    }

    @GetMapping("/get-teacher-by-eamil/{email}")
    public Teacher getTeacherByEmail(@PathVariable String email) {
        return service.getTeacherByEmail(email);
    }

    @PutMapping("/update-teacher")
    public ObjectNode updateTeacher(@RequestPart("object") Teacher teacher, @RequestPart("file") MultipartFile image) {
        return service.updateTeacher(teacher, image);
    }

    @DeleteMapping("/delete-teacher-by-id/{id}")
    public ObjectNode deleteTeacher(@PathVariable Integer id) {
        return service.deleteTeacher(id);
    }

    @GetMapping("/get-all-teacher")
    public List<Teacher> getAllStudentByCoachingId() {
        return repository.findAllByCoaching(Global.coachingId);
    }
}
