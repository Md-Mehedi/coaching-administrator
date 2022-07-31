package coaching.administrator.classes.PersonContact;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonContactRepository extends JpaRepository<PersonContact, Integer> {

    // List<PersonContact> findAllByPersonId(Integer personId);
}