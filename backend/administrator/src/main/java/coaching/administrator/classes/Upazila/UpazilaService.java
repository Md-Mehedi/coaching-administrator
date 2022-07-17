package coaching.administrator.classes.Upazila;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpazilaService {

    @Autowired
    private UpazilaRepository repository;

    public Upazila saveThana(Upazila thana) {
        return repository.save(thana);
    }

    public Upazila getThanaById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Upazila getThanaByName(String name) {
        return repository.findByName(name);
    }

    public List<Upazila> getUpazilaByDistrict(Integer id) {
        return repository.findByDistrictId(id);
    }

    public String deleteThana(Integer id) {
        repository.deleteById(id);
        return "Thana with id : " + id + " deleted";
    }

}