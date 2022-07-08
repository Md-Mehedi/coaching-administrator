package coaching.administrator.classes.Thana;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThanaService {

    @Autowired
    private ThanaRepository repository;

    public Thana saveThana(Thana thana) {
        return repository.save(thana);
    }

    public Thana getThanaById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Thana getThanaByName(String name) {
        return repository.findByName(name);
    }

    public String deleteThana(Integer id) {
        repository.deleteById(id);
        return "Thana with id : " + id + " deleted";
    }

}