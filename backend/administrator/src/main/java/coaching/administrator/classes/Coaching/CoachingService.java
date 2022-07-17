package coaching.administrator.classes.Coaching;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Security.PasswordEncoder;

@Service
public class CoachingService {

    @Autowired
    private CoachingRepository repository;

    public Coaching saveCoaching(Coaching coaching) {
        return repository.save(coaching);
    }

    public Coaching getCoachingById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Coaching getCoachingByName(String name) {
        return repository.findByName(name);
    }

    public Coaching getCoachingByEmail(String email) {
        return repository.findByEmail(email);
    }

    public String deleteCoaching(Integer id) {

        repository.deleteById(id);
        return "Coaching with id : " + id + " deleted";
    }

    public Coaching updateCoaching(Coaching coaching) {
        Coaching oldCoaching = repository.findById(coaching.getId()).orElse(null);

        oldCoaching.setName(coaching.getName());
        oldCoaching.setDescription(coaching.getDescription());
        oldCoaching.setRegistrationTime(coaching.getRegistrationTime());
        oldCoaching.setAddress(coaching.getAddress());
        oldCoaching.setContactNo(coaching.getContactNo());
        oldCoaching.setEmail(coaching.getEmail());
        oldCoaching.setWhatsappNo(coaching.getWhatsappNo());
        oldCoaching.setYoutubeLink(coaching.getYoutubeLink());
        oldCoaching.setFacebookLink(coaching.getFacebookLink());

        return repository.save(oldCoaching);
    }

}