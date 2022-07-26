
package coaching.administrator.classes.EnrolledProgram;

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
public class EnrolledProgramController {

    @Autowired
    private EnrolledProgramRepository repository;

    @PostMapping("/add-enrolledProgram")
    public EnrolledProgram addEnrolledProgram(@RequestBody EnrolledProgram enrolledProgram) {
        System.out.println("\033[31m inside add enrolledProgram\033[0m");

        return repository.save(enrolledProgram);
    }

    @GetMapping("/get-enrolledProgram-by-id/{id}")
    public Optional<EnrolledProgram> getEnrolledProgramById(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @GetMapping("/get-all-enrolledProgram")
    public List<EnrolledProgram> getStudentBatchHistories() {
        return repository.findAll();
    }

    // @GetMapping("/get-enrolledProgram-by-name/{name}")
    // public EnrolledProgram getEnrolledProgramByName(@PathVariable String
    // name) {
    // return service.getEnrolledProgramByName(name);
    // }

    @DeleteMapping("/delete-enrolledProgram-by-id")
    public String deleteEnrolledProgram(@PathVariable Integer id) {
        repository.deleteById(id);
        return "Student Batch History with " + " id " + id + " deleted";
    }
}
