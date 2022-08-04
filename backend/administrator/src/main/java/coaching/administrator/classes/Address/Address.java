package coaching.administrator.classes.Address;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import coaching.administrator.classes.Upazila.Upazila;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "address")
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String village;
    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "upazila_id", referencedColumnName = "id")
    private Upazila upazila;
    // @OneToOne(mappedBy = "presentAddress", fetch = FetchType.LAZY)
    // private Person personPresent;
    // @OneToOne(mappedBy = "permanentAddress", fetch = FetchType.LAZY)
    // private Person personPermanent;

}
