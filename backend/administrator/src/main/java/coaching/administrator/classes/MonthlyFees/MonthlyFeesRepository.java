package coaching.administrator.classes.MonthlyFees;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MonthlyFeesRepository extends JpaRepository<MonthlyFees, Integer> {

//     List<MonthlyFees> findAllByStudentId(Integer studentId);

    List<MonthlyFees> findAllByBatchId(Integer batchId);

    @Query(value = " select * " +
            " from monthly_fees ms,student s,person p " +
            " where ms.student_id = s.person_id and s.person_id = p.id", nativeQuery = true)
    List<MonthlyFees> findAllByStudentId(Integer studentId);

    @Query(value = " select * " +
            " from monthly_fees ms,student s,person p " +
            " where ms.student_id = s.person_id and s.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
    List<MonthlyFees> findAllByCoachingId(@Param("coachingId") Integer coachingId);

    @Query(value = " select * " +
            " from monthly_fees ms where upper(to_char(ms.month_date, 'Month')) = upper(:month)", nativeQuery = true)
    List<MonthlyFees> findAllByMonth(@Param("month") String month);

    @Query(value = " select * " +
            " from monthly_fees ms where ms.month_date BETWEEN :startDate AND :endDate", nativeQuery = true)
    List<MonthlyFees> findAllByDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}