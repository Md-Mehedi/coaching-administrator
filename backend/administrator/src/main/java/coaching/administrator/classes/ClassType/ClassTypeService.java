package coaching.administrator.classes.ClassType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClassTypeService {

    @Autowired
    private ClassTypeRepository repository;

    public ClassType saveClassType(ClassType classType) {
        return repository.save(classType);
    }

    public ClassType getClassTypeById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public ClassType getClassTypeByName(String typeName) {
        return repository.findByType(typeName);
    }

    public List<ClassType> getClassTypes() {
        return repository.findAll();
    }

    public String deleteClassType(Integer id) {
        repository.deleteById(id);
        return "ClassType with id : " + id + " deleted";
    }

}