package coaching.administrator.classes.MonthlyFees;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MonthlyFeesRepository extends JpaRepository<MonthlyFees, Integer> {

        // List<MonthlyFees> findAllByStudentId(Integer studentId);

        List<MonthlyFees> findAllByBatchId(Integer batchId);

        @Query(value = " select * " +
                        " from monthly_fees ms " +
                        " where ms.student_id = :studentId", nativeQuery = true)
        List<MonthlyFees> findAllByStudentId(@Param("studentId") Integer studentId);

        @Query(value = " select ms.id,ms.amount,ms.due_date,ms.payment_date,ms.batch_id,ms.student_id " +
                        " from    monthly_fees ms,student s, person p " +
                        " where ms.student_id = s.person_id and s.person_id = p.id and p.coaching_id = :coachingId ", nativeQuery = true)
        List<MonthlyFees> findAllByCoachingId(@Param("coachingId") Integer coachingId);

        @Query(value = " select * " +
                        " from monthly_fees ms where upper(to_char(ms.month_date, 'Month')) = upper(:month)", nativeQuery = true)
        List<MonthlyFees> findAllByMonth(@Param("month") String month);

        @Query(value = " select * " +
                        " from monthly_fees ms where ms.month_date BETWEEN :startDate AND :endDate", nativeQuery = true)
        List<MonthlyFees> findAllByDateRange(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

        @Query(value = " select sum(mf.amount) total,EXTRACT(MONTH FROM payment_date) as month " +
                        " from monthly_fees mf,batch b, program p,coaching c " +
                        " where mf.batch_id = b.id and b.program_id = p.id and p.coaching_id =c.id and " +
                        " EXTRACT(year FROM payment_date) = :yearNo and p.coaching_id = :coachingId " +
                        " and mf.payment_date is not null " +
                        " group by EXTRACT(MONTH FROM payment_date)  ", nativeQuery = true)
        List<Map<String, Object>> findCoachingIncomeByMonth(@Param("coachingId") Integer coachingId,
                        @Param("yearNo") Integer yearNo);

        @Query(value = " select sum(mf.amount) totalIncome,p.coaching_id coachingId" +
                        " from monthly_fees mf,batch b, program p,coaching c " +
                        " where mf.batch_id = b.id and b.program_id = p.id and p.coaching_id =c.id and " +
                        " EXTRACT(year FROM payment_date) = :yearNo and p.coaching_id = :coachingId " +
                        " and EXTRACT(month FROM payment_date) = :monthNo " +
                        " and  mf.payment_date is not null ", nativeQuery = true)
        Map<String, Object> findTotalCoachingIncomeByMonth(@Param("coachingId") Integer coachingId,
                        @Param("yearNo") Integer yearNo, @Param("monthNo") Integer monthNo);

        @Query(value = " select sum(mf.amount) total,EXTRACT(MONTH FROM payment_date) as month " +
                        " from monthly_fees mf,batch b, program p " +
                        " where mf.batch_id = b.id and b.program_id = p.id " +
                        " and p.id = :programId and mf.payment_date is not null and" +
                        " EXTRACT(year FROM payment_date) = :yearNo " +
                        " group by EXTRACT(MONTH FROM payment_date)  ", nativeQuery = true)
        List<Map<String, Object>> findProgramIncomeByMonth(@Param("programId") Integer programId,
                        @Param("yearNo") Integer yearNo);

        @Query(value = " select sum(mf.amount) total,EXTRACT(MONTH FROM payment_date) as month " +
                        " from monthly_fees mf " +
                        " where mf.batch_id = :batchId " +
                        " and mf.payment_date is not null and EXTRACT(year FROM payment_date) = :yearNo " +
                        " group by EXTRACT(MONTH FROM payment_date) ", nativeQuery = true)
        List<Map<String, Object>> findBatchIncomeByMonth(@Param("batchId") Integer batchId,
                        @Param("yearNo") Integer yearNo);

        @Query(value = " select sum(mf.amount) total,EXTRACT(MONTH FROM payment_date) as month " +
                        " from monthly_fees mf,batch b, program p,coaching c " +
                        " where mf.batch_id = b.id and b.program_id = p.id and p.coaching_id = c.id " +
                        " and c.id = :coachingId and mf.payment_date is  null and EXTRACT(year FROM payment_date) = :yearNo "
                        +
                        " group by EXTRACT(MONTH FROM payment_date) ", nativeQuery = true)
        List<Map<String, Object>> findCoachingDueByMonth(@Param("coachingId") Integer coachingId,
                        @Param("yearNo") Integer yearNo);

}