package coaching.administrator.classes.Teacher;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {

    // Teacher findByFullName(String name);

    // Teacher findByEmail(String email);
}
