
package coaching.administrator.classes.MonthlyFees;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MonthlyFeesController {

    @Autowired
    private MonthlyFeesService service;

    @PostMapping("/add-monthlyFees")
    public MonthlyFees addMonthlyFees(@RequestBody MonthlyFees monthlyFees) {
        System.out.println("\033[31minside add monthlyFees\033[0m");

        return service.saveMonthlyFees(monthlyFees);
    }

    @GetMapping("/get-monthlyFees-by-id/{id}")
    public MonthlyFees getMonthlyFeesById(@PathVariable Integer id) {
        return service.getMonthlyFeesById(id);
    }


    @DeleteMapping("/delete-monthlyFees-by-id")
    public String deleteMonthlyFees(@PathVariable Integer id) {
        return service.deleteMonthlyFees(id);
    }
}
