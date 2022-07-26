
package coaching.administrator.classes.Student;

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

@RestController
public class StudentController {

    @Autowired
    private StudentService service;

    @PostMapping("/add-student")
    public Student addStudent(Student student) {
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
    public Student updateStudent(@RequestBody Student student) {
        return service.updateStudent(student);
    }

    @DeleteMapping("/delete-student-by-id/{id}")
    public String deleteStudent(@PathVariable Integer id) {
        service.deleteStudent(id);
        return "Student with id " + id + " deleted successfully";
    }
}
