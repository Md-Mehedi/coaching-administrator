
package coaching.administrator.classes.Exam;

import java.util.Set;

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

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Program.Program;
import coaching.administrator.classes.Program.ProgramService;
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
public class ExamController {

    @Autowired
    private ExamService service;

    @Autowired
    private ProgramService programService;

    @PostMapping("/add-exam")
    public ObjectNode addExam(@RequestBody Exam exam) {
        Program fetchedProgram = programService.getProgramById(exam.getProgram().getId());

        if (fetchedProgram == null) {
            return Global.createErrorMessage("Program not found");
        } else {
            if (fetchedProgram.getCoaching().getId() == JwtUtils.getCoachingId()) {
                exam.setProgram(fetchedProgram);
                service.save(exam);
                return Global.createSuccessMessage("Exam added successfully");
            } else {
                return Global.createErrorMessage("Not authorized to add exam");
            }
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-exam-by-id/{id}")
    public ObjectNode deleteExam(@PathVariable Integer id) {
        Exam fetchedExam = service.getExamById(id);
        if (fetchedExam == null) {
            return Global.createErrorMessage("Exam not found");
        } else {
            if (fetchedExam.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                service.delete(fetchedExam);
                return Global.createSuccessMessage("Exam deleted successfully");
            } else {
                return Global.createErrorMessage("Not authorized to delete exam");
            }
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PutMapping("/update-exam")
    public ObjectNode updateExam(@RequestBody Exam exam) {
        Exam fetchedExam = service.getExamById(exam.getId());

        if (fetchedExam == null) {
            return Global.createErrorMessage("Exam not found");
        } else {
            if (fetchedExam.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                service.update(exam);
                return Global.createSuccessMessage("Exam updated successfully");
            } else {
                return Global.createErrorMessage("Not authorized to update exam");
            }
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-exam-by-id/{id}")
    public ObjectNode getExamById(@PathVariable Integer id) {
        Exam fetchedExam = service.getExamById(id);

        if (fetchedExam == null) {
            return Global.createErrorMessage("Exam not found");
        } else {
            if (fetchedExam.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                fetchedExam.getExamSubjectList().size();
                return Global.createSuccessMessage("Exam Found").putPOJO("object", fetchedExam);
            } else {
                return Global.createErrorMessage("Not authorized to get exam");
            }
        }
    }

    // new
    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-exams-by-programId/{programId}")
    public ObjectNode getAllExamsByProgramId(@PathVariable Integer programId) {
        Program program = programService.getProgramById(programId);
        if (program == null) {
            return Global.createErrorMessage("Program not found");
        } else {
            if (program.getCoaching().getId() == JwtUtils.getCoachingId()) {
                Set<Exam> examList = service.getAllExamsByProgramId(programId);

                // populate examSubject in Exam object
                for (Exam exam : examList) {
                    exam.getExamSubjectList().size();
                }

                return Global.createSuccessMessage("Class Time List Found")
                        .putPOJO("object", service.getAllExamsByProgramId(programId));
            } else {
                return Global.createErrorMessage("Not Authorized to get exams");
            }
        }
    }

    // @GetMapping("/get-exam-by-name/{name}")
    // public Exam getExamByName(@PathVariable String name) {
    // return service.getExamByName(name);
    // }
}
