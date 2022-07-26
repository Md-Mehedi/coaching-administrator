
package coaching.administrator.classes.Fees;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeesController {

    @Autowired
    private FeesService service;

    @PostMapping("/add-fees")
    public Fees addFees(@RequestBody Fees fees) {
        System.out.println("\033[31minside add fees\033[0m");

        return service.saveFees(fees);
    }

    @GetMapping("/get-fees-by-id/{id}")
    public Fees getFeesById(@PathVariable Integer id) {
        return service.getFeesById(id);
    }


    @DeleteMapping("/delete-fees-by-id")
    public String deleteFees(@PathVariable Integer id) {
        return service.deleteFees(id);
    }
}
