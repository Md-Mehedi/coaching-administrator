package coaching.administrator.classes.Religion;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReligionRepository extends JpaRepository<Religion, Integer> {

    Religion findByName(String name);
}