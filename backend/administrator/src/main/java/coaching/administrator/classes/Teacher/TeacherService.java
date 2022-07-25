package coaching.administrator.classes.Teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.Person.PersonService;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository repository;

    @Autowired
    private PersonService personService;

    public Teacher saveTeacher(Teacher teacher) {
        // PasswordEncoder pEncoder = new PasswordEncoder();
        // teacher.setPassword(pEncoder.getEncodedPassword(teacher.getPerson().getPassword()));
        return repository.save(teacher);
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

    public String deleteTeacher(Integer id) {

        repository.deleteById(id);
        return "Teacher with id : " + id + " deleted";
    }

    public Teacher updateTeacher(Teacher teacher) {

        // personService.updatePerson(teacher);
        // Teacher newTeacher = repository.findById(teacher.getId()).orElse(null);
        return repository.save(teacher);
    }

}