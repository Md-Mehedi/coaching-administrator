package coaching.administrator.classes.ExamSubject;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import coaching.administrator.classes.Exam.Exam;
import coaching.administrator.classes.ExamMark.ExamMark;
import coaching.administrator.classes.Subject.Subject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "exam_subject")
public class ExamSubject implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String description;

    // @JsonManagedReference
    // @ManyToOne(optional = true, fetch = FetchType.EAGER)
    // @JoinColumn(name = "exam_id", referencedColumnName = "id")
    // private Exam exam;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", referencedColumnName = "id")
    private Subject subject;

    // bidrectional examSubject.
    // @JsonBackReference
    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinColumn(name = "exam_subject_id", referencedColumnName = "id")
    private Set<ExamMark> examMarks;

}
