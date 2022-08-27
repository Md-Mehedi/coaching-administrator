package coaching.administrator.classes.Result;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import coaching.administrator.classes.ExamMark.ExamMark;
import coaching.administrator.classes.Student.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "result")
public class Result implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Float obtainedMark;

    @Transient
    private float highestMark;

    // @JsonManagedReference
    // @ManyToOne(optional = true, fetch = FetchType.EAGER)
    // @JoinColumn(name = "exam_mark_id", referencedColumnName = "id")
    private ExamMark examMark;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", referencedColumnName = "person_id")
    private Student student;

    public void setHighestMark(float highestMark) {
        this.highestMark = highestMark;
    }

}
