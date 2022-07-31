
package coaching.administrator.classes.FeesStudent;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import coaching.administrator.classes.Fees.FeesRepository;

@RestController
public class FeesStudentController {

    @Autowired
    private FeesStudentService service;

    @Autowired
    private FeesStudentRepository repository;

    @PostMapping("/add-feesStudent")
    public FeesStudent addFeesStudent(@RequestBody FeesStudent feesStudent) {
        System.out.println("\033[31minside add feesStudent\033[0m");

        return service.saveFeesStudent(feesStudent);
    }

    @GetMapping("/get-feesStudent-by-id/{id}")
    public FeesStudent getFeesStudentById(@PathVariable Integer id) {
        return service.getFeesStudentById(id);
    }

    @GetMapping("/get-feesStudent-by-studentId/{id}")
    public List<FeesStudent> getFeesStudentByStudentId(@PathVariable Integer id) {
        return repository.findAllByStudentId(id);
    }

    @GetMapping("/get-feesStudent-by-coachingId/{id}")
    public List<FeesStudent> getFeesStudentByCoachingId(@PathVariable Integer id) {
        return repository.findAllByCoachingId(id);
    }

    @PostMapping("/update-feesStudent")
    public FeesStudent updateFeesStudent(@RequestBody FeesStudent feesStudent) {

        return repository.save(feesStudent);
    }

    @DeleteMapping("/delete-feesStudent-by-id")
    public String deleteFeesStudent(@PathVariable Integer id) {
        return service.deleteFeesStudent(id);
    }
}
