package coaching.administrator.classes.Exam;

import org.springframework.data.jpa.repository.JpaRepository;

public interface QualificationExamRepository extends JpaRepository<QualificationExam, Integer> {

    QualificationExam findByName(String name);
}