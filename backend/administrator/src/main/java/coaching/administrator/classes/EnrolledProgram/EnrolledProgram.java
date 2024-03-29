package coaching.administrator.classes.EnrolledProgram;

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

import coaching.administrator.classes.Program.Program;
import coaching.administrator.classes.Student.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "enrolled_program")
public class EnrolledProgram implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(TemporalType.TIMESTAMP)
    private Date enrolledDate = new Date();

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "program_id", referencedColumnName = "id")
    private Program program;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", referencedColumnName = "person_id")
    private Student student;
}
