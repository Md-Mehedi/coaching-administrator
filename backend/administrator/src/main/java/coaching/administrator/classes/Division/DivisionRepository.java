package coaching.administrator.classes.Division;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DivisionRepository extends JpaRepository<Division, Integer> {

    Division findByName(String name);
}