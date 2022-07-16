package coaching.administrator.classes.Person;

import java.util.Date;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "confirmation_token")
public class ConfirmationToken {

    @Id
    private String confirmationToken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    private String email;
    private String password;

    public ConfirmationToken(String email, String password) {
        this.confirmationToken = UUID.randomUUID().toString();
        this.date = new Date();
        this.email = email;
        this.password = password;
    }

    // public ConfirmationToken(UserEntity userEntity) {
    // this.userEntity = userEntity;
    // createdDate = new Date();
    // confirmationToken = UUID.randomUUID().toString();
    // }

}