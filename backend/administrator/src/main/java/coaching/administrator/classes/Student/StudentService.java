package coaching.administrator.classes.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Person.PersonService;



@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;
    @Autowired
    private PersonService personService;

    public Student saveStudent(Student student) {
        // PasswordEncoder pEncoder = new PasswordEncoder();
        // student.setPassword(pEncoder.getEncodedPassword(student.getPerson().getPassword()));
        return repository.save(student);
    }

    public Student getStudentById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Student getStudentByFullName(String name) {
        return repository.findByFullName(name);
    }

    public Student getStudentByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String deleteStudent(Integer id) {

        repository.deleteById(id);
        return "Student with id : " + id + " deleted";
    }

    public Student updateStudent(Student student) {

        personService.updatePerson(student);
        Student newStudent = repository.findById(student.getId()).orElse(null);
        return newStudent;
    }

}