package coaching.administrator.classes.FeesHistory;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeesHistoryService {

    @Autowired
    private FeesHistoryRepository repository;

    public FeesHistory saveFeesHistory(FeesHistory feesHistory) {
        return repository.save(feesHistory);
    }

    public FeesHistory getFeesHistoryById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteFeesHistory(Integer id) {
        repository.deleteById(id);
        return "FeesHistory with id : " + id + " deleted";
    }

}