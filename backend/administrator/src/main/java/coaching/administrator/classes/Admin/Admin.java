package coaching.administrator.classes.Admin;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import coaching.administrator.classes.Person.Person;

@Entity
@Table(name = "admin")
public class Admin extends Person{

    @Id
    // @GeneratedValue
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer personId;


    public Admin() {
    }



    public Admin(Integer id, String password, Integer permanentAdrsId, Integer presentAdrsId, Integer fatherOcptnId,
            Integer motherOcptnId, Integer religionId, String fullName, String nickName, String gender, String email,
            String fatherName, String motherName, Date dateOfBirth, Date joiningDate, String bloodGroup,
            String nationality, String personType, String activated, byte[] image) {
        super(id, password, permanentAdrsId, presentAdrsId, fatherOcptnId, motherOcptnId, religionId, fullName,
                nickName, gender, email, fatherName, motherName, dateOfBirth, joiningDate, bloodGroup, nationality,
                personType, activated, image);
    }



    public Integer getPersonId() {
        return personId;
    }



    public void setPersonId(Integer personId) {
        this.personId = personId;
    }

    

    

}
