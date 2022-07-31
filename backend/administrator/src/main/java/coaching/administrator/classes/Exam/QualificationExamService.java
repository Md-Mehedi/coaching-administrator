package coaching.administrator.classes.Exam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QualificationExamService {

    @Autowired
    private QualificationExamRepository repository;

    public QualificationExam saveQualificationExam(QualificationExam exam) {
        return repository.save(exam);
    }

    public QualificationExam getQualificationExamById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public QualificationExam getQualificationExamByName(String name) {
        return repository.findByName(name);
    }

    public String deleteQualificationExam(Integer id) {
        repository.deleteById(id);
        return "Exam with id : " + id + " deleted";
    }

}