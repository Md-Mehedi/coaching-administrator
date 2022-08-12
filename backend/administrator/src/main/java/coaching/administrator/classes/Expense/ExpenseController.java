
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
import coaching.administrator.classes.Security.jwt.JwtUtils;

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
        expense.setCoaching(coachingService.getCoachingById(JwtUtils.getCoachingId()));
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
        return repository.findByCoachingId(JwtUtils.getCoachingId());
    }

    @GetMapping("/get-expense-by-coaching-id-month-year/{month}/{year}")
    public List<Expense> getExpenseByCoachingIdMonthYear(@PathVariable Integer month, @PathVariable Integer year) {
        Global.colorPrint(JwtUtils.getCoachingId() + " " + month + " " + year);
        return repository.findByCoachingIdMonthYear(JwtUtils.getCoachingId(),
                month < 10 ? "0" + month.toString() : month.toString(), year.toString());
    }

    @DeleteMapping("/delete-expense-by-id/{id}")
    public ObjectNode deleteExpense(@PathVariable Integer id) {
        return service.deleteExpense(id);
    }

}
