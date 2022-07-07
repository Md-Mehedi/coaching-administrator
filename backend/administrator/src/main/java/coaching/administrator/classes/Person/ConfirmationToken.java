package coaching.administrator.classes.Person;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Column;
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

@Entity
@Table(name = "confirmation_token")
public class ConfirmationToken {

    @Id
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    // @OneToOne(targetEntity = UserEntity.class, fetch = FetchType.EAGER)
    // @JoinColumn(nullable = false, name = "user_id")
    private Integer personId;

    public ConfirmationToken() {
    }

    public ConfirmationToken(Integer personId) {
        this.confirmationToken = UUID.randomUUID().toString();
        this.date = new Date();
        this.personId = personId;
    }

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getPersonId() {
        return personId;
    }

    public void setPersonId(Integer personId) {
        this.personId = personId;
    }

    // public ConfirmationToken(UserEntity userEntity) {
    // this.userEntity = userEntity;
    // createdDate = new Date();
    // confirmationToken = UUID.randomUUID().toString();
    // }

}