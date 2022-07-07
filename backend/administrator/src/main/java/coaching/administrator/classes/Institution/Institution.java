package coaching.administrator.classes.Institution;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "institution")
public class Institution {

    @Id
    // @GeneratedValue
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String type;
    private int boardId;

    public Institution() {
    }

    public Institution(Integer id, String name, String type, int boardId) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.boardId = boardId;
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

    public String getType() {
        return type;
    }


    public void setType(String type) {
        this.type = type;
    }


    public int getBoardId() {
        return boardId;
    }


    public void setBoardId(int boardId) {
        this.boardId = boardId;
    }


}
