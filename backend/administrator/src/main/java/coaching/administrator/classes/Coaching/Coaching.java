package coaching.administrator.classes.Coaching;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "coaching")
public class Coaching {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String description;
    private Integer addressId;
    private Integer contactNo;
    private Date registrationTime;
    private Integer whatsappNo;
    private String facebookLink;
    private String youtubeLink;
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] image;

    public Coaching() {
    }

    public Coaching(Integer id, String name, String email, String description, Integer addressId, Integer contactNo,
            Date registrationTime, Integer whatsappNo, String facebookLink, String youtubeLink, byte[] image) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.description = description;
        this.addressId = addressId;
        this.contactNo = contactNo;
        this.registrationTime = registrationTime;
        this.whatsappNo = whatsappNo;
        this.facebookLink = facebookLink;
        this.youtubeLink = youtubeLink;
        this.image = image;
    }

    public byte[] getImage() {
        return image;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAddressId() {
        return addressId;
    }

    public void setAddressId(Integer addressId) {
        this.addressId = addressId;
    }

    public Integer getContactNo() {
        return contactNo;
    }

    public void setContactNo(Integer contactNo) {
        this.contactNo = contactNo;
    }

    public Date getRegistrationTime() {
        return registrationTime;
    }

    public void setRegistrationTime(Date registrationTime) {
        this.registrationTime = registrationTime;
    }

    public Integer getWhatsappNo() {
        return whatsappNo;
    }

    public void setWhatsappNo(Integer whatsappNo) {
        this.whatsappNo = whatsappNo;
    }

    public String getFacebookLink() {
        return facebookLink;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getYoutubeLink() {
        return youtubeLink;
    }

    public void setYoutubeLink(String youtubeLink) {
        this.youtubeLink = youtubeLink;
    }

}
