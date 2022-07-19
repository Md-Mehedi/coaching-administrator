package coaching.administrator.classes.Religion;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReligionRepository extends JpaRepository<Religion, Integer> {

    Religion findByName(String name);

    List<Religion> findAll();
}