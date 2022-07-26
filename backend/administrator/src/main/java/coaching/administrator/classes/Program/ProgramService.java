package coaching.administrator.classes.Program;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProgramService {

    @Autowired
    private ProgramRepository repository;

    public Program saveProgram(Program program) {
        return repository.save(program);
    }

    public Program getProgramById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Program getProgramByName(String name) {
        return repository.findByName(name);
    }

    public String deleteProgram(Integer id) {

        repository.deleteById(id);
        return "Program with id : " + id + " deleted";
    }

    public Program updateProgram(Program program) {
        Program oldProgram = repository.findById(program.getId()).orElse(null);

        oldProgram.setName(program.getName());
        oldProgram.setDescription(program.getDescription());
        oldProgram.setStartDate(program.getStartDate());
        oldProgram.setEndDate(program.getEndDate());
        oldProgram.setAdmissionFee(program.getAdmissionFee());

        return repository.save(oldProgram);
    }

}