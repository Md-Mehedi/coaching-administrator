package coaching.administrator.classes.Exam;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamService {

    @Autowired
    private ExamRepository repository;

    public Exam getExamById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Exam getExamByName(String name) {
        return repository.findByName(name);
    }

    public List<Exam> getAllExamsByProgramId(Integer programId) {
        return repository.findByProgramId(programId);
    }

    public void save(Exam exam) {
        repository.save(exam);
    }

    public void delete(Exam exam) {
        repository.delete(exam);
    }

    public void update(Exam exam) {
        repository.save(exam);
    }
}