package coaching.administrator.classes.FeesStudent;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeesStudentService {

    @Autowired
    private FeesStudentRepository repository;

    public FeesStudent saveFeesStudent(FeesStudent feesStudent) {
        return repository.save(feesStudent);
    }

    public FeesStudent getFeesStudentById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteFeesStudent(Integer id) {
        repository.deleteById(id);
        return "FeesStudent with id : " + id + " deleted";
    }

}