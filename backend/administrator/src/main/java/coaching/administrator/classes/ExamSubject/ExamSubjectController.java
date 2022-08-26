
package coaching.administrator.classes.ExamSubject;

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

import coaching.administrator.classes.Exam.Exam;
import coaching.administrator.classes.Exam.ExamService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;
import coaching.administrator.classes.Subject.Subject;
import coaching.administrator.classes.Subject.SubjectService;

@RestController
public class ExamSubjectController {

    @Autowired
    private ExamSubjectService service;

    @Autowired
    private SubjectService subjectService;

    @Autowired
    private ExamService examService;

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-examSubject")
    public ObjectNode addExamSubject(@RequestBody ExamSubject examSubject) {
        Exam fetchedExam = examService.getExamById(examSubject.getExam().getId());
        Subject fetchedSubject = subjectService.getSubjectById(examSubject.getSubject().getId());
        if (fetchedExam == null) {
            return Global.createErrorMessage("Exam not found");
        } else {
            if (fetchedExam.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                if (fetchedSubject == null) {
                    return Global.createErrorMessage("Subject not found");
                } else {
                    if (fetchedSubject.getCoaching().getId() == JwtUtils.getCoachingId()) {
                        examSubject.setExam(fetchedExam);
                        examSubject.setSubject(fetchedSubject);
                        service.save(examSubject);
                        return Global.createSuccessMessage("Exam Subject added successfully");
                    } else {
                        return Global.createErrorMessage("You are not authorized to add this subject");
                    }
                }
            } else {
                return Global.createErrorMessage("Not authorized to add exam subject");
            }
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PutMapping("/update-examSubject")
    public ObjectNode updateExamSubject(@RequestBody ExamSubject examSubject) {
        ExamSubject fetchedExamSubject = service.getExamSubjectById(examSubject.getId());

        if (fetchedExamSubject == null) {
            return Global.createErrorMessage("Exam Subject not found");
        } else {
            if (fetchedExamSubject.getExam().getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                service.update(examSubject);
                return Global.createSuccessMessage("Exam Subject updated successfully");
            } else {
                return Global.createErrorMessage("Not authorized to update this exam subject");
            }
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-examSubject-by-id/{id}")
    public ObjectNode deleteExamSubject(@PathVariable Integer id) {
        ExamSubject fetchedExamSubject = service.getExamSubjectById(id);

        if (fetchedExamSubject == null) {
            return Global.createErrorMessage("Exam Subject not found");
        } else {
            if (fetchedExamSubject.getExam().getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                service.delete(fetchedExamSubject);
                return Global.createSuccessMessage("Exam Subject deleted successfully");
            } else {
                return Global.createErrorMessage("Not authorized to delete this exam subject");
            }
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-examSubject-by-id/{id}")
    public ObjectNode getExamSubjectById(@PathVariable Integer id) {
        ExamSubject fetchedExamSubject = service.getExamSubjectById(id);

        if (fetchedExamSubject == null) {
            return Global.createErrorMessage("Exam Subject not found");
        } else {
            if (fetchedExamSubject.getExam().getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                fetchedExamSubject.getExamMarkList().size();
                return Global.createSuccessMessage("Exam Subject found").putPOJO("object", fetchedExamSubject);
            } else {
                return Global.createErrorMessage("Not authorized to get this exam subject");
            }
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-examSubject-by-exam-id/{id}")
    public ObjectNode getExamSubjectByExamId(@PathVariable Integer id) {
        Exam fetchedExam = examService.getExamById(id);
        if (fetchedExam == null) {
            return Global.createErrorMessage("Exam not found");
        } else {
            if (fetchedExam.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                fetchedExam.getExamSubjectList().size();
                return Global.createSuccessMessage("Exam Subject found").putPOJO("object",
                        fetchedExam.getExamSubjectList());
            } else {
                return Global.createErrorMessage("Not authorized to get this exam subject");
            }
        }
    }

}
