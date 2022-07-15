package coaching.administrator.classes.Occupation;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import coaching.administrator.classes.Person.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "occupation")
public class Occupation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @OneToMany(targetEntity = Person.class, cascade = CascadeType.ALL, mappedBy = "fatherOccupation")
    // @JoinColumn(name = "father_ocptn_id")
    private List<Person> personsFather;

    @OneToMany(targetEntity = Person.class, cascade = CascadeType.ALL, mappedBy = "motherOccupation")
    // @JoinColumn(name = "father_ocptn_id")
    private List<Person> personsMother;

}
