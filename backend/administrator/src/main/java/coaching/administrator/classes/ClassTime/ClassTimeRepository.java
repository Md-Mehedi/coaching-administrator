package coaching.administrator.classes.ClassTime;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClassTimeRepository extends JpaRepository<ClassTime, Integer> {

    List<ClassTime> findAllByBatchId(Integer batchId);

    @Query(value = " select *    "
            + " from class_time ct,batch b,program p " +
            " where ct.batch_id = b.id and b.program_id = p.id ", nativeQuery = true)
    List<ClassTime> findAllByProgramId(Integer programId);

    @Query(value = " select *    "
            + " from class_time ct,teacher t " +
            " where ct.teacher_id = t.person_id = :teacherId ", nativeQuery = true)
    List<ClassTime> findAllByTeacherId(@Param("teacherId") Integer teacherId);

    @Query(value = " select *    "
            + " from class_time ct,student_batch sb " +
            " where ct.batch_id = sb.batch_id and sb.student_id = :studentId ", nativeQuery = true)
    List<ClassTime> findAllByStudentId(@Param("studentId") Integer studentId);
}
