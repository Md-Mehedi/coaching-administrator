package coaching.administrator.classes.Student;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import coaching.administrator.classes.Person.Person;

@Entity
@Table(name = "student")
public class Student extends Person{

    @Id
    // @GeneratedValue
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer personId;
    private Integer registrationNo;
    private Integer classNo;
    private Integer classRollNo;


    public Student() {
    }




    public Student(Integer id, String password, Integer permanentAdrsId, Integer presentAdrsId, Integer fatherOcptnId,
            Integer motherOcptnId, Integer religionId, String fullName, String nickName, String gender, String email,
            String fatherName, String motherName, Date dateOfBirth, Date joiningDate, String bloodGroup,
            String nationality, String personType, String activated, byte[] image, Integer personId,
            Integer registrationNo, Integer classNo, Integer classRollNo) {
        super(id, password, permanentAdrsId, presentAdrsId, fatherOcptnId, motherOcptnId, religionId, fullName,
                nickName, gender, email, fatherName, motherName, dateOfBirth, joiningDate, bloodGroup, nationality,
                personType, activated, image);
        this.personId = personId;
        this.registrationNo = registrationNo;
        this.classNo = classNo;
        this.classRollNo = classRollNo;
    }




    public Student(Integer personId, Integer registrationNo, Integer classNo, Integer classRollNo) {
        this.personId = personId;
        this.registrationNo = registrationNo;
        this.classNo = classNo;
        this.classRollNo = classRollNo;
    }




    public Integer getPersonId() {
        return personId;
    }


    public void setPersonId(Integer personId) {
        this.personId = personId;
    }


    public Integer getRegistrationNo() {
        return registrationNo;
    }


    public void setRegistrationNo(Integer registrationNo) {
        this.registrationNo = registrationNo;
    }


    public Integer getClassNo() {
        return classNo;
    }


    public void setClassNo(Integer classNo) {
        this.classNo = classNo;
    }


    public Integer getClassRollNo() {
        return classRollNo;
    }


    public void setClassRollNo(Integer classRollNo) {
        this.classRollNo = classRollNo;
    }


}
