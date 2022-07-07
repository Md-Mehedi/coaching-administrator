package coaching.administrator.classes.Occupation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OccupationService {

    @Autowired
    private OccupationRepository repository;

    public Occupation saveOccupation(Occupation occupation) {
        return repository.save(occupation);
    }

    public Occupation getOccupationById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Occupation getOccupationByName(String name) {
        return repository.findByName(name);
    }

    public String deleteOccupation(Integer id) {
        repository.deleteById(id);
        return "Occupation with id : " + id + " deleted";
    }

}