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

@RestController
public class BatchController {

    @Autowired
    private BatchService service;

    @Autowired
    private BatchRepository repository;

    @PostMapping("/add-batch")
    public Batch addBatch(@RequestBody Batch batch) {
        System.out.println("\033[31minside add batch\033[0m");

        return service.saveBatch(batch);
    }

    @GetMapping("/get-batch-by-id/{id}")
    public Batch getBatchById(@PathVariable Integer id) {
        return service.getBatchById(id);
    }

    @GetMapping("/get-all-batch-by-program-id/{programId}")
    public List<Batch> getAllBatchByProgramId(Integer programId) {
        return service.getAllBatchByProgramId(programId);
    }

    @GetMapping("/get-batch-by-name/{name}")
    public Batch getBatchByName(@PathVariable String name) {
        return service.getBatchByName(name);
    }

    @PutMapping("update-batch")
    public Batch updateBatch(@RequestBody Batch batch) {
        return repository.save(batch);
    }

    @DeleteMapping("/delete-batch-by-id")
    public String deleteBatch(@PathVariable Integer id) {
        return service.deleteBatch(id);
    }
}
