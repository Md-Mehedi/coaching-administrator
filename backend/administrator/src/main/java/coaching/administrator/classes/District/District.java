package coaching.administrator.classes.District;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import coaching.administrator.classes.Address.Address;
import coaching.administrator.classes.Division.Division;
import coaching.administrator.classes.Thana.Thana;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "district")
public class District implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @ManyToOne(optional = false, cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "division_id", referencedColumnName = "id")
    public Division division;
    // @OneToMany(targetEntity = Address.class, cascade = CascadeType.ALL, mappedBy
    // = "thana")
    // private List<Thana> thanas;

}
