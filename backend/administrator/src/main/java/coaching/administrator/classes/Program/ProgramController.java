
package coaching.administrator.classes.Program;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Coaching.Coaching;
import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;

@RestController
public class ProgramController {

    @Autowired
    private ProgramService service;
    @Autowired
    private CoachingService coachingService;
    @Autowired
    private ProgramRepository repository;

    @PostMapping("/add-program")
    public ObjectNode addProgram(@RequestBody Program program) {
        Coaching coaching = coachingService.getCoachingById(Global.coachingId);
        // Coaching coaching = new CoachingService().getCoachingbyId(1);
        Global.colorPrint(coaching);
        program.setCoaching(coaching);
        return service.saveProgram(program);
    }

    @GetMapping("/get-program-by-id/{id}")
    public Program getProgramById(@PathVariable Integer id) {
        return service.getProgramById(id);
    }

    // @GetMapping("/get-program-by-name/{name}")
    // public Program getProgramByName(@PathVariable String name) {
    // return service.getProgramByName(name);
    // }

    @GetMapping("/get-all-program")
    public List<Program> getAllProgram() {
        return repository.findByCoachingId(Global.coachingId);
    }

    @PutMapping("/update-program")
    public ObjectNode updateProgram(@RequestBody Program program) {
        return service.updateProgram(program);
    }

    @DeleteMapping("/delete-program-by-id/{id}")
    public ObjectNode deleteProgram(@PathVariable Integer id) {
        return service.deleteProgram(id);
    }
}
