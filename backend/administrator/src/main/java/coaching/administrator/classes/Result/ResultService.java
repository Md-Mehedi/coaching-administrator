package coaching.administrator.classes.Result;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Exam.Exam;
import coaching.administrator.classes.ExamMark.ExamMark;
import coaching.administrator.classes.ExamSubject.ExamSubject;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Student.Student;

@Service
public class ResultService {

    @Autowired
    private ResultRepository repository;

    // public Result saveResult(Result result) {
    // return repository.save(result);
    // }

    public Result getResultById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // public String deleteResult(Integer id) {
    // repository.deleteById(id);
    // return "Result with id : " + id + " deleted";
    // }

    public void save(Result result) {
        repository.save(result);
    }

    public void delete(Result result) {
        repository.delete(result);
    }

    public void update(Result result) {
        repository.save(result);
    }

    public Set<Result> getAllResultsByExamSubject(ExamSubject fetchedExamSubject) {

        Set<Result> totalResultList = new HashSet<Result>();

        fetchedExamSubject.getExamMarkList().size();
        Set<ExamMark> examMarkList = fetchedExamSubject.getExamMarkList();

        for (ExamMark examMark : examMarkList) {

            examMark.getResultList().size();
            Set<Result> examResultList = examMark.getResultList();

            for (Result result : examResultList) {
                totalResultList.add(result);
            }
        }
        return totalResultList;
    }

    public Set<Result> getAllResultsByStudentExam(Exam fetchedExam, Student fetchedStudent) {
        Set<Result> totalResultList = new HashSet<Result>();
        fetchedExam.getExamSubjectList().size();
        for (ExamSubject examSubject : fetchedExam.getExamSubjectList()) {
            examSubject.getExamMarkList().size();
            for (ExamMark examMark : examSubject.getExamMarkList()) {
                examMark.getResultList().size();
                for (Result result : examMark.getResultList()) {
                    if (result.getStudent().getPerson().getId() == fetchedStudent.getPerson().getId()) {
                        result.setHighestMark(repository.getHighestMarkByExamMark(examMark.getId()));
                        totalResultList.add(result);
                        Global.colorPrint("Result Added");
                    }
                }
            }
        }
        return totalResultList;
    }
}
