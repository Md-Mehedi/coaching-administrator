
package coaching.administrator.classes.Religion;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReligionController {

    @Autowired
    private ReligionService service;
    @Autowired
    private ReligionRepository repository;

    @PostMapping("/add-religion")
    public Religion addReligion(@RequestBody Religion religion) {
        System.out.println("\033[31minside add religion\033[0m");

        return service.saveReligion(religion);
    }

    @GetMapping("/get-religion-by-id/{id}")
    public Religion getReligionById(@PathVariable Integer id) {
        return service.getReligionById(id);
    }

    @GetMapping("/get-religion-by-name/{name}")
    public Religion getReligionByName(@PathVariable String name) {
        return service.getReligionByName(name);
    }

    @GetMapping("/get-all-religion")
    public List<Religion> getAllReligion() {
        return repository.findAll();
    }

    @PutMapping("/update-religion")
    public Religion updateReligion(@RequestBody Religion religion) {
        return repository.save(religion);
    }

    @DeleteMapping("/delete-religion-by-id")
    public String deleteReligion(@PathVariable Integer id) {
        return service.deleteReligion(id);
    }
}
