package coaching.administrator.classes.Edu_qualification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Edu_qualificationService {

    @Autowired
    private Edu_qualificationRepository repository;

    public Edu_qualification saveEdu_qualification(Edu_qualification edu_qualification) {
        return repository.save(edu_qualification);
    }

    public Edu_qualification getEdu_qualificationById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public String deleteEdu_qualification(Integer id) {
        repository.deleteById(id);
        return "Edu_qualification with id : " + id + " deleted";
    }

}