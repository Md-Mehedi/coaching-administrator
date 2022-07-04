package coaching.administrator.classes.District;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DistrictRepository extends JpaRepository<District, Integer> {

    District findByName(String name);
}