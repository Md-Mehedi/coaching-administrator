package coaching.administrator.classes.Batch;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BatchService {

    @Autowired
    private BatchRepository repository;

    public Batch saveBatch(Batch batch) {
        return repository.save(batch);
    }

    public Batch getBatchById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Batch getBatchByName(String name) {
        return repository.findByName(name);
    }

    public List<Batch> getAllBatchByProgramId(Integer programId) {
        return repository.findByProgramId(programId);
    }

    public String deleteBatch(Integer id) {
        repository.deleteById(id);
        return "Batch with id : " + id + " deleted";
    }

}