package coaching.administrator.classes.EduQualification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EduQualificationService {

    @Autowired
    private EduQualificationRepository repository;

    public EduQualification saveEdu_qualification(EduQualification edu_qualification) {
        return repository.save(edu_qualification);
    }

    public EduQualification getEdu_qualificationById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public String deleteEdu_qualification(Integer id) {
        repository.deleteById(id);
        return "Edu_qualification with id : " + id + " deleted";
    }

}