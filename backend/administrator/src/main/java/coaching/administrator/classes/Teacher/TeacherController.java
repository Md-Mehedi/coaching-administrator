
package coaching.administrator.classes.Teacher;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-teacher")
    // public ObjectNode addTeacher(@RequestBody Object teacher,
    // @RequestPart("image") MultipartFile image) {
    public ObjectNode addTeacher(@RequestPart("object") Teacher teacher, @RequestPart("file") MultipartFile image) {
        teacher.getPerson().setCoaching(coachingService.getCoachingById(JwtUtils.getCoachingId()));
        return service.saveTeacher(teacher, image);
        // return null;
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-teacher-by-id/{id}")
    public ObjectNode getTeacherById(@PathVariable Integer id) {
        Teacher fetchedTeacher = service.getTeacherById(id);
        if (fetchedTeacher == null) {
            return Global.createErrorMessage("Teacher Not Found");
        }
        if (fetchedTeacher.getPerson().getCoaching().getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Teacher Found")
                    .putPOJO("object", fetchedTeacher);
        }
        return Global.createErrorMessage("Not Authorized to get teacher");
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PutMapping("/update-teacher")
    public ObjectNode updateTeacher(@RequestPart("object") Teacher teacher, @RequestPart("file") MultipartFile image) {
        Teacher fetchedTeacher = service.getTeacherById(teacher.getPerson_id());
        if (fetchedTeacher == null) {
            return Global.createErrorMessage("Teacher not found");
        }
        if (fetchedTeacher.getPerson().getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.updateTeacher(teacher, image);
        }
        return Global.createErrorMessage("Not authorized to update teacher");
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-teacher-by-id/{id}")
    public ObjectNode deleteTeacher(@PathVariable Integer id) {
        Teacher fetchedTeacher = service.getTeacherById(id);
        if (fetchedTeacher == null) {
            return Global.createErrorMessage("Teacher not found");
        }
        if (fetchedTeacher.getPerson().getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.deleteTeacher(id);
        }
        return Global.createErrorMessage("Not authorized to delete teacher");
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-teacher")
    public List<Teacher> getAllTeacherByCoachingId() {
        return repository.findAllByCoaching(JwtUtils.getCoachingId());
    }

    @GetMapping("/get-teacher-count-by-coachingId/{coachingId}")
    public List<Map<String, Object>> getTeacherCountByCoachingId(@PathVariable Integer coachingId) {
        return repository.countByCoachingId(coachingId);
    }

    // @GetMapping("/get-teacher-by-eamil/{email}")
    // public Teacher getTeacherByEmail(@PathVariable String email) {
    // return service.getTeacherByEmail(email);
    // }

}
