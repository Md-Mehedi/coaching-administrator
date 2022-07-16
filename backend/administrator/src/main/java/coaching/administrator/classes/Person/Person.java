package coaching.administrator.classes.Person;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import coaching.administrator.classes.Address.Address;
import coaching.administrator.classes.Coaching.Coaching;
import coaching.administrator.classes.Occupation.Occupation;
import coaching.administrator.classes.Religion.Religion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "person")
public class Person implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id;
    private String password;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "permanent_adrs_id", referencedColumnName = "id")
    private Address permanentAddresss;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "present_adrs_id", referencedColumnName = "id")
    private Address presentAddress;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "father_ocptn_id", referencedColumnName = "id")
    private Occupation fatherOccupation;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "mother_ocptn_id", referencedColumnName = "id")
    private Occupation motherOccupation;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "religion_id", referencedColumnName = "id")
    private Religion religion;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "coaching_id", referencedColumnName = "id")
    private Coaching coaching;

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
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] image;

}