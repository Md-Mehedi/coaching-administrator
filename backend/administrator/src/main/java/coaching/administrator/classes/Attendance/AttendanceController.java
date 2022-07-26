
package coaching.administrator.classes.Attendance;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @PostMapping("/add-attendance")
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        System.out.println("\033[31minside add attendance\033[0m");

        return service.saveAttendance(attendance);
    }

    @GetMapping("/get-attendance-by-id/{id}")
    public Attendance getAttendanceById(@PathVariable Integer id) {
        return service.getAttendanceById(id);
    }


    @DeleteMapping("/delete-attendance-by-id")
    public String deleteAttendance(@PathVariable Integer id) {
        return service.deleteAttendance(id);
    }
}
