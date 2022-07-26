package coaching.administrator.classes.ClassTaken;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClassTakenRepository extends JpaRepository<ClassTaken, Integer> {

    @Query(value = " select *    "
            + " from class_taken ctk,class_time ct " +
            " where ctk.class_time_id = ct.id and ct.batch_id = :batchId ", nativeQuery = true)
    List<ClassTaken> findAllByBatchId(@Param("batchId") Integer batchId);
}