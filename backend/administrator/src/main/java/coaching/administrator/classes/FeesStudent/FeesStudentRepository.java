package coaching.administrator.classes.FeesStudent;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeesStudentRepository extends JpaRepository<FeesStudent, Integer> {

    @Query(value = " select * from fees_student  fs,student s" +
            " where fs.student_id = s.person_id and s.person_id = :studentId", nativeQuery = true)
    List<FeesStudent> findAllByStudentId(@Param("studentId") Integer studentId);

    @Query(value = " select * " +
            " from fees_student fs,student s,person p " +
            " where fs.student_id = s.person_id and s.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
    List<FeesStudent> findAllByCoachingId(@Param("coachingId") Integer coachingId);

}