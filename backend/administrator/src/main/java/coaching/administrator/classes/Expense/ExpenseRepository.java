package coaching.administrator.classes.Expense;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

        List<Expense> findByCoachingIdOrderByExpenseDateDesc(Integer coachingId);

        @Query(value = " select * " +
                        " from expense e " +
                        " where e.coaching_id = :coachingId  and to_char(e.expense_date, 'MM') = :month and to_char(e.expense_date, 'YYYY') = :year order by e.expense_date", nativeQuery = true)
        List<Expense> findByCoachingIdMonthYear(@Param("coachingId") Integer coachingId,
                        @Param("month") String month, @Param("year") String year);

        @Query(value = " select sum(amount) total from expense " +
                        " where coaching_id = :coachingId and EXTRACT(MONTH FROM expense_date) = :monthNo ", nativeQuery = true)

        Integer findByTotalMonth(@Param("coachingId") Integer coachingId,
                        @Param("monthNo") Integer monthNo);

}
