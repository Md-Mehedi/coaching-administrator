package coaching.administrator.classes.ExamSubject;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamSubjectService {

    @Autowired
    private ExamSubjectRepository repository;

    public ExamSubject saveExamSubject(ExamSubject examSubject) {
        return repository.save(examSubject);
    }

    public ExamSubject getExamSubjectById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteExamSubject(Integer id) {
        repository.deleteById(id);
        return "ExamSubject with id : " + id + " deleted";
    }

}