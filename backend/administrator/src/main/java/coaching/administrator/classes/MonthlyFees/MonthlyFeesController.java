
package coaching.administrator.classes.MonthlyFees;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

    @Autowired
    private MonthlyFeesRepository repository;

    @PostMapping("/add-monthlyFees")
    public MonthlyFees addMonthlyFees(@RequestBody MonthlyFees monthlyFees) {
        System.out.println("\033[31minside add monthlyFees\033[0m");

        return service.saveMonthlyFees(monthlyFees);
    }

    @GetMapping("/get-monthlyFees-by-id/{id}")
    public MonthlyFees getMonthlyFeesById(@PathVariable Integer id) {
        return service.getMonthlyFeesById(id);
    }

    @GetMapping("/get-monthlyFees-by-studentId/{id}")
    public List<MonthlyFees> getMonthlyFeesByStudentId(@PathVariable Integer id) {
        return repository.findAllByStudentId(id);
    }

    @GetMapping("/get-monthlyFees-by-batchId/{id}")
    public List<MonthlyFees> getMonthlyFeesByBatchId(@PathVariable Integer id) {
        return repository.findAllByBatchId(id);
    }

    @GetMapping("/get-monthlyFees-by-coachingId/{id}")
    public List<MonthlyFees> getMonthlyFeesByCoachingId(@PathVariable Integer id) {
        return repository.findAllByCoachingId(id);
    }

    @GetMapping("/get-monthlyFees-by-month/{month}")
    public List<MonthlyFees> getMonthlyFeesByMonth(@PathVariable String month) {
        return repository.findAllByMonth(month);
    }

    @GetMapping("/get-monthlyFees-by-dateRange/{startDate}/{endDate}")
    public List<MonthlyFees> getMonthlyFeesByDateRange(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate, @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return repository.findAllByDateRange(startDate, endDate);
    }

    @DeleteMapping("/delete-monthlyFees-by-id")
    public String deleteMonthlyFees(@PathVariable Integer id) {
        return service.deleteMonthlyFees(id);
    }
}
