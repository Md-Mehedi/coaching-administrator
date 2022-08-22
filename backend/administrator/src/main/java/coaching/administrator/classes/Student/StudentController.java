
package coaching.administrator.classes.Student;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
public class StudentController {

    @Autowired
    private StudentService service;
    @Autowired
    private StudentRepository repository;
    @Autowired
    private CoachingService coachingService;

    @PostMapping("/add-student")
    public ObjectNode addStudent(@RequestPart("object") Student student, @RequestPart("file") MultipartFile image) {
        student.getPerson().setCoaching(coachingService.getCoachingById(JwtUtils.getCoachingId()));
        return service.saveStudent(student, image);
    }

    @GetMapping("/get-student-by-id/{id}")
    public ObjectNode getStudentById(@PathVariable Integer id) {
        Student fetchedStudent = service.getStudentById(id);
        if (fetchedStudent == null) {
            return Global.createErrorMessage("Student not found");
        }
        if (fetchedStudent.getPerson().getCoaching().getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Student found")
                    .putPOJO("object", fetchedStudent);
        }
        return Global.createErrorMessage("Not authorized to get");
    }

    @PutMapping("/update-student")
    public ObjectNode updateStudent(@RequestPart("object") Student student, @RequestPart("file") MultipartFile image) {
        Student fetchedStudent = service.getStudentById(student.getPerson_id());
        if (fetchedStudent == null) {
            return Global.createErrorMessage("Student not found");
        }
        if (fetchedStudent.getPerson().getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.updateStudent(student, image);
        }
        return Global.createErrorMessage("Not authorized to update");
    }

    @DeleteMapping("/delete-student-by-id/{id}")
    public ObjectNode deleteStudent(@PathVariable Integer id) {
        Student student = service.getStudentById(id);
        if (student == null) {
            return Global.createErrorMessage("Student not found");
        }
        if (student.getPerson().getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.deleteStudent(id);
        }
        return Global.createErrorMessage("Not authorized to delete");
    }

    @GetMapping("/get-all-student")
    public List<Student> getAllStudent() {
        return repository.findAllByCoaching(JwtUtils.getCoachingId());
    }

    // @GetMapping("/helloworld")
    // public String helloWorld() {
    // System.out.println("\033[31minside spring boot hello world.\033[0m");
    // return "Hello Spring Boot";
    // }

    // @GetMapping("/get-student-by-full-name/{name}")
    // public Student getStudentByFullName(@PathVariable String name) {
    // return service.getStudentByFullName(name);
    // }

    // @GetMapping("/get-student-by-eamil/{email}")
    // public Student getStudentByEmail(@PathVariable String email) {
    // return service.getStudentByEmail(email);
    // }

    @GetMapping("/get-student-count-by-coachingId/{coachingId}")
    public List<Map<String, Object>> getStudentCountByCoachingId(@PathVariable Integer coachingId) {
        return repository.countByCoachingId(coachingId);
    }

    @GetMapping("/get-all-student-minimal")
    public List<Object> getAllStudentMinimal() {
        List<Object> list = repository.findAllStudentMinimalByCoachingId(JwtUtils.getCoachingId());
        ObjectMapper mapper = new ObjectMapper();
        Object node = mapper.createObjectNode();
        // list.forEach(item -> {
        // node.putPojo("id", item[0]);
        // });
        return list;
    }

}
