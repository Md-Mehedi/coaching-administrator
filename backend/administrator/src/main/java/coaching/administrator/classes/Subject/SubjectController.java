
package coaching.administrator.classes.Subject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubjectController {

    @Autowired
    private SubjectService service;

    @Autowired
    private SubjectRepository repository;

    @PostMapping("/add-subject")
    public Subject addSubject(@RequestBody Subject subject) {
        System.out.println("\033[31minside add subject\033[0m");

        return service.saveSubject(subject);
    }

    @GetMapping("/get-subject-by-id/{id}")
    public Subject getSubjectById(@PathVariable Integer id) {
        return service.getSubjectById(id);
    }

    @GetMapping("/get-all-subjects")
    public List<Subject> getSubjects() {
        return service.getSubjects();
    }

    @GetMapping("/get-subject-by-name/{name}")
    public Subject getSubjectByName(@PathVariable String name) {
        return service.getSubjectByName(name);
    }

    @GetMapping("/get-all-subject-by-coaching-id/{id}")
    public List<Subject> getSubjectByCoachingId(@PathVariable Integer id) {
        return repository.findByCoachingId(id);
    }

    @DeleteMapping("/delete-subject-by-id")
    public String deleteSubject(@PathVariable Integer id) {
        service.deleteSubject(id);
        return "Subject with id " + id + " deleted successfully";
    }
}
