package coaching.administrator.classes.Exam;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Integer> {

    Exam findByName(String name);
}