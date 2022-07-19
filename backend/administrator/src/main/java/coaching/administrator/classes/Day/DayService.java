package coaching.administrator.classes.Day;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DayService {

    @Autowired
    private DayRepository repository;

    public Day saveDay(Day day) {
        return repository.save(day);
    }

    public Day getDayById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Day getDayByName(String name) {
        return repository.findByName(name);
    }

    public List<Day> getDays() {
        return repository.findAll();
    }

    public String deleteDay(Integer id) {
        repository.deleteById(id);
        return "Day with id : " + id + " deleted";
    }

}