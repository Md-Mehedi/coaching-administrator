
package coaching.administrator.classes.Teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeacherController {

    @Autowired
    private TeacherService service;

    @PostMapping("/add-teacher")
    public Teacher addTeacher(Teacher teacher) {
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
    public Teacher updateTeacher(@RequestBody Teacher teacher) {
        return service.updateTeacher(teacher);
    }

    @DeleteMapping("/delete-teacher-by-id/{id}")
    public String deleteTeacher(@PathVariable Integer id) {
        service.deleteTeacher(id);
        return "Teacher with id " + id + " deleted successfully";
    }
}
