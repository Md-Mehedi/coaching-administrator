package coaching.administrator.classes.Institution;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface InstitutionRepository extends JpaRepository<Institution, Integer> {

    Institution findByName(String name);

    List<Institution> findByBoardId(Integer boardId);

}