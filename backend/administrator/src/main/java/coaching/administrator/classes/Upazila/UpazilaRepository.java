package coaching.administrator.classes.Upazila;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UpazilaRepository extends JpaRepository<Upazila, Integer> {

    Upazila findByName(String name);

    List<Upazila> findByDistrictId(Integer id);
}