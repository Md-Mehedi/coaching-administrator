package coaching.administrator.classes.Program;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends JpaRepository<Program, Integer> {

    Program findByName(String name);

    List<Program> findByCoachingId(Integer id);

}
