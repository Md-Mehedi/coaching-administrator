
package coaching.administrator.classes.Occupation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OccupationController {

    @Autowired
    private OccupationService service;

    @Autowired
    private OccupationRepository repository;

    @PostMapping("/add-occupation")
    public Occupation addOccupation(@RequestBody Occupation occupation) {
        System.out.println("\033[31minside add occupation\033[0m");

        return service.saveOccupation(occupation);
    }

    @GetMapping("/get-occupation-by-id/{id}")
    public Occupation getOccupationById(@PathVariable Integer id) {
        return service.getOccupationById(id);
    }

    @GetMapping("/get-occupation-by-name/{name}")
    public Occupation getOccupationByName(@PathVariable String name) {
        return service.getOccupationByName(name);
    }

    @GetMapping("/get-all-occupation")
    public List<Occupation> getAllOccupation() {
        return repository.findAll();
    }

    @DeleteMapping("/delete-occupation-by-id")
    public String deleteOccupation(@PathVariable Integer id) {
        return service.deleteOccupation(id);
    }
}
