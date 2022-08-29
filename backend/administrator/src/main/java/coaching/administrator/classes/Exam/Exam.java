package coaching.administrator.classes.Exam;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;

import coaching.administrator.classes.ExamSubject.ExamSubject;
import coaching.administrator.classes.Program.Program;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "exam")
public class Exam implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "program_id", referencedColumnName = "id")
    private Program program;

    private Date resultDate;

    // exam subject list rakhbo - fetchType lazy
    // @JsonBackReference
    @OneToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
    @JoinColumn(name = "exam_id", referencedColumnName = "id")
    private Set<ExamSubject> examSubjects;

    // public Set<ExamSubject> getExamSubjectList() {
    // return examSubjects;
    // }
}
