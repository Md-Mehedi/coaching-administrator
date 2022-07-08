package coaching.administrator.classes.Institution;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository repository;

    public Institution saveInstitution(Institution institution) {
        return repository.save(institution);
    }

    public Institution getInstitutionById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Institution getInstitutionByName(String name) {
        return repository.findByName(name);
    }

    public String deleteInstitution(Integer id) {
        repository.deleteById(id);
        return "Institution with id : " + id + " deleted";
    }

}