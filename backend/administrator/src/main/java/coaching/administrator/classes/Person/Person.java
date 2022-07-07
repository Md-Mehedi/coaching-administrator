package coaching.administrator.classes.Person;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String password;
    private Integer permanentAdrsId;
    private Integer presentAdrsId;
    private Integer fatherOcptnId;
    private Integer motherOcptnId;
    private Integer religionId;
    private String fullName;
    private String nickName;
    private String gender;
    private String email;
    private String fatherName;
    private String motherName;
    private Date dateOfBirth;
    private Date joiningDate;
    private String bloodGroup;
    private String nationality;
    private String personType;
    private String activated;
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] image;

    public Person() {
    }

    public Person(Integer id, String password, Integer permanentAdrsId, Integer presentAdrsId, Integer fatherOcptnId,
            Integer motherOcptnId, Integer religionId, String fullName, String nickName, String gender, String email,
            String fatherName, String motherName, Date dateOfBirth, Date joiningDate, String bloodGroup,
            String nationality, String personType, String activated, byte[] image) {
        this.id = id;
        this.password = password;
        this.permanentAdrsId = permanentAdrsId;
        this.presentAdrsId = presentAdrsId;
        this.fatherOcptnId = fatherOcptnId;
        this.motherOcptnId = motherOcptnId;
        this.religionId = religionId;
        this.fullName = fullName;
        this.nickName = nickName;
        this.gender = gender;
        this.email = email;
        this.fatherName = fatherName;
        this.motherName = motherName;
        this.dateOfBirth = dateOfBirth;
        this.joiningDate = joiningDate;
        this.bloodGroup = bloodGroup;
        this.nationality = nationality;
        this.personType = personType;
        this.activated = activated;
        this.image = image;
    }

    public byte[] getImage() {
        return image;
    }

    public String getActivated() {
        return activated;
    }

    public void setActivated(String activated) {
        this.activated = activated;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getPermanentAdrsId() {
        return permanentAdrsId;
    }

    public void setPermanentAdrsId(Integer permanentAdrsId) {
        this.permanentAdrsId = permanentAdrsId;
    }

    public Integer getPresentAdrsId() {
        return presentAdrsId;
    }

    public void setPresentAdrsId(Integer presentAdrsId) {
        this.presentAdrsId = presentAdrsId;
    }

    public Integer getFatherOcptnId() {
        return fatherOcptnId;
    }

    public void setFatherOcptnId(Integer fatherOcptnId) {
        this.fatherOcptnId = fatherOcptnId;
    }

    public Integer getMotherOcptnId() {
        return motherOcptnId;
    }

    public void setMotherOcptnId(Integer motherOcptnId) {
        this.motherOcptnId = motherOcptnId;
    }

    public Integer getReligionId() {
        return religionId;
    }

    public void setReligionId(Integer religionId) {
        this.religionId = religionId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFatherName() {
        return fatherName;
    }

    public void setFatherName(String fatherName) {
        this.fatherName = fatherName;
    }

    public String getMotherName() {
        return motherName;
    }

    public void setMotherName(String motherName) {
        this.motherName = motherName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Date getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(Date joiningDate) {
        this.joiningDate = joiningDate;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getPersonType() {
        return personType;
    }

    public void setPersonType(String personType) {
        this.personType = personType;
    }

}