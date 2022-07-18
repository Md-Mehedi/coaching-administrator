package coaching.administrator.classes.Subject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository repository;

    public Subject saveSubject(Subject subject) {
        return repository.save(subject);
    }

    public Subject getSubjectById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Subject getSubjectByName(String name) {
        return repository.findByName(name);
    }

    public List<Subject> getSubjects() {
        return repository.findAll();
    }

    public String deleteSubject(Integer id) {
        repository.deleteById(id);
        return "Subject with id : " + id + " deleted";
    }

}