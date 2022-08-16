package coaching.administrator.classes.Student;

import java.io.IOException;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Occupation.Occupation;
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

    public void saveImage(Student student, MultipartFile image) {
        Person person = student.getPerson();
        try {
            person.setImage(image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public ObjectNode saveStudent(Student student, MultipartFile image) {
        ObjectNode node = mapper.createObjectNode();
        student.getPerson().setJoiningDate(new Date());
        saveImage(student, image);
        repository.save(student);
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

    public ObjectNode updateStudent(Student student, MultipartFile image) {
        ObjectNode node = mapper.createObjectNode();
        // personService.updatePerson(student);
        // Student newStudent = repository.findById(student.getId()).orElse(null);
        saveImage(student, image);
        repository.save(student);
        return node.put("success", true)
                .put("message", "Student update successfully");
    }

}