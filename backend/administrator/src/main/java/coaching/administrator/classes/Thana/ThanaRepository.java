package coaching.administrator.classes.Thana;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ThanaRepository extends JpaRepository<Thana, Integer> {

    Thana findByName(String name);
}