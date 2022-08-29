package coaching.administrator.classes.Result;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import coaching.administrator.classes.ExamMark.ExamMark;

public interface ResultRepository extends JpaRepository<Result, Integer> {

    @Query(value = "select max(obtained_mark) highestMark "
            + "from result r "
            + "where r.exam_mark_id = :examMarkId Group By r.exam_mark_id", nativeQuery = true)
    Float getHighestMarkByExamMark(@Param("examMarkId") Integer examMarkId);

    List<Result> findByExamMarkId(Integer id);
}