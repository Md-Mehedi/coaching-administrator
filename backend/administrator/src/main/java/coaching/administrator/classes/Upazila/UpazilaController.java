
package coaching.administrator.classes.Upazila;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpazilaController {

    @Autowired
    private UpazilaService service;

    @PostMapping("/add-thana")
    public Upazila addThana(@RequestBody Upazila thana) {
        System.out.println("\033[31minside add thana\033[0m");

        return service.saveThana(thana);
    }

    @GetMapping("/get-thana-by-id/{id}")
    public Upazila getThanaById(@PathVariable Integer id) {
        return service.getThanaById(id);
    }

    @GetMapping("/get-thana-by-name/{name}")
    public Upazila getThanaByName(@PathVariable String name) {
        return service.getThanaByName(name);
    }

    @GetMapping("/get-all-upazila-by-district-id/{id}")
    public List<Upazila> getUpazilaByDistrict(@PathVariable Integer id) {
        List<Upazila> list = service.getUpazilaByDistrict(id);
        System.out.println("District id " + id + " " + list.size());
        return list;
    }

    @DeleteMapping("/delete-thana-by-id")
    public String deleteThana(@PathVariable Integer id) {
        return service.deleteThana(id);
    }
}
