package coaching.administrator.classes.Division;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DivisionService {

    @Autowired
    private DivisionRepository repository;

    public Division saveDivision(Division division) {
        return repository.save(division);
    }

    public Division getDivisionById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Division getDivisionByName(String name) {
        return repository.findByName(name);
    }

    public String deleteDivision(Integer id) {
        repository.deleteById(id);
        return "Division with id : " + id + " deleted";
    }

}