
package coaching.administrator.classes.Day;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DayController {

    @Autowired
    private DayService service;

    @PostMapping("/add-day")
    public Day addDay(@RequestBody Day day) {
        System.out.println("\033[31minside add day\033[0m");

        return service.saveDay(day);
    }

    @GetMapping("/get-day-by-id/{id}")
    public Day getDayById(@PathVariable Integer id) {
        return service.getDayById(id);
    }

    @GetMapping("/get-all-days")
    public List<Day> getDays() {
        return service.getDays();
    }

    @GetMapping("/get-day-by-name/{name}")
    public Day getDayByName(@PathVariable String name) {
        return service.getDayByName(name);
    }

    @DeleteMapping("/delete-day-by-id")
    public String deleteDay(@PathVariable Integer id) {
        return service.deleteDay(id);
    }
}
