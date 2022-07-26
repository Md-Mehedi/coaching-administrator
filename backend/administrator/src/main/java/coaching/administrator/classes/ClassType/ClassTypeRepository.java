package coaching.administrator.classes.ClassType;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassTypeRepository extends JpaRepository<ClassType, Integer> {

    ClassType findByType(String typeName);

    List<ClassType> findAll();
}