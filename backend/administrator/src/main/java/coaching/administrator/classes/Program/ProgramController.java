
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
import coaching.administrator.classes.Security.jwt.JwtUtils;

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
        Coaching coaching = coachingService.getCoachingById(JwtUtils.getCoachingId());
        // Coaching coaching = new CoachingService().getCoachingbyId(1);
        Global.colorPrint(coaching);
        program.setCoaching(coaching);
        return service.saveProgram(program);
    }

    @GetMapping("/get-program-by-id/{id}")
    public ObjectNode getProgramById(@PathVariable Integer id) {
        Program program = service.getProgramById(id);
        if (program == null) {
            return Global.createErrorMessage("Program not found");
        }
        if (program.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Program found")
                    .putPOJO("object", program);
        } else {
            return Global.createErrorMessage("You are not eligible to fetch this program");
        }
    }

    // @GetMapping("/get-program-by-name/{name}")
    // public Program getProgramByName(@PathVariable String name) {
    // return service.getProgramByName(name);
    // }

    @GetMapping("/get-all-program")
    public List<Program> getAllProgram() {
        return repository.findByCoachingId(JwtUtils.getCoachingId());
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
