package coaching.administrator.classes.TeacherPaymentOwed;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import coaching.administrator.classes.TeacherPayment.TeacherPayment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "teacher_payment_owed")
public class TeacherPaymentOwed {

    @Id
    private Integer id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "teacher_payment_id", referencedColumnName = "id")
    private TeacherPayment teacherPayment;

    @Temporal(TemporalType.TIMESTAMP)
    private Date owedDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date withdrawalDate;

}
