
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
import coaching.administrator.classes.Batch.BatchRepository;
import coaching.administrator.classes.Batch.BatchService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;
import coaching.administrator.classes.Student.Student;
import coaching.administrator.classes.Student.StudentService;
import coaching.administrator.classes.StudentBatchHistory.StudentBatchHistory;
import coaching.administrator.classes.StudentBatchHistory.StudentBatchHistoryRepository;

@RestController
public class StudentBatchController {

    @Autowired
    private StudentBatchService service;

    @Autowired
    private StudentBatchRepository repository;
    @Autowired
    private BatchService batchService;
    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentBatchHistoryRepository historyRepository;

    @PostMapping("/add-studentBatch/{batchId}/{studentId}")
    public ObjectNode addStudentBatch(@PathVariable Integer batchId, @PathVariable Integer studentId) {
        Batch b = batchService.getBatchById(batchId);
        if (b == null)
            return Global.createErrorMessage("Batch not found");
        Student s = studentService.getStudentById(studentId);
        if (s == null)
            return Global.createErrorMessage("Student not found");

        StudentBatch exist = repository.findByBatchIdStudentId(batchId, studentId);
        if (exist != null) {
            return Global.createErrorMessage("Student already enrolled to this batch");
        }
        StudentBatch sb = new StudentBatch();
        sb.setBatch(b);
        sb.setStudent(s);
        sb.setStartDate(new Date());
        Global.colorPrint(sb);
        repository.save(sb);
        return Global.createSuccessMessage("Student add successfully");
    }

    @PostMapping("/import-from-another-batch/{batchId}/{anotherBatchId}")
    public ObjectNode importFromAnotherBatch(@PathVariable Integer batchId, @PathVariable Integer anotherBatchId) {
        Batch fetchedBatch = batchService.getBatchById(batchId);
        if (fetchedBatch == null)
            return Global.createErrorMessage("Batch not found");
        Batch fetchedAnotherBatch = batchService.getBatchById(anotherBatchId);
        if (fetchedAnotherBatch == null)
            return Global.createErrorMessage("Another batch not found");
        Integer count = 0;
        List<StudentBatch> sbs = repository.findByBatchId(anotherBatchId);
        for (StudentBatch sb : sbs) {
            StudentBatch exist = repository.findByBatchIdStudentId(batchId, sb.getStudent().getPerson_id());
            if (exist == null) {
                exist = new StudentBatch();
                exist.setBatch(fetchedBatch);
                exist.setStudent(sb.getStudent());
                exist.setStartDate(new Date());
                repository.save(exist);
                count++;
            }
        }
        return Global.createSuccessMessage(count + " student import successfully");
    }

    @GetMapping("/get-studentBatch-by-id/{id}")
    public StudentBatch getStudentBatchById(@PathVariable Integer id) {
        return service.getStudentBatchById(id);
    }

    @GetMapping("/get-all-studentBatch-by-batch-id/{batchId}")
    public ObjectNode getStudentBatches(@PathVariable Integer batchId) {
        Batch fetchedBatch = batchService.getBatchById(batchId);
        if (fetchedBatch == null) {
            return Global.createErrorMessage("Batch not found");
        }

        if (fetchedBatch.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
            List<StudentBatch> studentBatches = repository.findByBatchId(batchId);
            return Global.createSuccessMessage("Students found")
                    .putPOJO("object", studentBatches);
        }
        return Global.createErrorMessage("Not authorized to get enrolledPrograms Students");
    }

    // @GetMapping("/get-studentBatch-by-name/{name}")
    // public StudentBatch getStudentBatchByName(@PathVariable String name) {
    // return service.getStudentBatchByName(name);
    // }

    @DeleteMapping("/delete-studentBatch-by-id/{id}")
    public ObjectNode deleteStudentBatch(@PathVariable Integer id) {

        // StudentBatchHistory history = new StudentBatchHistory();
        // StudentBatch studentBatch = repository.findById(id).orElse(null);
        // history.setStartDate(studentBatch.getStartDate());
        // history.setEndDate(new Date());
        // history.setBatch(studentBatch.getBatch());
        // history.setStudent(studentBatch.getStudent());
        // historyRepository.save(history);

        service.deleteStudentBatch(id);

        return Global.createSuccessMessage("Student deleted successfully");
    }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @GetMapping("/get-all-studentBatch-by-program-id-student-id/{programId}/{studentId}")
    // public List<StudentBatch> getStudentBatchByProgramIdStudentId(@PathVariable
    // Integer programId,
    // @PathVariable Integer studentId) {
    // return service.getStudentBatchByProgramIdStudentId(programId, studentId);
    // }

}
