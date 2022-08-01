
package coaching.administrator.classes.Student;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.DeleteMapping;
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

import coaching.administrator.classes.Coaching.Coaching;
import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;

@RestController
public class StudentController {

    @Autowired
    private StudentService service;
    @Autowired
    private StudentRepository repository;
    @Autowired
    private CoachingService coachingService;

    @PostMapping("/add-student")
    public ObjectNode addStudent(@RequestBody Student student) {
        student.getPerson().setCoaching(coachingService.getCoachingById(1));
        return service.saveStudent(student);
    }

    @GetMapping("/get-student-by-id/{id}")
    public Student getStudentById(@PathVariable Integer id) {
        return service.getStudentById(id);
    }

    // @GetMapping("/helloworld")
    // public String helloWorld() {
    // System.out.println("\033[31minside spring boot hello world.\033[0m");
    // return "Hello Spring Boot";
    // }

    @GetMapping("/get-student-by-full-name/{name}")
    public Student getStudentByFullName(@PathVariable String name) {
        return service.getStudentByFullName(name);
    }

    @GetMapping("/get-student-by-eamil/{email}")
    public Student getStudentByEmail(@PathVariable String email) {
        return service.getStudentByEmail(email);
    }

    @PutMapping("/update-student")
    public ObjectNode updateStudent(@RequestBody Student student) {
        return service.updateStudent(student);
    }

    @DeleteMapping("/delete-student-by-id/{id}")
    public ObjectNode deleteStudent(@PathVariable Integer id) {
        return service.deleteStudent(id);
    }

    @GetMapping("/get-all-student")
    public List<Student> getAllStudentByCoachingId() {
        return repository.findAllByCoaching(Global.coachingId);
    }

}
