package coaching.administrator.classes.TeacherPaymentOwed;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeacherPaymentOwedRepository extends JpaRepository<TeacherPaymentOwed, Integer> {

    @Query(value = " select * "
            + " from teacher_payment_owed tpw, teacher_payment t " +
            " where t.id = tpw.teacher_payment_id and" +
            " t.teacher_id = :teacherId ", nativeQuery = true)
    List<TeacherPaymentOwed> findAllByTeacherId(@Param("teacherId") Integer teacherId);

    @Modifying
    @Transactional
    @Query(value = "update teacher_payment_owed tpw" +
            " set withdrawal_date = now()" +
            " from teacher_payment tp" +
            " where tp.id = tpw.teacher_payment_id" +
            " and tp.teacher_id = :teacherId ", nativeQuery = true)
    void withdrawAllTeacherPaymentOwed(@Param("teacherId") Integer teacherId);

    // List<TeacherPaymentOwed> findAllByTeacherId(Integer teacherId);

    // TeacherPaymentOwed findByEmail(String email);
}
