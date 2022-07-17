package coaching.administrator.classes.District;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District, Integer> {

    District findByName(String name);

    List<District> findByDivisionId(Integer id);
}