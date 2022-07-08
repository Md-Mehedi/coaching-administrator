package coaching.administrator.classes.Exam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamService {

    @Autowired
    private ExamRepository repository;

    public Exam saveExam(Exam exam) {
        return repository.save(exam);
    }

    public Exam getExamById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Exam getExamByName(String name) {
        return repository.findByName(name);
    }

    public String deleteExam(Integer id) {
        repository.deleteById(id);
        return "Exam with id : " + id + " deleted";
    }

}