package coaching.administrator.classes.Student;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudentRepository extends JpaRepository<Student, Integer> {

        @Query(value = " select *    "
                        + " from student st, person p " +
                        " where st.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
        List<Student> findAllByCoaching(@Param("coachingId") Integer coachingId);

        @Query(value = " select p.id as id, p.nick_name as nickName, p.full_name as fullName    "
                        + " from student st, person p " +
                        " where st.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
        List<Object> findAllStudentMinimalByCoachingId(@Param("coachingId") Integer coachingId);

        @Query(value = " select count(*) studentCount,p.coaching_id coachingId    "
                        + " from student t, person p " +
                        " where t.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
        Map<String, Object> countByCoachingId(@Param("coachingId") Integer coachingId);

        // Student findByFullName(String name);

        // Student findByEmail(String email);
}
