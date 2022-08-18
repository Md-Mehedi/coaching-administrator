package coaching.administrator.classes.StudentBatch;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import coaching.administrator.classes.Batch.Batch;
import coaching.administrator.classes.Student.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "student_batch")
public class StudentBatch implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date startDate;

    // @Temporal(TemporalType.TIMESTAMP)
    // private Date endDate;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "batch_id", referencedColumnName = "id")
    private Batch batch;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", referencedColumnName = "person_id")
    private Student student;
}
