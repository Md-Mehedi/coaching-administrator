
package coaching.administrator.classes.ClassTime;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Batch.Batch;
import coaching.administrator.classes.Batch.BatchService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Room.Room;
import coaching.administrator.classes.Room.RoomService;
import coaching.administrator.classes.Security.jwt.JwtUtils;
import coaching.administrator.classes.Teacher.Teacher;
import coaching.administrator.classes.Teacher.TeacherService;

@RestController
public class ClassTimeController {

    @Autowired
    private ClassTimeRepository repository;

    @Autowired
    private BatchService batchService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private TeacherService teacherService;

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-classTime")
    public ObjectNode addClassTime(@RequestBody ClassTime classTime) {
        Batch batch = batchService.getBatchById(classTime.getBatch().getId());
        Room room = roomService.getRoomById(classTime.getRoom().getId());
        Teacher teacher = teacherService.getTeacherById(classTime.getTeacher().getPerson().getId());

        if (batch == null || room == null || teacher == null) {
            return Global.createErrorMessage("Batch, Room or Teacher not found");
        }

        if ((batch.getProgram().getCoaching().getId() == JwtUtils.getCoachingId())
                && (room.getCoaching().getId() == JwtUtils.getCoachingId())
                && (teacher.getPerson().getCoaching().getId() == JwtUtils.getCoachingId())) {
            classTime.setBatch(batch);
            classTime.setRoom(room);
            classTime.setTeacher(teacher);
            repository.save(classTime);
            return Global.createSuccessMessage("Class time added successfully");
        } else {
            return Global.createErrorMessage("Not Authorized to add class time");
        }
    }

    // @PreAuthorize("hasRole('COACHING_ADMIN')")
    // @GetMapping("/get-classTime-by-id/{id}")
    // public ObjectNode getClassTimeById(@PathVariable Integer id) {
    // ClassTime classTime = repository.findById(id).orElse(null);
    // if (classTime == null) {
    // return Global.createErrorMessage("Class time not found");
    // }

    // if (classTime.getBatch().getProgram().getCoaching().getId() ==
    // JwtUtils.getCoachingId()) {
    // return Global.createSuccessMessage("Class time found")
    // .putPOJO("object", classTime);
    // } else {
    // return Global.createErrorMessage("Not elgible to fetch class time");
    // }
    // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-classTime-by-batchId/{id}")
    public ObjectNode getClassTimeByBatchId(@PathVariable Integer id) {
        // List<ClassTime> list = repository.findByBatchId(id);
        // Global.colorPrint(list.get(0).getStartDateTime());
        Batch batch = batchService.getBatchById(id);
        if (batch == null) {
            return Global.createErrorMessage("Batch not found");
        }

        if (batch.getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
            List<ClassTime> list = repository.findByBatchId(id);
            return Global.createSuccessMessage("Class Time List Found")
                    .putPOJO("object", list);
        } else {
            return Global.createErrorMessage("Not elgible to fetch Class Time List");
        }
    }

    @GetMapping("/get-all-classTime-by-programId/{id}")
    public List<ClassTime> getClassTimeByProgramId(@PathVariable Integer id) {
        return repository.findAllByProgramId(id);
    }

    @GetMapping("/get-all-classTime-by-teacherId/{id}")
    public List<ClassTime> getClassTimeByTeacherId(@PathVariable Integer id) {
        return repository.findAllByTeacherId(id);
    }

    // #TODO Update
    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/update-class")
    public ObjectNode deleteClassTime(@RequestBody ClassTime classTime) {
        ClassTime fetchClassTime = repository.findById(classTime.getId()).orElse(null);
        if (fetchClassTime == null) {
            return Global.createErrorMessage("Class time not found");
        }

        if (fetchClassTime.getBatch().getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
            repository.save(classTime);
            return Global.createSuccessMessage("Class time updated");
        } else {
            return Global.createErrorMessage("Not authorized to update this class time");
        }
    }

    @PreAuthorize("hasAnyRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-classTime-by-id/{id}")
    public ObjectNode deleteClassTime(@PathVariable Integer id) {
        ClassTime classTime = repository.findById(id).orElse(null);
        if (classTime == null) {
            return Global.createErrorMessage("Class time not found");
        }

        if (classTime.getBatch().getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
            repository.delete(classTime);
            return Global.createSuccessMessage("Class time deleted");
        } else {
            return Global.createErrorMessage("Not authorized to delete this class time");
        }
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/save-all-classTime")
    public ObjectNode saveAllClassTime(@RequestBody List<ClassTime> classTimes) {
        ArrayList<ClassTime> updateList = new ArrayList<ClassTime>();
        for (ClassTime ct : classTimes) {
            if (ct.getBatch().getProgram().getCoaching().getId() == JwtUtils.getCoachingId()) {
                updateList.add(repository.save(ct));
            } else {
                return Global.createErrorMessage("Not authorized to update this class time");
            }
        }
        return Global.createSuccessMessage("Class times added").putPOJO("object", updateList);
    }

    // @PostMapping("/add-classTime/{batchId}")
    // public ObjectNode addClassTime(@PathVariable Integer batchId, @RequestBody
    // List<ClassTime> classTimes) {
    // for (int i = 0; i < classTimes.size(); i++) {
    // classTimes.get(i).setBatch(batchService.getBatchById(batchId));
    // repository.save(classTimes.get(i));
    // }
    // return Global.createSuccessMessage("Subject save successfully");
    // }
}
