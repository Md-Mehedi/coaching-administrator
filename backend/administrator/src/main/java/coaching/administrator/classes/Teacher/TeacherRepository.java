package coaching.administrator.classes.Teacher;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {

    @Query(value = " select *    "
            + " from teacher t, person p " +
            " where t.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
    List<Teacher> findAllByCoaching(@Param("coachingId") Integer coachingId);

    @Query(value = " select count(*) count,p.coaching_id coachingId    "
            + " from teacher t, person p " +
            " where t.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
    List<Map<String, Object>> countByCoachingId(@Param("coachingId") Integer coachingId);

    // Teacher findByFullName(String name);

    // Teacher findByEmail(String email);
}
