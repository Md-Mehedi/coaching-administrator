package coaching.administrator.classes.Batch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;

@RestController
public class BatchController {

    @Autowired
    private BatchService service;

    @Autowired
    private BatchRepository repository;

    @PostMapping("/add-batch")
    public ObjectNode addBatch(@RequestBody Batch batch) {
        Global.colorPrint((batch));
        return service.saveBatch(batch);
    }

    @GetMapping("/get-batch-by-id/{id}")
    public Batch getBatchById(@PathVariable Integer id) {
        return service.getBatchById(id);
    }

    @GetMapping("/get-all-batch-by-program-id/{programId}")
    public List<Batch> getAllBatchByProgramId(@PathVariable Integer programId) {
        Global.colorPrint((programId));
        return service.getAllBatchByProgramId(programId);
    }

    // @GetMapping("/get-batch-by-name/{name}")
    // public Batch getBatchByName(@PathVariable String name) {
    // return service.getBatchByName(name);
    // }

    @PutMapping("update-batch")
    public ObjectNode updateBatch(@RequestBody Batch batch) {
        return service.updateBatch(batch);
    }

    @DeleteMapping("/delete-batch-by-id/{id}")
    public ObjectNode deleteBatch(@PathVariable Integer id) {
        return service.deleteBatch(id);
    }
}
