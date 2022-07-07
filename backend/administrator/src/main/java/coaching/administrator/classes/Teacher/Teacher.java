package coaching.administrator.classes.Teacher;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import coaching.administrator.classes.Person.Person;

@Entity
@Table(name = "teacher")
public class Teacher extends Person{

    @Id
    // @GeneratedValue
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer personId;
    private Float salary;


    public Teacher() {
    }


    public Teacher(Integer id, String password, Integer permanentAdrsId, Integer presentAdrsId, Integer fatherOcptnId,
            Integer motherOcptnId, Integer religionId, String fullName, String nickName, String gender, String email,
            String fatherName, String motherName, Date dateOfBirth, Date joiningDate, String bloodGroup,
            String nationality, String personType, String activated, byte[] image, Integer personId, Float salary) {
        super(id, password, permanentAdrsId, presentAdrsId, fatherOcptnId, motherOcptnId, religionId, fullName,
                nickName, gender, email, fatherName, motherName, dateOfBirth, joiningDate, bloodGroup, nationality,
                personType, activated, image);
        this.personId = personId;
        this.salary = salary;
    }


    public Teacher(Integer personId, Float salary) {
        this.personId = personId;
        this.salary = salary;
    }


    public Integer getPersonId() {
        return personId;
    }


    public void setPersonId(Integer personId) {
        this.personId = personId;
    }


    public Float getSalary() {
        return salary;
    }


    public void setSalary(Float salary) {
        this.salary = salary;
    }


}
