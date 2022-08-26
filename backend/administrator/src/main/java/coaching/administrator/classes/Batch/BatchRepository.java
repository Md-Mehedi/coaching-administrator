package coaching.administrator.classes.Batch;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BatchRepository extends JpaRepository<Batch, Integer> {

    Batch findByName(String name);

    List<Batch> findByProgramId(Integer programId);

    @Query(value = "select count(*) batchCount "
            + "from batch b "
            + "where b.program_id = p.id and p.coaching_id = :coachingId "
            + "group by p.coaching_id", nativeQuery = true)
    Map<String, Object> countByCoachingId(@Param("coachingId") Integer coachingId);

}