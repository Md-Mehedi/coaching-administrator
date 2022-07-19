
package coaching.administrator.classes.ClassType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClassTypeController {

    @Autowired
    private ClassTypeService service;

    @PostMapping("/add-classType")
    public ClassType addClassType(@RequestBody ClassType classType) {
        System.out.println("\033[31minside add classType\033[0m");

        return service.saveClassType(classType);
    }

    @GetMapping("/get-classType-by-id/{id}")
    public ClassType getClassTypeById(@PathVariable Integer id) {
        return service.getClassTypeById(id);
    }

    @GetMapping("/get-all-classTypes")
    public List<ClassType> getClassTypes() {
        return service.getClassTypes();
    }

    @GetMapping("/get-classType-by-name/{name}")
    public ClassType getClassTypeByName(@PathVariable String name) {
        return service.getClassTypeByName(name);
    }

    @DeleteMapping("/delete-classType-by-id")
    public String deleteClassType(@PathVariable Integer id) {
        return service.deleteClassType(id);
    }
}
