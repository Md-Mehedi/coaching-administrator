package coaching.administrator.classes.Institution;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InstitutionRepository extends JpaRepository<Institution, Integer> {

    Institution findByName(String name);

    List<Institution> findByBoardId(Integer boardId);

}