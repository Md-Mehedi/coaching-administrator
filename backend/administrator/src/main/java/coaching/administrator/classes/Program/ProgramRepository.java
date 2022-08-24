package coaching.administrator.classes.Program;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Integer> {

    Program findByName(String name);

    List<Program> findAllByCoachingId(Integer id);

    @Query(value = " select count(*) programCount,p.coaching_id coachingId    "
            + " from program p " +
            " where  p.coaching_id = :coachingId ", nativeQuery = true)
    Map<String, Object> countByCoachingId(@Param("coachingId") Integer coachingId);

}
