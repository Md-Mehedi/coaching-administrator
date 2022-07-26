
package coaching.administrator.classes.ClassTaken;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassTakenController {

    @Autowired
    private ClassTakenService service;

    @Autowired
    private ClassTakenRepository repository;

    @PostMapping("/add-classTaken")
    public ClassTaken addClassTaken(@RequestBody ClassTaken classTaken) {
        System.out.println("\033[31minside add classTaken\033[0m");

        return service.saveClassTaken(classTaken);
    }

    @GetMapping("/get-classTaken-by-id/{id}")
    public ClassTaken getClassTakenById(@PathVariable Integer id) {
        return service.getClassTakenById(id);
    }

    @GetMapping("/get-classTaken-by-batchId/{id}")
    public List<ClassTaken> getClassTakenByBatchId(@PathVariable Integer id) {
        return repository.findAllByBatchId(id);
    }

    @DeleteMapping("/delete-classTaken-by-id")
    public String deleteClassTaken(@PathVariable Integer id) {
        return service.deleteClassTaken(id);
    }
}
