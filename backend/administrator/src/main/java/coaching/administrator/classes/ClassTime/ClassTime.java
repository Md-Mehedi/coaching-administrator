package coaching.administrator.classes.ClassTime;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import coaching.administrator.classes.Batch.Batch;
import coaching.administrator.classes.ClassType.ClassType;
import coaching.administrator.classes.Room.Room;
import coaching.administrator.classes.Teacher.Teacher;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "class_time")
public class ClassTime implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date startDateTime;
    private Integer duration;
    private Date endDate;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "class_type_id", referencedColumnName = "id")
    private ClassType classType;
    private Integer day;

    // @ManyToOne(optional = true, cascade = CascadeType.ALL, fetch =
    // FetchType.EAGER)
    // @JoinColumn(name = "batch_id", referencedColumnName = "id")
    // private Batch batch;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Room room;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "batch_id", referencedColumnName = "id")
    @JsonBackReference
    private Batch batch;

    @ManyToOne(optional = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "teacher_id", referencedColumnName = "person_id")
    private Teacher teacher;
}
