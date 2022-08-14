
package coaching.administrator.classes.Expense;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-expense")
    public ObjectNode addExpense(@RequestBody Expense expense) {
        expense.setCoaching(coachingService.getCoachingById(JwtUtils.getCoachingId()));
        return service.saveExpense(expense);
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PutMapping("/update-expense")
    public ObjectNode update(@RequestBody Expense expense) {
        Expense fetchedExpense = service.getExpenseById(expense.getId());
        if (fetchedExpense == null) {
            return Global.createErrorMessage("Expense not found");
        }
        if (fetchedExpense.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.updateExpense(expense);
        }
        return Global.createErrorMessage("Not authorized to update expense");
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-expense-by-id/{id}")
    public ObjectNode getExpenseById(@PathVariable Integer id) {
        Expense fetchedExpense = service.getExpenseById(id);
        if (fetchedExpense == null) {
            return Global.createErrorMessage("Expense not found");
        }
        if (fetchedExpense.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Expense found")
                    .putPOJO("object", fetchedExpense);
        }
        return Global.createErrorMessage("Not authorized to get expense");
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-expenses")
    public List<Expense> getExpenses() {
        return repository.findByCoachingIdOrderByExpenseDateDesc(JwtUtils.getCoachingId());
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-expense-by-coaching-id-month-year/{month}/{year}")
    public List<Expense> getExpenseByCoachingIdMonthYear(@PathVariable Integer month, @PathVariable Integer year) {
        // Global.colorPrint(JwtUtils.getCoachingId() + " " + month + " " + year);
        return repository.findByCoachingIdMonthYear(JwtUtils.getCoachingId(),
                month < 10 ? "0" + month.toString() : month.toString(), year.toString());
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-expense-by-id/{id}")
    public ObjectNode deleteExpense(@PathVariable Integer id) {
        Expense fetchedExpense = service.getExpenseById(id);
        if (fetchedExpense == null) {
            return Global.createErrorMessage("Expense not found");
        }
        if (fetchedExpense.getCoaching().getId() == JwtUtils.getCoachingId()) {
            repository.delete(fetchedExpense);
            return Global.createSuccessMessage("Expense deleted");
        }
        return Global.createErrorMessage("Not authorized to delete expense");
    }
}
