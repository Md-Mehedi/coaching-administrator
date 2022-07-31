
package coaching.administrator.classes.Institution;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InstitutionController {

    @Autowired
    private InstitutionService service;

    @Autowired
    private InstitutionRepository repository;

    @PostMapping("/add-institution")
    public Institution addInstitution(@RequestBody Institution institution) {
        System.out.println("\033[31minside add institution\033[0m");

        return service.saveInstitution(institution);
    }

    @GetMapping("/get-institution-by-id/{id}")
    public Institution getInstitutionById(@PathVariable Integer id) {
        return service.getInstitutionById(id);
    }

    @GetMapping("/get-institution-by-name/{name}")
    public Institution getInstitutionByName(@PathVariable String name) {
        return service.getInstitutionByName(name);
    }

    @GetMapping("/get-all-institution-by-boardId/{id}")
    public List<Institution> getAllInstitutionByBoard(@PathVariable Integer id) {
        return repository.findByBoardId(id);
    }

    @DeleteMapping("/delete-institution-by-id")
    public String deleteInstitution(@PathVariable Integer id) {
        return service.deleteInstitution(id);
    }
}
