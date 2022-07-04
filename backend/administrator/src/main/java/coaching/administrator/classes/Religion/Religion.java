package coaching.administrator.classes.Religion;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "religion")
public class Religion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    public Religion() {
        System.out.println("\033[31minside religion default constructor\033[0m" + this.name);

    }

    public Religion(Integer id, String name) {
        this.id = id;
        this.name = name;
        System.out.println("\033[31minside religion  parameterizedconstructor\033[0m");

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

}
