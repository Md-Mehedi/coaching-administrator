package coaching.administrator.classes.Batch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;

@Service
public class BatchService {

    @Autowired
    private BatchRepository repository;

    public ObjectNode saveBatch(Batch batch) {
        repository.save(batch);
        return Global.createSuccessMessage("Batch save successfully");
    }

    public ObjectNode updateBatch(Batch batch) {
        repository.save(batch);
        return Global.createSuccessMessage("Batch update successfully");
    }

    public Batch getBatchById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    // public Batch getBatchByName(String name) {
    // return repository.findByName(name);
    // }

    public List<Batch> getAllBatchByProgramId(Integer programId) {
        return repository.findByProgramId(programId);
    }

    public ObjectNode deleteBatch(Integer id) {
        repository.deleteById(id);
        return Global.createSuccessMessage("Batch delete successfully");
    }

}