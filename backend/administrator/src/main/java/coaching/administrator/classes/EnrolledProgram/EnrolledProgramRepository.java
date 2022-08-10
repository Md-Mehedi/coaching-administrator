package coaching.administrator.classes.EnrolledProgram;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EnrolledProgramRepository extends JpaRepository<EnrolledProgram, Integer> {

        Optional<EnrolledProgram> findById(Integer id);

        @Query(value = "select * from enrolled_program " +
                        " where program_id = :programId", nativeQuery = true)
        List<EnrolledProgram> findByProgramId(@Param("programId") Integer programId);

        @Query(value = "select * from enrolled_program " +
                        " where coaching_id = :coachingId", nativeQuery = true)
        List<EnrolledProgram> findAllByCoachingId(@Param("coachingId") Integer coachingId);
}