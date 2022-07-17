
package coaching.administrator.classes.District;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DistrictController {

    @Autowired
    private DistrictService service;

    @PostMapping("/add-district")
    public District addDistrict(@RequestBody District district) {
        System.out.println("\033[31minside add district\033[0m");

        return service.saveDistrict(district);
    }

    @GetMapping("/get-district-by-id/{id}")
    public District getDistrictById(@PathVariable Integer id) {
        return service.getDistrictById(id);
    }

    @GetMapping("/get-district-by-name/{name}")
    public District getDistrictByName(@PathVariable String name) {
        return service.getDistrictByName(name);
    }

    @GetMapping("/get-all-district-by-division-id/{id}")
    public List<District> getDistrictByDivision(@PathVariable Integer id) {
        return service.getDistrictByDivision(id);
    }

    @DeleteMapping("/delete-district-by-id")
    public String deleteDistrict(@PathVariable Integer id) {
        return service.deleteDistrict(id);
    }
}
