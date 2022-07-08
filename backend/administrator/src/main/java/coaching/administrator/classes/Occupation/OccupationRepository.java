package coaching.administrator.classes.Occupation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OccupationRepository extends JpaRepository<Occupation, Integer> {

    Occupation findByName(String name);
}