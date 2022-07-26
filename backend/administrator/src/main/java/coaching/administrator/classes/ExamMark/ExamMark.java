package coaching.administrator.classes.ExamMark;

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

import coaching.administrator.classes.ExamSubject.ExamSubject;
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
    private String exam_type;
    private float mark;

    @ManyToOne(optional = true, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "exam_subject_id", referencedColumnName = "id")
    private ExamSubject examSubject;


    // @OneToMany(targetEntity = Address.class, cascade = CascadeType.ALL, mappedBy
    // = "thana")
    // private List<Thana> thanas;

}
