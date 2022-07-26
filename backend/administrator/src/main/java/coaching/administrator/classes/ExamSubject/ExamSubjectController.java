
package coaching.administrator.classes.ExamSubject;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExamSubjectController {

    @Autowired
    private ExamSubjectService service;

    @PostMapping("/add-examSubject")
    public ExamSubject addExamSubject(@RequestBody ExamSubject examSubject) {
        System.out.println("\033[31minside add examSubject\033[0m");

        return service.saveExamSubject(examSubject);
    }

    @GetMapping("/get-examSubject-by-id/{id}")
    public ExamSubject getExamSubjectById(@PathVariable Integer id) {
        return service.getExamSubjectById(id);
    }


    @DeleteMapping("/delete-examSubject-by-id")
    public String deleteExamSubject(@PathVariable Integer id) {
        return service.deleteExamSubject(id);
    }
}
