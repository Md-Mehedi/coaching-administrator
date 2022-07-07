package coaching.administrator.classes.Organization;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "organization")
public class Organization {

    @Id
    // @GeneratedValue
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String email;
    private String description;
    private Integer addressId;
    private Integer contactNo;
    private Date registration_time;
    private Integer whatsappNo;
    private String facebookLink;
    private String youtubeLink;
    
    public Organization() {
    }
    

    public Organization(Integer id, String name, String email, String description, Integer addressId, Integer contactNo,
            Date registration_time, Integer whatsappNo, String facebookLink, String youtubeLink) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.description = description;
        this.addressId = addressId;
        this.contactNo = contactNo;
        this.registration_time = registration_time;
        this.whatsappNo = whatsappNo;
        this.facebookLink = facebookLink;
        this.youtubeLink = youtubeLink;
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

    public Date getRegistration_time() {
        return registration_time;
    }

    public void setRegistration_time(Date registration_time) {
        this.registration_time = registration_time;
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
