package coaching.administrator.classes.ToDo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
public class ToDoController {
    @Autowired
    private ToDoRepository repository;

    private ObjectMapper mapper;

    @PostMapping("/add-toDo")
    public ToDo addToDo(@RequestBody ToDo toDo) {
        System.out.println("\033[31minside add toDo\033[0m");

        return repository.save(toDo);
    }

    @GetMapping("/get-toDo-by-id/{id}")
    public ToDo getToDoById(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/get-all-todo-by-customer/{id}")
    public List<ToDo> getAllToDoByCustomer(@PathVariable Integer id) {
        return repository.findAllToDoByCustomerId(id);
    }

    // @GetMapping("/get-all-toDos")
    // public List<ToDo> getToDos() {
    //     return repository.findAll();
    // }

    // @GetMapping("/get-toDo-by-name/{name}")
    // public ToDo getToDoByName(@PathVariable String name) {
    //     return repository.findByName(name);
    // }


    @DeleteMapping("/delete-toDo-by-id")
    public String deleteToDo(@PathVariable Integer id) {
        return "ToDo with id : " + id + " deleted";
    }

    
}
