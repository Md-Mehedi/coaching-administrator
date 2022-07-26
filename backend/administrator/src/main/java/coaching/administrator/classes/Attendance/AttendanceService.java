package coaching.administrator.classes.Attendance;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repository;

    public Attendance saveAttendance(Attendance attendance) {
        return repository.save(attendance);
    }

    public Attendance getAttendanceById(Integer id) {
        return repository.findById(id).orElse(null);
    }


    public String deleteAttendance(Integer id) {
        repository.deleteById(id);
        return "Attendance with id : " + id + " deleted";
    }

}