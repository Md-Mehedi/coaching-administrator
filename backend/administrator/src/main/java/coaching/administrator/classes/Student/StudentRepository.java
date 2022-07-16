package coaching.administrator.classes.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    Student findByFullName(String name);

    Student findByEmail(String email);
}
