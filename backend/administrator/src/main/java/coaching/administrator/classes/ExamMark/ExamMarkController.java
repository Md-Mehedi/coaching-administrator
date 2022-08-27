
package coaching.administrator.classes.ExamMark;

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

import coaching.administrator.classes.ExamSubject.ExamSubject;
import coaching.administrator.classes.ExamSubject.ExamSubjectService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
public class ExamMarkController {

    @Autowired
    private ExamMarkService service;

    @Autowired
    private ExamSubjectService examSubjectService;

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @PostMapping("/add-examMark")
    // public ObjectNode addExamMark(@RequestBody ExamMark examMark) {
    // ExamSubject fetchedExamSubject =
    // examSubjectService.getExamSubjectById(examMark.getExamSubject().getId());
    // if (fetchedExamSubject == null) {
    // return Global.createErrorMessage("Exam Subject not found");
    // } else {
    // if (fetchedExamSubject.getExam().getProgram().getCoaching().getId() ==
    // JwtUtils.getCoachingId()) {
    // examMark.setExamSubject(fetchedExamSubject);
    // service.save(examMark);
    // return Global.createSuccessMessage("Exam Mark added successfully");
    // } else {
    // return Global.createErrorMessage("You are not authorized to add this exam
    // mark");
    // }
    // }
    // }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @PutMapping("/update-examMark")
    // public ObjectNode updateExamMark(@RequestBody ExamMark examMark) {
    // ExamMark fetchedExamMark = service.getExamMarkById(examMark.getId());
    // if (fetchedExamMark == null) {
    // return Global.createErrorMessage("Exam Mark not found");
    // } else {
    // if
    // (fetchedExamMark.getExamSubject().getExam().getProgram().getCoaching().getId()
    // == JwtUtils
    // .getCoachingId()) {
    // service.update(examMark);
    // return Global.createSuccessMessage("Exam Mark updated successfully");
    // } else {
    // return Global.createErrorMessage("You are not authorized to update this exam
    // mark");
    // }
    // }
    // }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @DeleteMapping("/delete-examMark-by-id/{id}")
    // public ObjectNode deleteExamMark(@PathVariable Integer id) {
    // ExamMark fetchedExamMark = service.getExamMarkById(id);
    // if (fetchedExamMark == null) {
    // return Global.createErrorMessage("Exam Mark not found");
    // } else {
    // if
    // (fetchedExamMark.getExamSubject().getExam().getProgram().getCoaching().getId()
    // == JwtUtils
    // .getCoachingId()) {
    // service.delete(fetchedExamMark);
    // return Global.createSuccessMessage("Exam Mark deleted successfully");
    // } else {
    // return Global.createErrorMessage("You are not authorized to delete this exam
    // mark");
    // }
    // }
    // }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @GetMapping("/get-examMark-by-id/{id}")
    // public ObjectNode getExamMarkById(@PathVariable Integer id) {
    // ExamMark fetchedExamMark = service.getExamMarkById(id);
    // if (fetchedExamMark == null) {
    // return Global.createErrorMessage("Exam Mark not found");
    // } else {
    // if
    // (fetchedExamMark.getExamSubject().getExam().getProgram().getCoaching().getId()
    // == JwtUtils
    // .getCoachingId()) {
    // // fetchedExamMark.getResultList().size();
    // return Global.createSuccessMessage("Exam Mark found").putPOJO("object",
    // fetchedExamMark);
    // } else {
    // return Global.createErrorMessage("You are not authorized to get this exam
    // mark");
    // }
    // }
    // }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @GetMapping("/get-examMark-by-examSubject-id/{id}")
    // public ObjectNode getExamMarkByExamSubjectId(@PathVariable Integer id) {
    // ExamSubject fetchedExamSubject = examSubjectService.getExamSubjectById(id);
    // if (fetchedExamSubject == null) {
    // return Global.createErrorMessage("Exam Subject not found");
    // } else {
    // if (fetchedExamSubject.getExam().getProgram().getCoaching().getId() ==
    // JwtUtils
    // .getCoachingId()) {
    // // fetchedExamSubject.getExamMarkList().size();
    // return Global.createSuccessMessage("Exam Mark found").putPOJO("object",
    // fetchedExamSubject);
    // } else {
    // return Global.createErrorMessage("You are not authorized to get this exam
    // mark");
    // }
    // }
    // }

}
