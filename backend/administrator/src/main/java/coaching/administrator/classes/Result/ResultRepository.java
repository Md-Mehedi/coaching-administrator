package coaching.administrator.classes.Result;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ResultRepository extends JpaRepository<Result, Integer> {

    @Query(value = "select max(obtained_mark) highestMark "
            + "from result r "
            + "where r.exam_mark_id = :examMarkId Group By r.exam_mark_id", nativeQuery = true)
    Float getHighestMarkByExamMark(@Param("examMarkId") Integer examMarkId);
}