
package coaching.administrator.classes.Teacher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;

@RestController
public class TeacherController {

    @Autowired
    private TeacherService service;

    @Autowired
    private TeacherRepository repository;

    @PostMapping("/add-teacher")
    public ObjectNode addTeacher(@RequestBody Teacher teacher) {
        Global.colorPrint(teacher);
        return service.saveTeacher(teacher);
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
    public ObjectNode updateTeacher(@RequestBody Teacher teacher) {
        return service.updateTeacher(teacher);
    }

    @DeleteMapping("/delete-teacher-by-id/{id}")
    public ObjectNode deleteTeacher(@PathVariable Integer id) {
        return service.deleteTeacher(id);
    }

    @GetMapping("/get-all-teacher")
    public List<Teacher> getAllStudentByCoachingId() {
        return repository.findAllByCoaching(5);
    }
}
