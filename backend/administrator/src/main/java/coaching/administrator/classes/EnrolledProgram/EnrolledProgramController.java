
package coaching.administrator.classes.EnrolledProgram;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Program.Program;
import coaching.administrator.classes.Program.ProgramService;
import coaching.administrator.classes.Student.Student;
import coaching.administrator.classes.Student.StudentService;

@RestController
public class EnrolledProgramController {

    @Autowired
    private EnrolledProgramRepository repository;

    @PostMapping("/add-enrolledProgram/{programId}/{studentId}")
    public ObjectNode addEnrolledProgram(@PathVariable Integer programId, @PathVariable Integer studentId) {
        Program p = new Program();
        p.setId(programId);
        Student s = new Student();
        s.setPerson_id(studentId);
        EnrolledProgram ep = new EnrolledProgram();
        ep.setStudent(s);
        ep.setProgram(p);
        repository.save(ep);
        // repository.add(programId, studentId);
        // return
        // Global.createSuccessMessage(enrolledProgram.getStudent().getPerson().getNickName()
        // + " successfully enrolled to " + enrolledProgram.getProgram().getName());
        return Global.createSuccessMessage("Student enrollment successful");
    }

    @GetMapping("/get-enrolledProgram-by-id/{id}")
    public Optional<EnrolledProgram> getEnrolledProgramById(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @GetMapping("/get-all-students-by-programId/{programId}")
    public List<Student> getAllEnrolledProgramByCoachingId(@PathVariable Integer programId) {
        List<EnrolledProgram> list = repository.findByProgramId(programId);
        ArrayList<Student> studentList = new ArrayList<Student>();
        for (EnrolledProgram ep : list) {
            studentList.add(ep.getStudent());
        }
        return studentList;
    }

    // @GetMapping("/get-enrolledProgram-by-name/{name}")
    // public EnrolledProgram getEnrolledProgramByName(@PathVariable String
    // name) {
    // return service.getEnrolledProgramByName(name);
    // }

    @DeleteMapping("/delete-enrolledProgram-by-id")
    public String deleteEnrolledProgram(@PathVariable Integer id) {
        repository.deleteById(id);
        return "Student Batch History with " + " id " + id + " deleted";
    }
}
