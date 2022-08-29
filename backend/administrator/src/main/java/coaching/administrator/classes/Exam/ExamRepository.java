package coaching.administrator.classes.Exam;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamRepository extends JpaRepository<Exam, Integer> {

    Exam findByName(String name);

    List<Exam> findByProgramId(Integer programId);
}