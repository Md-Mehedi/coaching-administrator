
package coaching.administrator.classes.Subject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
public class SubjectController {

    @Autowired
    private SubjectService service;
    @Autowired
    private CoachingService coachingService;

    @Autowired
    private SubjectRepository repository;

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-subject")
    public ObjectNode addSubject(@RequestBody Subject subject) {
        subject.setCoaching(coachingService.getCoachingById(JwtUtils.getCoachingId()));
        return service.saveSubject(subject);
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PutMapping("/update-subject")
    public ObjectNode update(@RequestBody Subject subject) {
        Subject fetchedSubject = service.getSubjectById(subject.getId());
        if (fetchedSubject == null) {
            return Global.createErrorMessage("Subject not found");
        }
        if (fetchedSubject.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.updateSubject(subject);
        }
        return Global.createErrorMessage("Not authorized to update subject");
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-subject-by-id/{id}")
    public ObjectNode getSubjectById(@PathVariable Integer id) {
        Subject fetchedSubject = service.getSubjectById(id);
        if (fetchedSubject == null) {
            return Global.createErrorMessage("Subject not found");
        }
        if (fetchedSubject.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Subject found")
                    .putPOJO("object", fetchedSubject);
        }
        return Global.createErrorMessage("Not authorized to get subject");
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-subjects")
    public List<Subject> getSubjects() {
        return repository.findByCoachingIdOrderByOpeningDateDesc(JwtUtils.getCoachingId());
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-subject-by-id/{id}")
    public ObjectNode deleteSubject(@PathVariable Integer id) {
        Subject fetchedSubject = service.getSubjectById(id);

        if (fetchedSubject == null) {
            return Global.createErrorMessage("Subject not found");
        }
        if (fetchedSubject.getCoaching().getId() == JwtUtils.getCoachingId()) {
            repository.delete(fetchedSubject);
            return Global.createSuccessMessage("Subject deleted");
        }
        return Global.createErrorMessage("Not authorized to delete subject");
    }

    // @GetMapping("/get-subject-by-name/{name}")
    // public Subject getSubjectByName(@PathVariable String name) {
    // return service.getSubjectByName(name);
    // }

    // @GetMapping("/get-all-subject-by-coaching-id/{id}")
    // public List<Subject> getSubjectByCoachingId(@PathVariable Integer id) {
    // return repository.findByCoachingId(id);
    // }
}
