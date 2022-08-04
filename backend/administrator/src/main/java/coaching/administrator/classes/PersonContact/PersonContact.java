package coaching.administrator.classes.PersonContact;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import coaching.administrator.classes.ContactType.ContactType;
import coaching.administrator.classes.Person.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "person_contact")
public class PersonContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional =
    // true)
    // // @JoinColumn(name = "person_id", referencedColumnName = "id")
    // private Person person;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @Cascade({ CascadeType.SAVE_UPDATE })
    @JoinColumn(name = "contact_type_id", referencedColumnName = "id")
    private ContactType contactType;

    private String number;

}
