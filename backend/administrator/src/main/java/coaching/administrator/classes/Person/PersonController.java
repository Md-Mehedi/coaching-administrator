
package coaching.administrator.classes.Person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    @Autowired
    private PersonService service;

    @PostMapping("/add-person")
    public Person addPerson(@RequestBody Person person) {
        System.out.println("\033[31minside add person\033[0m");

        return service.savePerson(person);
    }

    @GetMapping("/get-person-by-id/{id}")
    public Person getPersonById(@PathVariable Integer id) {
        return service.getPersonById(id);
    }

    @GetMapping("/helloworld")
    public String helloWorld() {
        System.out.println("\033[31minside spring boot hello world.\033[0m");
        return "Hello Spring Boot";
    }

    @GetMapping("/get-person-by-full-name/{name}")
    public Person getPersonByFullName(@PathVariable String name) {
        return service.getPersonByFullName(name);
    }

    @PutMapping("/update-person-by-id")
    public Person updatePerson(@RequestBody Person person) {
        return service.updatePerson(person);
    }
}
