
package coaching.administrator.classes.Program;

import java.util.ArrayList;
import java.util.Date;
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

import coaching.administrator.classes.Coaching.Coaching;
import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.EnrolledProgram.EnrolledProgram;
import coaching.administrator.classes.EnrolledProgram.EnrolledProgramService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;
import coaching.administrator.classes.Student.Student;
import coaching.administrator.classes.Student.StudentService;

@RestController
public class ProgramController {

    @Autowired
    private ProgramService service;
    @Autowired
    private CoachingService coachingService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private EnrolledProgramService enrolledProgramService;

    @Autowired
    private ProgramRepository repository;

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-program")
    public ObjectNode addProgram(@RequestBody Program program) {
        Coaching coaching = coachingService.getCoachingById(JwtUtils.getCoachingId());
        // Coaching coaching = new CoachingService().getCoachingbyId(1);
        program.setCoaching(coaching);
        program.setStartDate(new Date());
        return service.saveProgram(program);
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-program-by-id/{id}")
    public ObjectNode getProgramById(@PathVariable Integer id) {
        Program program = service.getProgramById(id);
        if (program == null) {
            return Global.createErrorMessage("Program not found");
        }
        if (program.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Program found")
                    .putPOJO("object", program);
        } else {
            return Global.createErrorMessage("Not eligible to fetch program");
        }
    }

    // @GetMapping("/get-program-by-name/{name}")
    // public Program getProgramByName(@PathVariable String name) {
    // return service.getProgramByName(name);
    // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-program")
    public List<Program> getAllProgramByCoachingId() {
        return repository.findAllByCoachingId(JwtUtils.getCoachingId());
    }

    // @GetMapping("/get-progrm-count-by-coachingId/{coachingId}")
    // public List<Map<String, Object>> getProgramCountByCoachingId(@PathVariable
    // Integer coachingId) {
    // return repository.countByCoachingId(coachingId);
    // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PutMapping("/update-program")
    public ObjectNode updateProgram(@RequestBody Program program) {
        Program fetchedProgram = service.getProgramById(program.getId());
        if (fetchedProgram == null) {
            return Global.createErrorMessage("Program not found");
        }

        if (fetchedProgram.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.updateProgram(program);
        } else {
            return Global.createErrorMessage("Not eligible to update program");
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-program-by-id/{id}")
    public ObjectNode deleteProgram(@PathVariable Integer id) {
        Program fetchedProgram = service.getProgramById(id);
        if (fetchedProgram == null) {
            return Global.createErrorMessage("Program not found");
        }

        if (fetchedProgram.getCoaching().getId() == JwtUtils.getCoachingId()) {
            repository.delete(fetchedProgram);
            return Global.createSuccessMessage("Program deleted");
        } else {
            return Global.createErrorMessage("Not eligible to delete program");
        }
    }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @GetMapping("/get-examlist-by-program-id/{id}")
    // public ObjectNode getExamListByProgramId(@PathVariable Integer id) {
    // Program program = service.getProgramById(id);
    // if (program == null) {
    // return Global.createErrorMessage("Program not found");
    // }
    // if (program.getCoaching().getId() == JwtUtils.getCoachingId()) {
    // return Global.createSuccessMessage("Exam List Found")
    // .putPOJO("object", program.getExamList());

    // } else {
    // return Global.createErrorMessage("Not eligible to fetch exam list");
    // }
    // // return Global.createSuccessMessage("Exam List Found")
    // // .putPOJO("object", program.getExamList());
    // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-program-list-by-student-id/{id}")
    public ObjectNode getProgramListByStudentId(@PathVariable Integer id) {
        Student fetchedStudent = studentService.getStudentById(id);
        if (fetchedStudent == null) {
            return Global.createErrorMessage("Student not found");
        } else {
            if (fetchedStudent.getPerson().getCoaching().getId() == JwtUtils.getCoachingId()) {
                List<EnrolledProgram> studEnrolledPrograms = enrolledProgramService
                        .getAllEnrolledProgramByStudentId(id);

                List<Program> programList = new ArrayList<Program>();
                for (EnrolledProgram enrolledProgram : studEnrolledPrograms) {
                    programList.add(enrolledProgram.getProgram());
                }
                return Global.createSuccessMessage("Program List Found")
                        .putPOJO("object", programList);
            } else {
                return Global.createErrorMessage("Not eligible to fetch program list");
            }
        }
    }
}
