
package coaching.administrator.classes.EnrolledProgram;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Program.Program;
import coaching.administrator.classes.Program.ProgramService;
import coaching.administrator.classes.Security.jwt.JwtUtils;
import coaching.administrator.classes.Student.Student;
import coaching.administrator.classes.Student.StudentService;

@RestController
public class EnrolledProgramController {

    @Autowired
    private EnrolledProgramRepository repository;
    @Autowired
    private ProgramService programService;

    @Autowired
    private StudentService studentService;

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-enrolledProgram/{programId}/{studentId}")
    public ObjectNode addEnrolledProgram(@PathVariable Integer programId, @PathVariable Integer studentId) {
        Program fetchedProgram = programService.getProgramById(programId);
        Student fetchedStudent = studentService.getStudentById(studentId);

        if (fetchedProgram == null) {
            return Global.createErrorMessage("Program not found");
        }
        if (fetchedStudent == null) {
            return Global.createErrorMessage("Student not found");
        }

        if ((fetchedProgram.getCoaching().getId() == JwtUtils.getCoachingId())
                && (fetchedStudent.getPerson().getCoaching().getId() == JwtUtils.getCoachingId())) {
            EnrolledProgram newEp = new EnrolledProgram();
            newEp.setProgram(fetchedProgram);
            newEp.setStudent(fetchedStudent);
            newEp.setEnrolledDate(new Date());
            repository.save(newEp);

            return Global.createSuccessMessage("Student enrollment successful");
        }

        return Global.createErrorMessage("Not authorized to add enrolledProgram");

        // else {
        // if (fetchedProgram.getCoaching().getId() == JwtUtils.getCoachingId()) {
        // EnrolledProgram ep = new EnrolledProgram();
        // ep.setStudent(s);
        // ep.setProgram(p);
        // repository.save(ep);
        // return Global.createSuccessMessage("Student enrollment successful");
        // } else {
        // return Global.createErrorMessage("Not authorized to add enrolledProgram");
        // }
        // }
        // repository.add(programId, studentId);
        // return
        // Global.createSuccessMessage(enrolledProgram.getStudent().getPerson().getNickName()
        // + " successfully enrolled to " + enrolledProgram.getProgram().getName());
        // return Global.createSuccessMessage("Student enrollment successful");
    }

    @GetMapping("/get-enrolledProgram-by-id/{id}")
    public Optional<EnrolledProgram> getEnrolledProgramById(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-students-by-programId/{programId}")
    public ObjectNode getAllEnrolledProgramByCoachingId(@PathVariable Integer programId) {
        Program fetchedProgram = programService.getProgramById(programId);
        if (fetchedProgram == null) {
            return Global.createErrorMessage("Program not found");
        }

        if (fetchedProgram.getCoaching().getId() == JwtUtils.getCoachingId()) {
            List<EnrolledProgram> enrolledPrograms = repository.findByProgramId(programId);
            return Global.createSuccessMessage("Students found")
                    .putPOJO("object", enrolledPrograms);
        }

        return Global.createErrorMessage("Not authorized to get enrolledPrograms Students");

        // if (fetchedProgram == null) {
        // return new ArrayList<Student>();
        // }

        // List<EnrolledProgram> list = repository.findByProgramId(programId);
        // ArrayList<Student> studentList = new ArrayList<Student>();
        // for (EnrolledProgram ep : list) {
        // studentList.add(ep.getStudent());
        // }
        // return studentList;
    }

    // @GetMapping("/get-all-students-minimal-by-programId/{programId}")
    // public List<Student> getAllEnrolledStudentMinimalByCoachingId(@PathVariable
    // Integer programId) {
    // List<EnrolledProgram> list = repository.findByProgramId(programId);
    // ArrayList<Student> studentList = new ArrayList<Student>();
    // for (EnrolledProgram ep : list) {
    // studentList.add(ep.getStudent());
    // }
    // return studentList;
    // }

    // @GetMapping("/get-enrolledProgram-by-name/{name}")
    // public EnrolledProgram getEnrolledProgramByName(@PathVariable String
    // name) {
    // return service.getEnrolledProgramByName(name);
    // }

    // @DeleteMapping("/delete-enrolledProgram-by-id")
    // public String deleteEnrolledProgram(@PathVariable Integer id) {
    // repository.deleteById(id);
    // return "Student Batch History with " + " id " + id + " deleted";
    // }

    // // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @GetMapping("/auth/get-all-enrolledProgram-by-studentId/{studentId}")
    // public ObjectNode getAllEnrolledProgramByStudentId(@PathVariable Integer
    // studentId) {
    // Student fetchedStudent = studentService.getStudentById(studentId);
    // if (fetchedStudent == null) {
    // return Global.createErrorMessage("Student not found");
    // }
    // if (fetchedStudent.getPerson().getCoaching().getId() ==
    // JwtUtils.getCoachingId()) {
    // List<Map<String, Object>> enrolledPrograms =
    // repository.findAllByStudentId(studentId);
    // return Global.createSuccessMessage("EnrolledPrograms found")
    // .putPOJO("object", enrolledPrograms);
    // }
    // return Global.createErrorMessage("Not authorized to get enrolledPrograms");
    // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-enrolledProgram-by-studentId/{studentId}")
    public ObjectNode getAllEnrolledProgramByStudentId(@PathVariable Integer studentId) {
        Student fetchedStudent = studentService.getStudentById(studentId);
        if (fetchedStudent == null) {
            return Global.createErrorMessage("Student not found");
        }
        if (fetchedStudent.getPerson().getCoaching().getId() == JwtUtils.getCoachingId()) {
            List<EnrolledProgram> enrolledPrograms = repository.findByStudentId(studentId);
            return Global.createSuccessMessage("EnrolledPrograms found").putPOJO("object", enrolledPrograms);
            // .putPOJO("object", enrolledPrograms);
        }
        return Global.createErrorMessage("Not authorized to get enrolledPrograms");
    }
}
