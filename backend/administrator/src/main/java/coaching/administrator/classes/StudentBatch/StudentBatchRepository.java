package coaching.administrator.classes.StudentBatch;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentBatchRepository extends JpaRepository<StudentBatch, Integer> {

    // StudentBatch findByType(String typeName);

    List<StudentBatch> findAll();

    @Modifying
    @Transactional
    @Query(value = "insert into student_batch (batch_id, student_id, start_date) values(:batchId, :studentId, now())", nativeQuery = true)
    void add(@Param("batchId") Integer batchId, @Param("studentId") Integer studentId);

    // @Query(value = "select * from student_batch sb, student s, person p" +
    // " where student_id = :studentId", nativeQuery = true)
    // List<StudentBatch> findAllByProgramAndStudentId(@Param("programId") Integer
    // programId,
    // @Param("studentId") Integer studentId);

    List<StudentBatch> findByBatchId(Integer batchId);

    @Query(value = "select * from student_batch where batch_id=:batchId and student_id = :studentId", nativeQuery = true)
    StudentBatch findByBatchIdStudentId(@Param("batchId") Integer batchId, @Param("studentId") Integer studentId);

}