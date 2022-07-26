package coaching.administrator.classes.Result;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultService {

    @Autowired
    private ResultRepository repository;

    public Result saveResult(Result result) {
        return repository.save(result);
    }

    public Result getResultById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteResult(Integer id) {
        repository.deleteById(id);
        return "Result with id : " + id + " deleted";
    }

}