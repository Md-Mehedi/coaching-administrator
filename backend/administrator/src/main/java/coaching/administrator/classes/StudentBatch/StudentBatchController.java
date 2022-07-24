
package coaching.administrator.classes.StudentBatch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentBatchController {

    @Autowired
    private StudentBatchService service;

    @PostMapping("/add-studentBatch")
    public StudentBatch addStudentBatch(@RequestBody StudentBatch studentBatch) {
        System.out.println("\033[31minside add studentBatch\033[0m");

        return service.saveStudentBatch(studentBatch);
    }

    @GetMapping("/get-studentBatch-by-id/{id}")
    public StudentBatch getStudentBatchById(@PathVariable Integer id) {
        return service.getStudentBatchById(id);
    }

    @GetMapping("/get-all-studentBatches")
    public List<StudentBatch> getStudentBatches() {
        return service.getStudentBatches();
    }

    // @GetMapping("/get-studentBatch-by-name/{name}")
    // public StudentBatch getStudentBatchByName(@PathVariable String name) {
    // return service.getStudentBatchByName(name);
    // }

    @DeleteMapping("/delete-studentBatch-by-id")
    public String deleteStudentBatch(@PathVariable Integer id) {
        return service.deleteStudentBatch(id);
    }
}
