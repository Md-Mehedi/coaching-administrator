package coaching.administrator.classes.Person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Security.PasswordEncoder;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    public Person savePerson(Person person) {
        PasswordEncoder pEncoder = new PasswordEncoder();
        person.setPassword(pEncoder.getEncodedPassword(person.getPassword()));
        return repository.save(person);
    }

    public Person getPersonById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Person getPersonByFullName(String name) {
        return repository.findByFullName(name);
    }

    public Person getPersonByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String deletePerson(Integer id) {

        repository.deleteById(id);
        return "Person with id : " + id + " deleted";
    }

    public Person updatePerson(Person person) {
        Person oldPerson = repository.findById(person.getId()).orElse(null);
        PasswordEncoder pEncoder = new PasswordEncoder();

        oldPerson.setPassword(pEncoder.getEncodedPassword(person.getPassword()));
        oldPerson.setFullName(person.getFullName());
        oldPerson.setNickName(person.getNickName());
        oldPerson.setGender(person.getGender());
        oldPerson.setEmail(person.getEmail());
        oldPerson.setFatherName(person.getFatherName());
        oldPerson.setMotherName(person.getMotherName());
        oldPerson.setDateOfBirth(person.getDateOfBirth());
        oldPerson.setBloodGroup(person.getBloodGroup());
        oldPerson.setNationality(person.getNationality());
        oldPerson.setJoiningDate(person.getJoiningDate());
        oldPerson.setPermanentAddress(person.getPermanentAddress());
        oldPerson.setPresentAddress(person.getPresentAddress());
        oldPerson.setFatherOccupation(person.getFatherOccupation());
        oldPerson.setMotherOccupation(person.getMotherOccupation());
        oldPerson.setReligion(person.getReligion());
        oldPerson.setPersonType(person.getPersonType());
        oldPerson.setImage(person.getImage());

        return repository.save(oldPerson);
    }

}