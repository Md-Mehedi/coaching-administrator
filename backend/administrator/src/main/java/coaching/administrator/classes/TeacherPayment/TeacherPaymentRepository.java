package coaching.administrator.classes.TeacherPayment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeacherPaymentRepository extends JpaRepository<TeacherPayment, Integer> {

    @Query(value = " select * "
            + " from teacher_payment tp" +
            " where tp.teacher_id = :teacherId ", nativeQuery = true)
    List<TeacherPayment> findAllByTeacherId(@Param("teacherId") Integer teacherId);

    // TeacherPayment findByFullName(String name);

    // TeacherPayment findByEmail(String email);
}
