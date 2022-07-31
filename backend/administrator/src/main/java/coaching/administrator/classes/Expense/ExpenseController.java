
package coaching.administrator.classes.Expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExpenseController {

    @Autowired
    private ExpenseRepository repository;

    @PostMapping("/add-expense")
    public Expense addExpense(@RequestBody Expense expense) {
        System.out.println("\033[31minside add expense\033[0m");

        return repository.save(expense);
    }

    @GetMapping("/get-expense-by-id/{id}")
    public Expense getExpenseById(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/get-expense-by-coaching-id/{coachingId}")
    public List<Expense> getExpenseByCoachingId(@PathVariable Integer coachingId) {
        return repository.findAllByCoachingId(coachingId);
    }

    @GetMapping("/get-expense-by-coaching-id-month-year/{coachingId}/{month}/{year}")
    public Expense getExpenseByCoachingIdMonthYear(@PathVariable Integer coachingId,@PathVariable String month,@PathVariable Integer year) {
        return repository.findByCoachingIdMonthYear(coachingId,month,Integer.toString(year));
    }

    @DeleteMapping("/delete-expense-by-id")
    public String deleteExpense(@PathVariable Integer id) {
        repository.deleteById(id);
        return "expense with id " + id + " deleted";
    }
}
