
package coaching.administrator.classes.Expense;

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

    @DeleteMapping("/delete-expense-by-id")
    public String deleteExpense(@PathVariable Integer id) {
        repository.deleteById(id);
        return "expense with id " + id + " deleted";
    }
}
