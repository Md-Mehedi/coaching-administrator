
package coaching.administrator.classes.Result;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ResultController {

    @Autowired
    private ResultService service;

    @PostMapping("/add-result")
    public Result addResult(@RequestBody Result result) {
        System.out.println("\033[31minside add result\033[0m");

        return service.saveResult(result);
    }

    @GetMapping("/get-result-by-id/{id}")
    public Result getResultById(@PathVariable Integer id) {
        return service.getResultById(id);
    }


    @DeleteMapping("/delete-result-by-id")
    public String deleteResult(@PathVariable Integer id) {
        return service.deleteResult(id);
    }
}
