package coaching.administrator.classes.StudentBatch;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentBatchRepository extends JpaRepository<StudentBatch, Integer> {

    // StudentBatch findByType(String typeName);

    List<StudentBatch> findAll();
}