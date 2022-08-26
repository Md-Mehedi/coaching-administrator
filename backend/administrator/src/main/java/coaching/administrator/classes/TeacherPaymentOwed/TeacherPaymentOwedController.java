
package coaching.administrator.classes.TeacherPaymentOwed;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;

@RestController
public class TeacherPaymentOwedController {

    @Autowired
    private TeacherPaymentOwedRepository repository;

    // @PostMapping("/add-teacher-payment-owed")
    // public TeacherPaymentOwed addTeacherPaymentOwed(@RequestBody
    // TeacherPaymentOwed teacherPaymentOwed) {
    // return repository.save(teacherPaymentOwed);
    // }

    // @GetMapping("/get-teacher-payment-owed-by-id/{id}")
    // public TeacherPaymentOwed getTeacherPaymentOwedById(@PathVariable Integer id)
    // {
    // return repository.findById(id).orElse(null);
    // }

    // @GetMapping("/helloworld")
    // public String helloWorld() {
    // System.out.println("\033[31minside spring boot hello world.\033[0m");
    // return "Hello Spring Boot";
    // }

    // @PutMapping("/update-teacher-payment-owed")
    // public TeacherPaymentOwed updateTeacherPayment(@RequestBody
    // TeacherPaymentOwed teacherPaymentOwed) {
    // return repository.save(teacherPaymentOwed);
    // }

    // @DeleteMapping("/delete-teacher-payment-owed-by-id/{id}")
    // public String deleteTeacherPaymentOwed(@PathVariable Integer id) {
    // repository.deleteById(id);
    // return "teacher payment owed with id " + id + " successfully deleted";
    // }

    @GetMapping("/get-all-teacher-payment-owed-by-teacher-id/{teacherId}")
    public List<TeacherPaymentOwed> getAllPaymentByTeacherId(@PathVariable Integer teacherId) {
        return repository.findAllByTeacherId(teacherId);
    }

    @GetMapping("/withdraw-teacher-payment-owed-by-id/{id}")
    public ObjectNode withdrawTeacherPaymentOwed(@PathVariable Integer id) {
        TeacherPaymentOwed tpw = repository.findById(id).orElse(null);
        tpw.setWithdrawalDate(new Date());
        repository.save(tpw);
        return Global.createSuccessMessage("Payment withdrawn successfully");
    }

    @GetMapping("/withdraw-all-teacher-payment-owed-by-teacherId/{teacherId}")
    public ObjectNode withdrawAllTeacherPaymentOwed(@PathVariable Integer teacherId) {
        repository.withdrawAllTeacherPaymentOwed(teacherId);
        return Global.createSuccessMessage("All payments are withdrawn successfully");
    }
}
