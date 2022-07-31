package coaching.administrator.classes.Program;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;

@Service
public class ProgramService {

    @Autowired
    private ProgramRepository repository;

    @Autowired
    private ObjectMapper mapper;

    public ObjectNode saveProgram(Program program) {
        repository.save(program);
        return Global.createSuccessMessage("Program save successfully");
    }

    public Program getProgramById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Program getProgramByName(String name) {
        return repository.findByName(name);
    }

    public ObjectNode deleteProgram(Integer id) {
        repository.deleteById(id);
        return Global.createSuccessMessage("Program deleted successfully");
    }

    public ObjectNode updateProgram(Program program) {
        repository.save(program);
        return Global.createSuccessMessage("Program updated successfully");
    }

}