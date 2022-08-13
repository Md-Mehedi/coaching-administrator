package coaching.administrator.classes.Expense;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;

@Service
public class ExpenseService {

    @Autowired
    public ExpenseRepository repository;

    public ObjectNode saveExpense(Expense expense) {
        if(expense.getExpenseDate() == null) {
            expense.setExpenseDate(new Date());
        }
        repository.save(expense);
        return Global.createSuccessMessage("Expense save successfully");
    }

    public ObjectNode updateExpense(Expense expense)
    {
        repository.save(expense);
        return Global.createSuccessMessage("Expense update successfully");
    }

    public Expense getExpenseById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public List<Expense> getExpenses() {
        return repository.findAll();
    }

    public ObjectNode deleteExpense(Integer id) {
        repository.deleteById(id);
        return Global.createSuccessMessage("Expense delete successfully");
    }
    
}
