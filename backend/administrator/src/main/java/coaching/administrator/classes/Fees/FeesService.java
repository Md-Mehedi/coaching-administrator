package coaching.administrator.classes.Fees;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeesService {

    @Autowired
    private FeesRepository repository;

    public Fees saveFees(Fees fees) {
        return repository.save(fees);
    }

    public Fees getFeesById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteFees(Integer id) {
        repository.deleteById(id);
        return "Fees with id : " + id + " deleted";
    }

}