package coaching.administrator.classes.Expense;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {

    List<Expense> findAllByCoachingId(Integer coachingId);
}