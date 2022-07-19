package coaching.administrator.classes.Batch;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BatchRepository extends JpaRepository<Batch, Integer> {

    Batch findByName(String name);

    List<Batch> findByProgramId(Integer programId);

}