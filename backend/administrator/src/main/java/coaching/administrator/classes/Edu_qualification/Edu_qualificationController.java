
package coaching.administrator.classes.Edu_qualification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Edu_qualificationController {

    @Autowired
    private Edu_qualificationService service;

    @PostMapping("/add-edu_qualification")
    public Edu_qualification addEdu_qualification(@RequestBody Edu_qualification edu_qualification) {
        System.out.println("\033[31minside add edu_qualification\033[0m");

        return service.saveEdu_qualification(edu_qualification);
    }

    @GetMapping("/get-edu_qualification-by-id/{id}")
    public Edu_qualification getEdu_qualificationById(@PathVariable Integer id) {
        return service.getEdu_qualificationById(id);
    }

    @DeleteMapping("/delete-edu_qualification-by-id")
    public String deleteEdu_qualification(@PathVariable Integer id) {
        return service.deleteEdu_qualification(id);
    }
}
