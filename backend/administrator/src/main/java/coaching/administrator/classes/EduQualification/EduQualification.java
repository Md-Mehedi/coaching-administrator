package coaching.administrator.classes.EduQualification;

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

import coaching.administrator.classes.Department.Department;
import coaching.administrator.classes.Exam.QualificationExam;
import coaching.administrator.classes.Institution.Institution;
import coaching.administrator.classes.Person.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "edu_qualification")
public class EduQualification implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @ManyToOne(optional = true, cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "qualification_exam_id", referencedColumnName = "id")
    private QualificationExam qualificationExam;

    // @ManyToOne(optional = true, cascade = CascadeType.ALL, fetch =
    // FetchType.LAZY)
    // // @JoinColumn(name = "person_id", referencedColumnName = "id")
    // private Person person;

    @ManyToOne(optional = true, cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "institution_id", referencedColumnName = "id")
    private Institution institution;

    private Integer passingYear;
    private String result;

    @ManyToOne(optional = true, cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id", referencedColumnName = "id")
    private Department department;

}
