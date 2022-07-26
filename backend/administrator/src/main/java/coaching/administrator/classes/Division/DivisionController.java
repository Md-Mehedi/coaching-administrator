
package coaching.administrator.classes.Division;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class DivisionController {

    @Autowired
    private DivisionService service;

    @Autowired
    private DivisionRepository repository;

    private ObjectMapper mapper;

    @PostMapping("/add-division")
    public Division addDivision(@RequestBody Division division) {
        System.out.println("\033[31minside add division\033[0m");

        return service.saveDivision(division);
    }

    @GetMapping("/get-division-by-id/{id}")
    public Division getDivisionById(@PathVariable Integer id) {
        return service.getDivisionById(id);
    }

    @GetMapping("/get-all-divisions")
    public List<Division> getDivisions() {
        return service.getDivisions();
    }

    @GetMapping("/get-division-by-name/{name}")
    public Division getDivisionByName(@PathVariable String name) {
        return service.getDivisionByName(name);
    }

    @GetMapping("/get-district-count-by-division")
    public List<Map<String, Object>> getDistrictCountByDivision() {
        List<Map<String, Object>> objects = repository.countByDivision();
        // List<ObjectNode> nodes;
        // for(Object object : objects)
        // {
        // ObjectNode node = mapper.createObjectNode();
        // node.put("division name",object.getClass().);
        // nodes.add()
        // }
        return objects;
    }

    @DeleteMapping("/delete-division-by-id")
    public String deleteDivision(@PathVariable Integer id) {
        return service.deleteDivision(id);
    }
}
