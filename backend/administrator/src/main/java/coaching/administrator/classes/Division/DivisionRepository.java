package coaching.administrator.classes.Division;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DivisionRepository extends JpaRepository<Division, Integer> {

    Division findByName(String name);

    List<Division> findAll();
}