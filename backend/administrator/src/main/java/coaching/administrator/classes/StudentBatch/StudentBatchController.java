
package coaching.administrator.classes.StudentBatch;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Batch.Batch;
import coaching.administrator.classes.Batch.BatchRepository;
import coaching.administrator.classes.Batch.BatchService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Student.Student;
import coaching.administrator.classes.Student.StudentService;

@RestController
public class StudentBatchController {

    @Autowired
    private StudentBatchService service;

    @Autowired
    private StudentBatchRepository repository;
    @Autowired
    private BatchRepository batchRepository;
    @Autowired
    private BatchService batchService;
    @Autowired
    private StudentService studentService;

    @PostMapping("/add-studentBatch/{batchId}/{studentId}")
    public ObjectNode addStudentBatch(@PathVariable Integer batchId, @PathVariable Integer studentId) {
        Batch b = batchService.getBatchById(batchId);
        if (b == null)
            return Global.createErrorMessage("Batch not found");
        Student s = studentService.getStudentById(studentId);
        if (s == null)
            return Global.createErrorMessage("Student not found");
        StudentBatch sb = new StudentBatch();
        sb.setBatch(b);
        sb.setStudent(s);
        sb.setStartDate(new Date());
        Global.colorPrint(sb);
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
    @PutMapping("/copy-student-batch")
    public ObjectNode copyStudentBatch(@RequestParam Integer fromBatchId, @RequestParam Integer toBatchId) {

        Batch fromBatch = batchRepository.findById(fromBatchId).orElse(null);
        Batch toBatch = batchRepository.findById(toBatchId).orElse(null);
        try {

            List<StudentBatch> studentBatchList = repository.findAllByBatchId(fromBatchId);
            for (StudentBatch studentBatch : studentBatchList) {
                StudentBatch newStudentBatch = new StudentBatch();
                Batch batch = new Batch();
                batch.setId(toBatchId);
                newStudentBatch.setBatch(batch);
                newStudentBatch.setStudent(studentBatch.getStudent());
                newStudentBatch.setStartDate(new Date());
                repository.save(newStudentBatch);
            }
            return Global.createSuccessMessage(
                    "All students copied from " + fromBatch.getName() + " to " + toBatch.getName() + " ");
        } catch (Exception e) {
            e.printStackTrace();
            return Global.createErrorMessage("Something went wrong please try again !");
        }

    }
}
