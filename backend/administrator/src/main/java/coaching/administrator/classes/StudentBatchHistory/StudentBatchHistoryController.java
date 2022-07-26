
package coaching.administrator.classes.StudentBatchHistory;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentBatchHistoryController {

    @Autowired
    private StudentBatchHistoryRepository repository;

    @PostMapping("/add-studentBatchHistory")
    public StudentBatchHistory addStudentBatchHistory(@RequestBody StudentBatchHistory studentBatchHistory) {
        System.out.println("\033[31m inside add studentBatchHistory\033[0m");

        return repository.save(studentBatchHistory);
    }

    @GetMapping("/get-studentBatchHistory-by-id/{id}")
    public Optional<StudentBatchHistory> getStudentBatchHistoryById(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @GetMapping("/get-all-studentBatchHistory")
    public List<StudentBatchHistory> getStudentBatchHistories() {
        return repository.findAll();
    }

    // @GetMapping("/get-studentBatchHistory-by-name/{name}")
    // public StudentBatchHistory getStudentBatchHistoryByName(@PathVariable String
    // name) {
    // return service.getStudentBatchHistoryByName(name);
    // }

    @DeleteMapping("/delete-studentBatchHistory-by-id")
    public String deleteStudentBatchHistory(@PathVariable Integer id) {
        repository.deleteById(id);
        return "Student Batch History with " + " id " + id + " deleted";
    }
}
