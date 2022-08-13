package coaching.administrator.classes.StudentBatch;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentBatchRepository extends JpaRepository<StudentBatch, Integer> {

    // StudentBatch findByType(String typeName);

    // List<StudentBatch> findAll();

    @Query(value = "select * from student_batch " +
            " where batch_id = :batchId", nativeQuery = true)
    List<StudentBatch> findByBatchId(@Param("batchId") Integer batchId);

}