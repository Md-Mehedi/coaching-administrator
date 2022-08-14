package coaching.administrator.classes.Teacher;

import java.io.IOException;
import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.Person.PersonService;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository repository;
    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private PersonService personService;

    public void saveImage(Teacher teacher, MultipartFile image) {
        Person person = teacher.getPerson();
        try {
            person.setImage(image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public ObjectNode saveTeacher(Teacher teacher, MultipartFile image) {
        ObjectNode node = mapper.createObjectNode();
        teacher.getPerson().setJoiningDate(new Date());
        // PasswordEncoder pEncoder = new PasswordEncoder();
        // teacher.setPassword(pEncoder.getEncodedPassword(teacher.getPerson().getPassword()));
        saveImage(teacher, image);
        repository.save(teacher);
        return node.put("success", true)
                .put("message", "Teacher added successfully");
    }

    public Teacher getTeacherById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Teacher getTeacherByFullName(String name) {
        Person person = personService.getPersonByFullName(name);
        Teacher teacher = new Teacher();
        teacher.setPerson(person);
        return teacher;
    }

    public Teacher getTeacherByEmail(String email) {
        Person person = personService.getPersonByEmail(email);
        Teacher teacher = new Teacher();
        teacher.setPerson(person);
        return teacher;
    }

    public ObjectNode deleteTeacher(Integer id) {
        ObjectNode node = mapper.createObjectNode();
        repository.deleteById(id);
        return node.put("success", true)
                .put("message", "Teacher deleted successfully");
    }

    public ObjectNode updateTeacher(Teacher teacher, MultipartFile image) {
        ObjectNode node = mapper.createObjectNode();
        // personService.updatePerson(teacher);
        // Teacher newTeacher = repository.findById(teacher.getId()).orElse(null);
        saveImage(teacher, image);
        repository.save(teacher);
        return node.put("success", true)
                .put("message", "Teacher updated successfully");
    }
}