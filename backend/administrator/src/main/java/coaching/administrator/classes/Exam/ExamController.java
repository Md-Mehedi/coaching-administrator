
package coaching.administrator.classes.Exam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExamController {

    @Autowired
    private ExamService service;

    @PostMapping("/add-exam")
    public Exam addExam(@RequestBody Exam exam) {
        System.out.println("\033[31minside add exam\033[0m");

        return service.saveExam(exam);
    }

    @GetMapping("/get-exam-by-id/{id}")
    public Exam getExamById(@PathVariable Integer id) {
        return service.getExamById(id);
    }

    @GetMapping("/get-exam-by-name/{name}")
    public Exam getExamByName(@PathVariable String name) {
        return service.getExamByName(name);
    }

    @DeleteMapping("/delete-exam-by-id")
    public String deleteExam(@PathVariable Integer id) {
        return service.deleteExam(id);
    }
}
