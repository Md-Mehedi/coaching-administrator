
package coaching.administrator.classes.EduQualification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EduQualificationController {

    @Autowired
    private EduQualificationService service;

    @PostMapping("/add-eduQualification")
    public EduQualification addEdu_qualification(@RequestBody EduQualification eduQualification) {
        System.out.println("\033[31minside add eduQualification\033[0m");

        return service.saveEdu_qualification(eduQualification);
    }

    @GetMapping("/get-eduQualification-by-id/{id}")
    public EduQualification getEdu_qualificationById(@PathVariable Integer id) {
        return service.getEdu_qualificationById(id);
    }

    @DeleteMapping("/delete-eduQualification-by-id")
    public String deleteEdu_qualification(@PathVariable Integer id) {
        return service.deleteEdu_qualification(id);
    }
}
