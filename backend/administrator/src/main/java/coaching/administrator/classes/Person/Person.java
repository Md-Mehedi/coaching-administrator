package coaching.administrator.classes.Person;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.FetchMode;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.Type;

import coaching.administrator.classes.Address.Address;
import coaching.administrator.classes.Coaching.Coaching;
import coaching.administrator.classes.EduQualification.EduQualification;
import coaching.administrator.classes.Occupation.Occupation;
import coaching.administrator.classes.PersonContact.PersonContact;
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

    @OneToOne(fetch = FetchType.EAGER, optional = true)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "permanent_adrs_id", referencedColumnName = "id")
    private Address permanentAddress;

    @OneToOne(fetch = FetchType.EAGER, optional = true)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "present_adrs_id", referencedColumnName = "id")
    private Address presentAddress;

    @ManyToOne(fetch = FetchType.EAGER)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "father_ocptn_id", referencedColumnName = "id")
    private Occupation fatherOccupation;

    @ManyToOne(fetch = FetchType.EAGER)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "mother_ocptn_id", referencedColumnName = "id")
    private Occupation motherOccupation;

    @ManyToOne(fetch = FetchType.EAGER)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "religion_id", referencedColumnName = "id")
    private Religion religion;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "coaching_id", referencedColumnName = "id")
    private Coaching coaching;

    @OneToMany(fetch = FetchType.EAGER)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Set<EduQualification> eduQualifications;

    @OneToMany(fetch = FetchType.EAGER, orphanRemoval = true)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Set<PersonContact> contacts;

    @OneToOne(fetch = FetchType.EAGER, optional = true)
    @Cascade(CascadeType.ALL)
    @JoinColumn(name = "current_qualification_id", referencedColumnName = "id")
    private EduQualification currentQualification;

    private String fullName;
    private String nickName;
    private String gender;
    private String email;
    private String fatherName;
    private String motherName;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateOfBirth;

    @Temporal(TemporalType.TIMESTAMP)
    private Date joiningDate;
    private String bloodGroup;

    private String nationality;
    private String personType;
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] image;

}
