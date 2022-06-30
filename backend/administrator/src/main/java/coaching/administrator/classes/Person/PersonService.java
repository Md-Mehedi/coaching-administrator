package coaching.administrator.classes.Person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    private PersonRepository repository;

    public Person savePerson(Person person) {
        return repository.save(person);
    }

    public Person getPersonById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Person getPersonByFullName(String name) {
        return repository.findByFullName(name);
    }

    public String deletePerson(Integer id) {

        repository.deleteById(id);
        return "Person with id : " + id + " deleted";
    }

    public Person updatePerson(Person person) {
        Person oldPerson = repository.findById(person.getId()).orElse(null);

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
        oldPerson.setPermanentAdrsId(person.getPermanentAdrsId());
        oldPerson.setPresentAdrsId(person.getPresentAdrsId());
        oldPerson.setFatherOcptnId(person.getFatherOcptnId());
        oldPerson.setMotherOcptnId(person.getMotherOcptnId());
        oldPerson.setReligionId(person.getReligionId());
        oldPerson.setPersonType(person.getPersonType());

        return repository.save(person);
    }

}