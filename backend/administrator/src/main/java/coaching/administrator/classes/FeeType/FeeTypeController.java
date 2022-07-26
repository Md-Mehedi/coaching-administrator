
package coaching.administrator.classes.FeeType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeeTypeController {

    @Autowired
    private FeeTypeService service;

    @PostMapping("/add-feeType")
    public FeeType addFeeType(@RequestBody FeeType feeType) {
        System.out.println("\033[31minside add feeType\033[0m");

        return service.saveFeeType(feeType);
    }

    @GetMapping("/get-feeType-by-id/{id}")
    public FeeType getFeeTypeById(@PathVariable Integer id) {
        return service.getFeeTypeById(id);
    }

    @GetMapping("/get-all-feeTypes")
    public List<FeeType> getFeeTypes() {
        return service.getFeeTypes();
    }

    @GetMapping("/get-feeType-by-name/{name}")
    public FeeType getFeeTypeByName(@PathVariable String name) {
        return service.getFeeTypeByName(name);
    }

    @DeleteMapping("/delete-feeType-by-id")
    public String deleteFeeType(@PathVariable Integer id) {
        return service.deleteFeeType(id);
    }
}
