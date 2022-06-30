package coaching.administrator.classes.Person;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "person")
public class Person {

    @Id
    @GeneratedValue
    private Integer id;
    private Integer permanent_adrs_id;
    private Integer present_adrs_id;
    private Integer father_ocptn_id;
    private Integer mother_ocptn_id;
    private Integer religion_id;
    private String fullName;
    private String nick_name;
    private String gender;
    private String email;
    private String father_name;
    private String mother_name;
    private Date date_of_birth;
    private Date joining_date;
    private String blood_group;
    private String nationality;
    private String person_type;

    public Person(Integer id, Integer permanent_adrs_id, Integer present_adrs_id, Integer father_ocptn_id,
            Integer mother_ocptn_id, Integer religion_id, String fullName, String nick_name, String gender,
            String email, String father_name, String mother_name, Date date_of_birth, Date joining_date,
            String blood_group, String nationality, String person_type) {
        this.id = id;
        this.permanent_adrs_id = permanent_adrs_id;
        this.present_adrs_id = present_adrs_id;
        this.father_ocptn_id = father_ocptn_id;
        this.mother_ocptn_id = mother_ocptn_id;
        this.religion_id = religion_id;
        this.fullName = fullName;
        this.nick_name = nick_name;
        this.gender = gender;
        this.email = email;
        this.father_name = father_name;
        this.mother_name = mother_name;
        this.date_of_birth = date_of_birth;
        this.joining_date = joining_date;
        this.blood_group = blood_group;
        this.nationality = nationality;
        this.person_type = person_type;
    }

    public Person() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPermanent_adrs_id() {
        return permanent_adrs_id;
    }

    public void setPermanent_adrs_id(Integer permanent_adrs_id) {
        this.permanent_adrs_id = permanent_adrs_id;
    }

    public Integer getPresent_adrs_id() {
        return present_adrs_id;
    }

    public void setPresent_adrs_id(Integer present_adrs_id) {
        this.present_adrs_id = present_adrs_id;
    }

    public Integer getFather_ocptn_id() {
        return father_ocptn_id;
    }

    public void setFather_ocptn_id(Integer father_ocptn_id) {
        this.father_ocptn_id = father_ocptn_id;
    }

    public Integer getMother_ocptn_id() {
        return mother_ocptn_id;
    }

    public void setMother_ocptn_id(Integer mother_ocptn_id) {
        this.mother_ocptn_id = mother_ocptn_id;
    }

    public Integer getReligion_id() {
        return religion_id;
    }

    public void setReligion_id(Integer religion_id) {
        this.religion_id = religion_id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String full_name) {
        this.fullName = full_name;
    }

    public String getNick_name() {
        return nick_name;
    }

    public void setNick_name(String nick_name) {
        this.nick_name = nick_name;
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

    public String getFather_name() {
        return father_name;
    }

    public void setFather_name(String father_name) {
        this.father_name = father_name;
    }

    public String getMother_name() {
        return mother_name;
    }

    public void setMother_name(String mother_name) {
        this.mother_name = mother_name;
    }

    public Date getDate_of_birth() {
        return date_of_birth;
    }

    public void setDate_of_birth(Date date_of_birth) {
        this.date_of_birth = date_of_birth;
    }

    public Date getJoining_date() {
        return joining_date;
    }

    public void setJoining_date(Date joining_date) {
        this.joining_date = joining_date;
    }

    public String getBlood_group() {
        return blood_group;
    }

    public void setBlood_group(String blood_group) {
        this.blood_group = blood_group;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getPerson_type() {
        return person_type;
    }

    public void setPerson_type(String person_type) {
        this.person_type = person_type;
    }

}
