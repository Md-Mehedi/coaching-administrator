
package coaching.administrator.classes.Department;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DepartmentController {

  @Autowired
  private DepartmentRepository repository;

  // @PostMapping("/add-department")
  // public Department addDepartment(@RequestBody Department department) {
  // System.out.println("\033[31minside add department\033[0m");

  // return service.saveDepartment(department);
  // }

  // @GetMapping("/get-department-by-id/{id}")
  // public Department getDepartmentById(@PathVariable Integer id) {
  // return service.getDepartmentById(id);
  // }

  // @GetMapping("/get-department-by-name/{name}")
  // public Department getDepartmentByName(@PathVariable String name) {
  // return service.getDepartmentByName(name);
  // }

  // @DeleteMapping("/delete-department-by-id")
  // public String deleteDepartment(@PathVariable Integer id) {
  // return service.deleteDepartment(id);
  // }

  // @GetMapping("/get-all-department")
  // public List<Department> deleteDepartment() {
  // return service.getAllDepartment();
  // }

  @GetMapping("/get-all-department")
  public List<Department> getAllDepartment() {
    return repository.findAll();
  }
}
