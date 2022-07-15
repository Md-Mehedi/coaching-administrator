package coaching.administrator.classes.Religion;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import coaching.administrator.classes.Person.Person;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
// @NoArgsConstructor
@Getter
@Setter
@Table(name = "religion")
public class Religion implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @OneToMany(targetEntity = Person.class, cascade = CascadeType.ALL, mappedBy = "religion")
    // @JoinColumn(name = "religion_id")
    private List<Person> persons;

    public Religion() {

    }

}
