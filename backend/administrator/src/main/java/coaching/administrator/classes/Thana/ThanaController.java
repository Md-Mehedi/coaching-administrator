
package coaching.administrator.classes.Thana;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ThanaController {

    @Autowired
    private ThanaService service;

    @PostMapping("/add-thana")
    public Thana addThana(@RequestBody Thana thana) {
        System.out.println("\033[31minside add thana\033[0m");

        return service.saveThana(thana);
    }

    @GetMapping("/get-thana-by-id/{id}")
    public Thana getThanaById(@PathVariable Integer id) {
        return service.getThanaById(id);
    }

    @GetMapping("/get-thana-by-name/{name}")
    public Thana getThanaByName(@PathVariable String name) {
        return service.getThanaByName(name);
    }

    @DeleteMapping("/delete-thana-by-id")
    public String deleteThana(@PathVariable Integer id) {
        return service.deleteThana(id);
    }
}
