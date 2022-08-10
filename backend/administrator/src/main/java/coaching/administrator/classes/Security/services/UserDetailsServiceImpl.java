package coaching.administrator.classes.Security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.Person.PersonRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  PersonRepository personRepository;

  @Override
  @Transactional
  public UserDetailsImpl loadUserByUsername(String email) throws UsernameNotFoundException {
    Person person = personRepository.findByEmail(email);
    Global.colorPrint("Person retrieve");
    Global.colorPrint(person);

    if (person == null) {
      new UsernameNotFoundException("User Not Found with email: " + email);
      return null;
    }

    return UserDetailsImpl.build(person);
  }

}
