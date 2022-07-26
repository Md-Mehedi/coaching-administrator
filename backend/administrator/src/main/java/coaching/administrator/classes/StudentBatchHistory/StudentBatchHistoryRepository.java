package coaching.administrator.classes.StudentBatchHistory;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentBatchHistoryRepository extends JpaRepository<StudentBatchHistory, Integer> {

    Optional<StudentBatchHistory> findById(Integer id);

    List<StudentBatchHistory> findAll();
}