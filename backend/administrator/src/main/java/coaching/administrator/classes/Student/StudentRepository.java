package coaching.administrator.classes.Student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    @Query(value = " select *    "
            + " from student st, person p " +
            " where st.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
    List<Student> findAllByCoaching(@Param("coachingId") Integer coachingId);

    // Student findByFullName(String name);

    // Student findByEmail(String email);
}
