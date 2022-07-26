package coaching.administrator.classes.MonthlyFees;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MonthlyFeesService {

    @Autowired
    private MonthlyFeesRepository repository;

    public MonthlyFees saveMonthlyFees(MonthlyFees monthlyFees) {
        return repository.save(monthlyFees);
    }

    public MonthlyFees getMonthlyFeesById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteMonthlyFees(Integer id) {
        repository.deleteById(id);
        return "MonthlyFees with id : " + id + " deleted";
    }

}