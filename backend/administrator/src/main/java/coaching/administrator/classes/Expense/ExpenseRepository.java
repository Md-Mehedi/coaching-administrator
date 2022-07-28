package coaching.administrator.classes.Expense;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    List<Expense> findAllByCoachingId(Integer coachingId);
    
    @Query(value = " select * " +
            " from expense e " +
            " where e.coaching_id = :coachingId  and upper(to_char(e.time, 'Month')) = upper(:month) and to_char(e.time, 'Year') = :year", nativeQuery = true)
    Expense findByCoachingIdMonthYear(@Param("coachingId") Integer coachingId,
                        @Param("month") String month,@Param("year") String year);

}
