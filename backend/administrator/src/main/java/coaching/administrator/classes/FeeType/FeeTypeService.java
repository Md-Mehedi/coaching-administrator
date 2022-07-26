package coaching.administrator.classes.FeeType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeeTypeService {

    @Autowired
    private FeeTypeRepository repository;

    public FeeType saveFeeType(FeeType feeType) {
        return repository.save(feeType);
    }

    public FeeType getFeeTypeById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public FeeType getFeeTypeByName(String typeName) {
        return repository.findByType(typeName);
    }

    public List<FeeType> getFeeTypes() {
        return repository.findAll();
    }

    public String deleteFeeType(Integer id) {
        repository.deleteById(id);
        return "FeeType with id : " + id + " deleted";
    }

}