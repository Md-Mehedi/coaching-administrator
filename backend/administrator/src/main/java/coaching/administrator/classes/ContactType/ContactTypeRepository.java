package coaching.administrator.classes.ContactType;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactTypeRepository extends JpaRepository<ContactType, Integer> {

    ContactType findByName(String name);
}