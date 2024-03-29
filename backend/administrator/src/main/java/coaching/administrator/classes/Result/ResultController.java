
package coaching.administrator.classes.Result;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Exam.Exam;
import coaching.administrator.classes.Exam.ExamService;
import coaching.administrator.classes.ExamMark.ExamMark;
import coaching.administrator.classes.ExamMark.ExamMarkService;
import coaching.administrator.classes.ExamSubject.ExamSubject;
import coaching.administrator.classes.ExamSubject.ExamSubjectService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;
import coaching.administrator.classes.Student.Student;
import coaching.administrator.classes.Student.StudentService;

@RestController
public class ResultController {

    @Autowired
    private ResultService service;

    @Autowired
    private ExamMarkService examMarkService;

    @Autowired
    private ExamSubjectService examSubjectService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private ExamService examService;

    @Autowired
    private ObjectMapper mapper;

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-all-result")
    public ObjectNode addResult(@RequestBody List<Result> results) {
        for (Result result : results) {
            // ExamMark fetchedExamMark =
            // examMarkService.getExamMarkById(result.getExamMark().getId());
            // Student fetchStudent =
            // studentService.getStudentById(result.getStudent().getPerson().getId());

            // if (fetchedExamMark == null) {
            // return Global.createErrorMessage("Exam Mark not found");
            // } else if (fetchStudent == null) {
            // return Global.createErrorMessage("Student not found");
            // } else {
            // if
            // (fetchedExamMark.getExamSubject().getExam().getProgram().getCoaching().getId()
            // == JwtUtils
            // .getCoachingId()) {
            // result.setExamMark(fetchedExamMark);
            // result.setStudent(fetchStudent);
            service.save(result);
            // } else {
            // return Global.createErrorMessage("You are not authorized to add this
            // result");
            // }
            // }
        }
        return Global.createSuccessMessage("Result added successfully");
    }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @DeleteMapping("/delete-result-by-id/{id}")
    // public ObjectNode deleteResult(@PathVariable Integer id) {
    // Result result = service.getResultById(id);
    // if (result == null) {
    // return Global.createErrorMessage("Result not found");
    // } else {
    // if
    // (result.getExamMark().getExamSubject().getExam().getProgram().getCoaching().getId()
    // == JwtUtils
    // .getCoachingId()) {
    // service.delete(result);
    // return Global.createSuccessMessage("Result deleted successfully");
    // } else {
    // return Global.createErrorMessage("You are not authorized to delete this
    // result");
    // }
    // }
    // }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @PutMapping("/update-result")
    // public ObjectNode updateResult(@RequestBody Result result) {
    // Result fetchedResult = service.getResultById(result.getId());

    // if (fetchedResult == null) {
    // return Global.createErrorMessage("Result not found");
    // } else {
    // if
    // (fetchedResult.getExamMark().getExamSubject().getExam().getProgram().getCoaching().getId()
    // == JwtUtils
    // .getCoachingId()) {
    // service.update(result);
    // return Global.createSuccessMessage("Result updated successfully");
    // } else {
    // return Global.createErrorMessage("You are not authorized to update this
    // result");
    // }
    // }
    // }

    // @GetMapping("/get-result-by-id/{id}")
    // public Result getResultById(@PathVariable Integer id) {
    // Global.colorPrint("Inside Result Controller");
    // return service.getResultById(id);
    // }

    // // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // // @GetMapping("/get-all-results-by-examSubject/{id}")
    // // public ObjectNode getAllResultsByExamSubject(@PathVariable Integer id) {
    // // ExamSubject fetchedExamSubject =
    // examSubjectService.getExamSubjectById(id);
    // // if (fetchedExamSubject == null) {
    // // return Global.createErrorMessage("Exam Subject not found");
    // // } else {
    // // if (fetchedExamSubject.getExam().getProgram().getCoaching().getId() ==
    // // JwtUtils.getCoachingId()) {
    // // Set<Result> results =
    // service.getAllResultsByExamSubject(fetchedExamSubject);
    // // return Global.createSuccessMessage("Results found").putPOJO("object",
    // // results);
    // // } else {
    // // return Global.createErrorMessage("You are not authorized to get this
    // // result");
    // // }
    // // }
    // // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-results-by-examSubject/{id}")
    public ObjectNode getAllResultsByExamSubject(@PathVariable Integer id) {
        ExamSubject fetchedExamSubject = examSubjectService.getExamSubjectById(id);
        if (fetchedExamSubject == null) {
            return Global.createErrorMessage("Exam Subject not found");
        }
        // } else {
        // if (fetchedExamSubject.getExam().getProgram().getCoaching().getId() ==
        // JwtUtils.getCoachingId()) {

        List<Result> results = service.getAllResultsByExamSubjectId(id);
        // fetchedExamSubject.getExamMarkList().size();

        // Set<String> examMarkType = getExamMarkListName(fetchedExamSubject);

        // HashMap<Integer, ObjectNode> resultMap = new HashMap<>();

        // for (Result result : results) {
        // Integer studentId = result.getStudent().getPerson().getId();
        // ObjectNode node;

        // if (resultMap.containsKey(studentId)) {
        // node = mapper.createObjectNode();
        // node.put("nickName", result.getStudent().getPerson().getNickName());
        // node.put(result.getExamMark().getExamType(), result.getObtainedMark());
        // } else {
        // node = resultMap.get(studentId);
        // node.put(result.getExamMark().getExamType(), result.getObtainedMark());
        // }
        // resultMap.put(studentId, node);
        // }
        return Global.createSuccessMessage("Results found").putPOJO("object", results);
        // } else {
        // return Global.createErrorMessage("You are not authorized to get this
        // result");
        // }
    }
}

// @PreAuthorize("hasRole('COACHING_ADMIN')")
// @GetMapping("/get-all-results-by-student-exam/{student_id}/{exam_id}")
// public ObjectNode getResultListByStudentExam(@PathVariable Integer
// student_id, @PathVariable Integer exam_id) {
// Exam fetchedExam = examService.getExamById(exam_id);
// Student fetchedStudent = studentService.getStudentById(student_id);

// if (fetchedExam == null) {
// return Global.createErrorMessage("Exam Not found");
// }

// if (fetchedStudent == null) {
// return Global.createErrorMessage("Student Not Found");
// }

// if (fetchedExam.getProgram().getCoaching().getId() ==
// JwtUtils.getCoachingId()
// && fetchedStudent.getPerson().getCoaching().getId() ==
// JwtUtils.getCoachingId()) {
// Global.colorPrint("Result List Found");
// Set<Result> results = service.getAllResultsByStudentExam(fetchedExam,
// fetchedStudent);
// return Global.createSuccessMessage("Result List Found").putPOJO("object",
// results);
// } else {
// return Global.createErrorMessage("Not Authorized to get result list");
// }
// }

// @PreAuthorize("hasRole('COACHING_ADMIN')")
// public Set<String> getExamMarkListName(ExamSubject examSubject) {
// Set<String> examMarkList = new HashSet<>();
// // for (ExamMark examMark : examSubject.getExamMarkList()) {
// // examMarkList.add(examMark.getExamType());
// // }
// return examMarkList;
// }

// }
