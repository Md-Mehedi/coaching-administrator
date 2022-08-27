package coaching.administrator.classes.ExamMark;

import java.io.Serializable;
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
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import coaching.administrator.classes.ExamSubject.ExamSubject;
import coaching.administrator.classes.Result.Result;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "exam_mark")
public class ExamMark implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String examType;
    private float examSubjectMark;

    // @JsonManagedReference
    // @ManyToOne(optional = true, fetch = FetchType.EAGER)
    // @JoinColumn(name = "exam_subject_id", referencedColumnName = "id")
    // private ExamSubject examSubject;

    // add a derived column that is not in the database . Derived column is a column
    // that is not in the database but is calculated from other columns.
    // @JsonBackReference
    // @OneToMany(mappedBy = "examMark", cascade = { CascadeType.ALL }, fetc //
    // FetchType.LAZY)
    // private Set<Result> resultList;

    // public Set<Result> getResultList(
    // return resultList;
    // }
}
