package coaching.administrator.classes.EnrolledProgram;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.websocket.server.PathParam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

        @Query(value = "select *" +
                        " from enrolled_program ep" +
                        " where ep.student_id = :studentId", nativeQuery = true)
        List<EnrolledProgram> findByStudentId(@Param("studentId") Integer studentId);

        @Modifying
        @Transactional
        @Query(value = "insert into enrolled_program (program_id, student_id, enrolled_date) values(:programId, :studentId, now())", nativeQuery = true)
        void add(@Param("programId") Integer programId, @Param("studentId") Integer studentId);

        @Query(value = "select * from enrolled_program where program_id=:programId and student_id=:studentId", nativeQuery = true)
        EnrolledProgram findByProgramIdStudentId(@Param("programId") Integer programId,
                        @Param("studentId") Integer studentId);
}