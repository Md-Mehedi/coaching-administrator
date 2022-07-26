
package coaching.administrator.classes.ClassTime;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassTimeController {

    @Autowired
    private ClassTimeRepository repository;

    @PostMapping("/add-classTime")
    public ClassTime addClassTime(@RequestBody ClassTime classTime) {
        System.out.println("\033[31minside add classTime\033[0m");

        return repository.save(classTime);
    }

    @GetMapping("/get-classTime-by-id/{id}")
    public ClassTime getClassTimeById(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/get-all-classTime-by-batchId/{id}")
    public List<ClassTime> getClassTimeByBatchId(@PathVariable Integer id) {
        return repository.findAllByBatchId(id);
    }

    @GetMapping("/get-all-classTime-by-programId/{id}")
    public List<ClassTime> getClassTimeByProgramId(@PathVariable Integer id) {
        return repository.findAllByProgramId(id);
    }

    @GetMapping("/get-all-classTime-by-teacherId/{id}")
    public List<ClassTime> getClassTimeByTeacherId(@PathVariable Integer id) {
        return repository.findAllByTeacherId(id);
    }

    @GetMapping("/get-all-classTime-by-studentId/{id}")
    public List<ClassTime> getClassTimeByStudentId(@PathVariable Integer id) {
        return repository.findAllByStudentId(id);
    }

    @DeleteMapping("/update-classTime")
    public ClassTime deleteClassTime(@RequestBody ClassTime classTime) {
        return repository.save(classTime);
    }

    @DeleteMapping("/delete-classTime-by-id/{id}")
    public String deleteClassTime(@PathVariable Integer id) {
        repository.deleteById(id);

        return "class time with id " + id + " deleted";
    }
}
