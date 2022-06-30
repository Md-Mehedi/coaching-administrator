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
        oldPerson.setNick_name(person.getNick_name());
        oldPerson.setGender(person.getGender());
        oldPerson.setEmail(person.getEmail());
        oldPerson.setFather_name(person.getFather_name());
        oldPerson.setMother_name(person.getMother_name());
        oldPerson.setDate_of_birth(person.getDate_of_birth());
        oldPerson.setBlood_group(person.getBlood_group());
        oldPerson.setNationality(person.getNationality());
        oldPerson.setJoining_date(person.getJoining_date());
        oldPerson.setPermanent_adrs_id(person.getPermanent_adrs_id());
        oldPerson.setPresent_adrs_id(person.getPresent_adrs_id());
        oldPerson.setFather_ocptn_id(person.getFather_ocptn_id());
        oldPerson.setMother_ocptn_id(person.getMother_ocptn_id());
        oldPerson.setReligion_id(person.getReligion_id());
        oldPerson.setPerson_type(person.getPerson_type());

        return repository.save(person);
    }

}
