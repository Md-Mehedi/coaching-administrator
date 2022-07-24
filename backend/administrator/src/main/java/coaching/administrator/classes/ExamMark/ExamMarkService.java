package coaching.administrator.classes.ExamMark;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamMarkService {

    @Autowired
    private ExamMarkRepository repository;

    public ExamMark saveExamMark(ExamMark examMark) {
        return repository.save(examMark);
    }

    public ExamMark getExamMarkById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteExamMark(Integer id) {
        repository.deleteById(id);
        return "ExamMark with id : " + id + " deleted";
    }

}