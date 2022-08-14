package coaching.administrator.classes.Batch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Program.Program;
import coaching.administrator.classes.Program.ProgramService;
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
public class BatchController {

    @Autowired
    private BatchService service;
    @Autowired
    private BatchRepository repository;

    @Autowired
    private ProgramService programService;

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-batch")
    public ObjectNode addBatch(@RequestBody Batch batch) {
        Global.colorPrint((batch));
        Program program = batch.getProgram();
        if (program.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.saveBatch(batch);
        } else {
            return Global.createErrorMessage("You are not eligible to add this batch");
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-batch-by-id/{id}")
    public ObjectNode getBatchById(@PathVariable Integer id) {
        Batch fetchedBatch = service.getBatchById(id);
        if (fetchedBatch == null) {
            return Global.createErrorMessage("Batch not found");
        }
        if (fetchedBatch.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Batch found")
                    .putPOJO("object", fetchedBatch);
        } else {
            return Global.createErrorMessage("Not elgible to fetch batch");
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-batch-by-program-id/{programId}")
    public ObjectNode getAllBatchByProgramId(@PathVariable Integer programId) {
        Global.colorPrint((programId));
        Program requestedProgram = programService.getProgramById(programId);
        if (requestedProgram == null) {
            return Global.createErrorMessage("Program not found");
        }
        if (requestedProgram.getCoaching().getId() == JwtUtils.getCoachingId()) {
            List<Batch> fetchedBatch = service.getAllBatchByProgramId(programId);
            // if (fetchedBatch.isEmpty()) {
            // return Global.createErrorMessage("No Batch Found");
            // }
            return Global.createSuccessMessage("Batch list found for this program")
                    .putPOJO("object", fetchedBatch);
        } else {
            return Global.createErrorMessage("Not eligible to fetch batches for program");
        }
    }

    // @GetMapping("/get-batch-by-name/{name}")
    // public Batch getBatchByName(@PathVariable String name) {
    // return service.getBatchByName(name);
    // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PutMapping("update-batch")
    public ObjectNode updateBatch(@RequestBody Batch batch) {
        Batch fetchedBatch = service.getBatchById(batch.getId());
        if (fetchedBatch == null) {
            return Global.createErrorMessage("Batch not found");
        }
        if (fetchedBatch.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.updateBatch(batch);
        } else {
            return Global.createErrorMessage("Not eligible to update batch");
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-batch-by-id/{id}")
    public ObjectNode deleteBatch(@PathVariable Integer id) {
        Batch fetchedBatch = service.getBatchById(id);
        if (fetchedBatch == null) {
            return Global.createErrorMessage("Batch not found");
        }
        if (fetchedBatch.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
            repository.delete(fetchedBatch);
            return Global.createSuccessMessage("Batch deleted");
        } else {
            return Global.createErrorMessage("Not eligible to delete batch");
        }
    }
}
