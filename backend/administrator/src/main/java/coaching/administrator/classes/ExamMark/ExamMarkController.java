
package coaching.administrator.classes.ExamMark;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExamMarkController {

    @Autowired
    private ExamMarkService service;

    @PostMapping("/add-examMark")
    public ExamMark addExamMark(@RequestBody ExamMark examMark) {
        System.out.println("\033[31minside add examMark\033[0m");

        return service.saveExamMark(examMark);
    }

    @GetMapping("/get-examMark-by-id/{id}")
    public ExamMark getExamMarkById(@PathVariable Integer id) {
        return service.getExamMarkById(id);
    }


    @DeleteMapping("/delete-examMark-by-id")
    public String deleteExamMark(@PathVariable Integer id) {
        return service.deleteExamMark(id);
    }
}
