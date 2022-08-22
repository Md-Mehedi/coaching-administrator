package coaching.administrator.classes.StudentBatch;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentBatchRepository extends JpaRepository<StudentBatch, Integer> {

    // StudentBatch findByType(String typeName);

    List<StudentBatch> findAll();

    List<StudentBatch> findAllByBatchId(Integer batchId);

    // @Query(value = "select * from student_batch sb, student s, person p" +
    // " where student_id = :studentId", nativeQuery = true)
    // List<StudentBatch> findAllByProgramAndStudentId(@Param("programId") Integer
    // programId,
    // @Param("studentId") Integer studentId);

}