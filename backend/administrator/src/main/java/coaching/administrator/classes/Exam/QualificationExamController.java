
package coaching.administrator.classes.Exam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QualificationExamController {

    @Autowired
    private QualificationExamService service;
    @Autowired
    private QualificationExamRepository repository;

    @PostMapping("/add-qualification-exam")
    public QualificationExam addQualificationExam(@RequestBody QualificationExam exam) {
        System.out.println("\033[31minside add exam\033[0m");

        return service.saveQualificationExam(exam);
    }

    @GetMapping("/get-qualification-exam-by-id/{id}")
    public QualificationExam getQualificationExamById(@PathVariable Integer id) {
        return service.getQualificationExamById(id);
    }

    @GetMapping("/get-qualification-exam-by-name/{name}")
    public QualificationExam getQualificationExamByName(@PathVariable String name) {
        return service.getQualificationExamByName(name);
    }

    @DeleteMapping("/delete-qualification-exam-by-id")
    public String deleteQualificationExam(@PathVariable Integer id) {
        return service.deleteQualificationExam(id);
    }

    @GetMapping("/get-all-qualification-exam")
    public List<QualificationExam> getAllQualificationExam() {
        return repository.findAll();
    }
}
