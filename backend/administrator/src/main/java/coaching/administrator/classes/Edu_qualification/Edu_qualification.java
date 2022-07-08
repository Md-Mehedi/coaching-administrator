package coaching.administrator.classes.Edu_qualification;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "edu_qualification")
public class Edu_qualification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer examId;
    private Integer personId;
    private Integer institutionId;
    private Integer passingYear;
    private String result;

    public Edu_qualification() {
    }

    public Edu_qualification(Integer examId, Integer personId, Integer institutionId, Integer passingYear,
            String result) {
        this.examId = examId;
        this.personId = personId;
        this.institutionId = institutionId;
        this.passingYear = passingYear;
        this.result = result;
    }

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    public Integer getPersonId() {
        return personId;
    }

    public void setPersonId(Integer personId) {
        this.personId = personId;
    }

    public Integer getInstitutionId() {
        return institutionId;
    }

    public void setInstitutionId(Integer institutionId) {
        this.institutionId = institutionId;
    }

    public Integer getPassingYear() {
        return passingYear;
    }

    public void setPassingYear(Integer passingYear) {
        this.passingYear = passingYear;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

}
