package coaching.administrator.classes.Religion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReligionService {

    @Autowired
    private ReligionRepository repository;

    public Religion saveReligion(Religion religion) {
        return repository.save(religion);
    }

    public Religion getReligionById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Religion getReligionByName(String name) {
        return repository.findByName(name);
    }

    public String deleteReligion(Integer id) {
        repository.deleteById(id);
        return "Religion with id : " + id + " deleted";
    }

}