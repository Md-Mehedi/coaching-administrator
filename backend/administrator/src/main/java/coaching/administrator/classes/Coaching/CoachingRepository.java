package coaching.administrator.classes.Coaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoachingRepository extends JpaRepository<Coaching, Integer> {

    Coaching findByName(String name);

    Coaching findByEmail(String email);
}
