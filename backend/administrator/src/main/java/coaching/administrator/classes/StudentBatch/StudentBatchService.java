package coaching.administrator.classes.StudentBatch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentBatchService {

    @Autowired
    private StudentBatchRepository repository;

    public StudentBatch saveStudentBatch(StudentBatch studentBatch) {
        return repository.save(studentBatch);
    }

    public StudentBatch getStudentBatchById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // public StudentBatch getStudentBatchByName(String typeName) {
    // return repository.findByType(typeName);
    // }

    public List<StudentBatch> getStudentBatches() {
        return repository.findAll();
    }

    public String deleteStudentBatch(Integer id) {
        repository.deleteById(id);
        return "StudentBatch with id : " + id + " deleted";
    }

}