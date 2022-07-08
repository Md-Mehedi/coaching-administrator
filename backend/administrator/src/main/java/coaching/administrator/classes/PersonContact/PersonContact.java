package coaching.administrator.classes.PersonContact;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "person_contact")
public class PersonContact {

    @Id
    // @GeneratedValue
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer PersonId;
    private Integer ContactTypeId;
    private String number;

    public PersonContact() {
    }

    public PersonContact(Integer id, Integer personId, Integer contactTypeId, String number) {
        this.id = id;
        PersonId = personId;
        ContactTypeId = contactTypeId;
        this.number = number;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPersonId() {
        return PersonId;
    }

    public void setPersonId(Integer personId) {
        PersonId = personId;
    }

    public Integer getContactTypeId() {
        return ContactTypeId;
    }

    public void setContactTypeId(Integer contactTypeId) {
        ContactTypeId = contactTypeId;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    
    
}
