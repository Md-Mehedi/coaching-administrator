
package coaching.administrator.classes.Payment;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @Autowired
    private PaymentService service;

    @PostMapping("/add-payment")
    public Payment addPayment(@RequestBody Payment payment) {
        System.out.println("\033[31minside add payment\033[0m");

        return service.savePayment(payment);
    }

    @GetMapping("/get-payment-by-id/{id}")
    public Payment getPaymentById(@PathVariable Integer id) {
        return service.getPaymentById(id);
    }


    @DeleteMapping("/delete-payment-by-id")
    public String deletePayment(@PathVariable Integer id) {
        return service.deletePayment(id);
    }
}
