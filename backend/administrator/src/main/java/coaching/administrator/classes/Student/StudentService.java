package coaching.administrator.classes.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.Person.PersonService;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private PersonService personService;

    public ObjectNode saveStudent(Student student) {
        ObjectNode node = mapper.createObjectNode();
        // PasswordEncoder pEncoder = new PasswordEncoder();
        // student.setPassword(pEncoder.getEncodedPassword(student.getPerson().getPassword()));
        repository.save(student);
        Global.colorPrint(student);
        Global.colorPrint(student.getPerson());
        return node.put("success", true)
                .put("message", "Student added successfully");
    }

    public Student getStudentById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Student getStudentByFullName(String name) {
        Person person = personService.getPersonByFullName(name);
        Student student = new Student();
        student.setPerson(person);
        return student;
    }

    public Student getStudentByEmail(String email) {
        Person person = personService.getPersonByEmail(email);
        Student student = new Student();
        student.setPerson(person);
        return student;
    }

    public ObjectNode deleteStudent(Integer id) {
        ObjectNode node = mapper.createObjectNode();
        repository.deleteById(id);
        return node.put("success", true)
                .put("message", "Student delete successfully");
    }

    public ObjectNode updateStudent(Student student) {
        ObjectNode node = mapper.createObjectNode();
        // personService.updatePerson(student);
        // Student newStudent = repository.findById(student.getId()).orElse(null);
        repository.save(student);
        return node.put("success", true)
                .put("message", "Student update successfully");
    }

}