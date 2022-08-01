
package coaching.administrator.classes.Subject;

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

import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;

@RestController
public class SubjectController {

    @Autowired
    private SubjectService service;
    @Autowired
    private CoachingService coachingService;

    @Autowired
    private SubjectRepository repository;

    @PostMapping("/add-subject")
    public ObjectNode addSubject(@RequestBody Subject subject) {
        subject.setCoaching(coachingService.getCoachingById(1));
        return service.saveSubject(subject);
    }

    @PutMapping("/update-subject")
    public ObjectNode update(@RequestBody Subject subject) {
        return service.saveSubject(subject);
    }

    @GetMapping("/get-subject-by-id/{id}")
    public Subject getSubjectById(@PathVariable Integer id) {
        return service.getSubjectById(id);
    }

    @GetMapping("/get-all-subjects")
    public List<Subject> getSubjects() {
        return repository.findByCoachingId(Global.coachingId);
    }

    // @GetMapping("/get-subject-by-name/{name}")
    // public Subject getSubjectByName(@PathVariable String name) {
    // return service.getSubjectByName(name);
    // }

    // @GetMapping("/get-all-subject-by-coaching-id/{id}")
    // public List<Subject> getSubjectByCoachingId(@PathVariable Integer id) {
    // return repository.findByCoachingId(id);
    // }

    @DeleteMapping("/delete-subject-by-id/{id}")
    public ObjectNode deleteSubject(@PathVariable Integer id) {
        return service.deleteSubject(id);
    }
}
