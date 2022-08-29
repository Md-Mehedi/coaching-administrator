
package coaching.administrator.classes.MonthlyFees;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;

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

    @GetMapping("/get-monthlyFees")
    public List<MonthlyFees> getMonthlyFeesByCoachingId() {
        return repository.findAllByCoachingId(JwtUtils.getCoachingId());
    }

    @GetMapping("/get-monthlyFees-by-month/{month}")
    public List<MonthlyFees> getMonthlyFeesByMonth(@PathVariable String month) {
        return repository.findAllByMonth(month);
    }

    @GetMapping("/get-monthlyFees-by-dateRange/{startDate}/{endDate}")
    public List<MonthlyFees> getMonthlyFeesByDateRange(@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {
        return repository.findAllByDateRange(startDate, endDate);
    }

    @GetMapping("/get-coaching-income-by-month")
    List<Map<String, Object>> getCoachingIncomeByMonth(@RequestParam("coachingId") Integer coachingId,
            @RequestParam("yearNo") Integer yearNo) {
        return repository.findCoachingIncomeByMonth(coachingId, yearNo);
    }

    @GetMapping("/get-coaching-due-by-month")
    List<Map<String, Object>> getCoachingDueByMonth(@RequestParam("coachingId") Integer coachingId,
            @RequestParam("yearNo") Integer yearNo) {
        return repository.findCoachingDueByMonth(coachingId, yearNo);
    }

    @PutMapping("/update-monthlyFees")
    public MonthlyFees updateMonthlyFees(@RequestBody MonthlyFees monthlyFees) {
        System.out.println("\033[31minside add monthlyFees\033[0m");

        return service.saveMonthlyFees(monthlyFees);
    }

    @DeleteMapping("/delete-monthlyFees-by-id")
    public String deleteMonthlyFees(@PathVariable Integer id) {
        return service.deleteMonthlyFees(id);
    }

    @PostMapping("/pay-monthly-fees")
    public ObjectNode payMonthlyFees(@RequestBody List<Integer> monthlyFeesIds) {
        for (Integer id : monthlyFeesIds) {
            MonthlyFees fees = repository.findById(id).orElse(null);
            if (fees != null && fees.getPaymentDate() == null) {
                fees.setPaymentDate(new Date());
                repository.save(fees);
            }
        }
        return Global.createSuccessMessage("Selected fees are paid");
    }
}
