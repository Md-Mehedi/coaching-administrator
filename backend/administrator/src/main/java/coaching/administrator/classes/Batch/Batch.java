package coaching.administrator.classes.Batch;

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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import coaching.administrator.classes.ClassTime.ClassTime;
import coaching.administrator.classes.Program.Program;
import coaching.administrator.classes.Subject.Subject;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "batch")
public class Batch implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Integer monthlyFees;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "program_id", referencedColumnName = "id")
    private Program program;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", referencedColumnName = "id")
    private Subject subject;

    // @OneToMany(mappedBy = "batch", cascade = javax.persistence.CascadeType.ALL,
    // fetch = FetchType.EAGER, orphanRemoval = true)
    // @JoinColumn(name = "batch_id", referencedColumnName = "id")
    // @JsonBackReference
    // @OneToMany(mappedBy = "batch", cascade = { CascadeType.PERSIST,
    // CascadeType.MERGE, CascadeType.DETACH,
    // CascadeType.REFRESH }, fetch = FetchType.EAGER)
    // private List<ClassTime> classTimes;

}
