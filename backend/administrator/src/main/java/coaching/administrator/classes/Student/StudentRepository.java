package coaching.administrator.classes.Student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.fasterxml.jackson.databind.node.ObjectNode;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    @Query(value = " select *    "
            + " from student st, person p " +
            " where st.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
    List<Student> findAllByCoaching(@Param("coachingId") Integer coachingId);

    @Query(value = " select p.id as id, p.nick_name as nickName, p.full_name as fullName    "
            + " from student st, person p " +
            " where st.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
    List<Object> findAllStudentMinimalByCoachingId(@Param("coachingId") Integer coachingId);

    // Student findByFullName(String name);

    // Student findByEmail(String email);
}
