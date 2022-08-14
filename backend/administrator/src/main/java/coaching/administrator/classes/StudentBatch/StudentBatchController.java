
package coaching.administrator.classes.StudentBatch;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Batch.Batch;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Student.Student;
import coaching.administrator.classes.StudentBatchHistory.StudentBatchHistory;
import coaching.administrator.classes.StudentBatchHistory.StudentBatchHistoryRepository;

@RestController
public class StudentBatchController {

    @Autowired
    private StudentBatchService service;

    @Autowired
    private StudentBatchRepository repository;

    @Autowired
    private StudentBatchHistoryRepository historyRepository;

    @PostMapping("/add-studentBatch/{batchId}/{studentId}")
    public ObjectNode addStudentBatch(@PathVariable Integer batchId, @PathVariable Integer studentId) {
        Batch b = new Batch();
        b.setId(batchId);
        Student s = new Student();
        s.setPerson_id(studentId);
        StudentBatch sb = new StudentBatch();
        sb.setBatch(b);
        sb.setStudent(s);
        sb.setStartDate(new Date());
        repository.save(sb);
        return Global.createSuccessMessage("Student add successfully");
    }

    @GetMapping("/get-studentBatch-by-id/{id}")
    public StudentBatch getStudentBatchById(@PathVariable Integer id) {
        return service.getStudentBatchById(id);
    }

    // @GetMapping("/get-all-studentBatch-by-batch-id/{batchId}")
    // public List<StudentBatch> getStudentBatches(@PathVariable Integer batchId) {
    // return repository.findByBatchId(batchId);
    // }

    // @GetMapping("/get-studentBatch-by-name/{name}")
    // public StudentBatch getStudentBatchByName(@PathVariable String name) {
    // return service.getStudentBatchByName(name);
    // }

    @DeleteMapping("/delete-studentBatch-by-id")
    public String deleteStudentBatch(@PathVariable Integer id) {

        StudentBatchHistory history = new StudentBatchHistory();
        StudentBatch studentBatch = repository.findById(id).orElse(null);
        history.setStartDate(studentBatch.getStartDate());
        history.setEndDate(new Date());
        history.setBatch(studentBatch.getBatch());
        history.setStudent(studentBatch.getStudent());
        historyRepository.save(history);

        service.deleteStudentBatch(id);

        return "student batch with id " + id + " deleted";
    }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @GetMapping("/get-all-studentBatch-by-program-id-student-id/{programId}/{studentId}")
    // public List<StudentBatch> getStudentBatchByProgramIdStudentId(@PathVariable
    // Integer programId,
    // @PathVariable Integer studentId) {
    // return service.getStudentBatchByProgramIdStudentId(programId, studentId);
    // }

}
