package coaching.administrator.classes.TeacherPaymentOwed;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeacherPaymentOwedRepository extends JpaRepository<TeacherPaymentOwed, Integer> {

    @Query(value = " select * "
            + " from teacher_payment_owed t" +
            " where t.teacher_id = :teacherId ", nativeQuery = true)
    List<TeacherPaymentOwed> findAllByTeacherId(@Param("teacherId") Integer teacherId);

    // List<TeacherPaymentOwed> findAllByTeacherId(Integer teacherId);

    // TeacherPaymentOwed findByEmail(String email);
}
