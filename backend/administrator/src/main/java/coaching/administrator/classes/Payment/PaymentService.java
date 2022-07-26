package coaching.administrator.classes.Payment;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repository;

    public Payment savePayment(Payment payment) {
        return repository.save(payment);
    }

    public Payment getPaymentById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deletePayment(Integer id) {
        repository.deleteById(id);
        return "Payment with id : " + id + " deleted";
    }

}