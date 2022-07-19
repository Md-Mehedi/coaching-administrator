package coaching.administrator.classes.ClassTaken;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassTakenService {

    @Autowired
    private ClassTakenRepository repository;

    public ClassTaken saveClassTaken(ClassTaken classTaken) {
        return repository.save(classTaken);
    }

    public ClassTaken getClassTakenById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteClassTaken(Integer id) {
        repository.deleteById(id);
        return "ClassTaken with id : " + id + " deleted";
    }

}