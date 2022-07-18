package coaching.administrator.classes.Day;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DayRepository extends JpaRepository<Day, Integer> {

    Day findByName(String name);

    List<Day> findAll();
}