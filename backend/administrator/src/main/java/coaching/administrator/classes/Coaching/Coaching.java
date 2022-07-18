package coaching.administrator.classes.Coaching;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Type;

import coaching.administrator.classes.Address.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "coaching")
public class Coaching {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String description;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    private String contactNo;
    @Temporal(TemporalType.TIMESTAMP)
    private Date registrationTime;
    private Integer whatsappNo;
    private String facebookLink;
    private String youtubeLink;
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] image;

}
