package coaching.administrator.classes.Subject;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository repository;

    public ObjectNode saveSubject(Subject subject) {
        subject.setOpeningDate(new Date());
        repository.save(subject);
        return Global.createSuccessMessage("Subject save successfully");
    }

    public ObjectNode updateSubject(Subject subject) {
        repository.save(subject);
        return Global.createSuccessMessage("Subject update successfully");
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

    public ObjectNode deleteSubject(Integer id) {
        repository.deleteById(id);
        return Global.createSuccessMessage("Subject delete successfully");
    }

}