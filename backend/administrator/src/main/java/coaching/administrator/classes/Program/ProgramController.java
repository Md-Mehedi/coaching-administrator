
package coaching.administrator.classes.Program;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProgramController {

    @Autowired
    private ProgramService service;

    @PostMapping("/add-program")
    public String addAdmin(@RequestBody Program program) {

        try {
            System.out.println("\033[31minside add program\033[0m");
            service.saveProgram(program);
        } catch (Exception e) {
            service.deleteProgram(program.getId());
            System.out.println("\033[31minside Exception in add program\033[0m");
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/get-program-by-id/{id}")
    public Program getProgramById(@PathVariable Integer id) {
        return service.getProgramById(id);
    }

    @GetMapping("/get-program-by-name/{name}")
    public Program getProgramByName(@PathVariable String name) {
        return service.getProgramByName(name);
    }

    @PutMapping("/update-program-by-id")
    public Program updateProgram(@RequestBody Program program) {
        return service.updateProgram(program);
    }
}
