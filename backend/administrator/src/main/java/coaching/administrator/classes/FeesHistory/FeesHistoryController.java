
package coaching.administrator.classes.FeesHistory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeesHistoryController {

    @Autowired
    private FeesHistoryService service;

    @PostMapping("/add-feesHistory")
    public FeesHistory addFeesHistory(@RequestBody FeesHistory feesHistory) {
        System.out.println("\033[31minside add feesHistory\033[0m");

        return service.saveFeesHistory(feesHistory);
    }

    @GetMapping("/get-feesHistory-by-id/{id}")
    public FeesHistory getFeesHistoryById(@PathVariable Integer id) {
        return service.getFeesHistoryById(id);
    }


    @DeleteMapping("/delete-feesHistory-by-id")
    public String deleteFeesHistory(@PathVariable Integer id) {
        return service.deleteFeesHistory(id);
    }
}
