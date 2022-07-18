package coaching.administrator.classes.Subject;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {

    Subject findByName(String name);

    List<Subject> findAll();
}