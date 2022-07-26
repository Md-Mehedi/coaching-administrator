package coaching.administrator.classes.Division;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DivisionRepository extends JpaRepository<Division, Integer> {

    Division findByName(String name);

    List<Division> findAll();

    @Query(value = "select dv.name division_name,count(ds.id) district_count" +
            " from district ds,division dv " +
            " where dv.id = ds.division_id " +
            " group by dv.name;", nativeQuery = true)
    List<Map<String, Object>> countByDivision();
}

// select dv.name division_name,count(ds.id) district_count
// from district ds,division dv
// where dv.id = ds.division_id
// group by dv.name