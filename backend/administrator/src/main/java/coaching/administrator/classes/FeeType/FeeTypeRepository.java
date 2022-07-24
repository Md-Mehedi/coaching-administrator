package coaching.administrator.classes.FeeType;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FeeTypeRepository extends JpaRepository<FeeType, Integer> {

    FeeType findByType(String typeName);

    List<FeeType> findAll();
}