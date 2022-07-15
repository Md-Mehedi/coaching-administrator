package coaching.administrator.classes.Student;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import coaching.administrator.classes.Person.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "student")
public class Student extends Person {

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    private Integer registrationNo;
    private Integer classNo;
    private Integer classRollNo;

}
