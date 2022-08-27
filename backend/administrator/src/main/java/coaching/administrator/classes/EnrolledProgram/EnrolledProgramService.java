package coaching.administrator.classes.EnrolledProgram;

import java.util.List;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class EnrolledProgramService {

    @Autowired
    private EnrolledProgramRepository repository;

    public EnrolledProgram getEnrolledProgramById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public List<EnrolledProgram> getAllEnrolledProgramByStudentId(Integer studentId) {
        return repository.findByStudentId(studentId);
    }

}
