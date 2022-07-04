
package coaching.administrator.classes.Division;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DivisionController {

    @Autowired
    private DivisionService service;

    @PostMapping("/add-division")
    public Division addDivision(@RequestBody Division division) {
        System.out.println("\033[31minside add division\033[0m");

        return service.saveDivision(division);
    }

    @GetMapping("/get-division-by-id/{id}")
    public Division getDivisionById(@PathVariable Integer id) {
        return service.getDivisionById(id);
    }

    @GetMapping("/get-division-by-name/{name}")
    public Division getDivisionByName(@PathVariable String name) {
        return service.getDivisionByName(name);
    }

    @DeleteMapping("/delete-division-by-id")
    public String deleteDivision(@PathVariable Integer id) {
        return service.deleteDivision(id);
    }
}
