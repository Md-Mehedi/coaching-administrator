package coaching.administrator.classes.Address;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String village;
    private Integer thanaId;

    public Address() {
    }

    public Address(Integer id, String village, Integer thanaId) {
        this.id = id;
        this.village = village;
        this.thanaId = thanaId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public Integer getThanaId() {
        return thanaId;
    }

    public void setThanaId(Integer thanaId) {
        this.thanaId = thanaId;
    }
    
}
