
package coaching.administrator.classes.Expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;

@RestController
public class ExpenseController {

    @Autowired
    private ExpenseService service;
    @Autowired
    private CoachingService coachingService;

    @Autowired
    private ExpenseRepository repository;

    @PostMapping("/add-expense")
    public ObjectNode addExpense(@RequestBody Expense expense) {
        expense.setCoaching(coachingService.getCoachingById(1));
        return service.saveExpense(expense);
    }

    @PutMapping("/update-expense")
    public ObjectNode update(@RequestBody Expense expense) {
        return service.saveExpense(expense);
    }

    @GetMapping("/get-expense-by-id/{id}")
    public Expense getExpenseById(@PathVariable Integer id) {
        return service.getExpenseById(id);
    }

    @GetMapping("/get-all-expenses")
    public List<Expense> getExpenses() {
        return repository.findByCoachingId(Global.coachingId);
    }

    // @GetMapping("/get-expense-by-coaching-id-month-year/{coachingId}/{month}/{year}")
    // public Expense getExpenseByCoachingIdMonthYear(@PathVariable Integer coachingId,@PathVariable String month,@PathVariable Integer year) {
    //     return repository.findByCoachingIdMonthYear(coachingId,month,Integer.toString(year));
    // }

    @DeleteMapping("/delete-expense-by-id/{id}")
    public ObjectNode deleteExpense(@PathVariable Integer id) {
        return service.deleteExpense(id);
    }

}
