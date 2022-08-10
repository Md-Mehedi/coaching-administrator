
package coaching.administrator.classes.ClassTime;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Batch.BatchService;
import coaching.administrator.classes.Global.Global;

@RestController
public class ClassTimeController {

    @Autowired
    private ClassTimeRepository repository;

    @Autowired
    private BatchService batchService;

    @PostMapping("/add-classTime")
    public ObjectNode addClassTime(@RequestBody ClassTime classTime) {
        repository.save(classTime);
        return Global.createSuccessMessage("Class time added");
    }

    @GetMapping("/get-classTime-by-id/{id}")
    public ClassTime getClassTimeById(@PathVariable Integer id) {
        return repository.findById(id).orElse(null);
    }

    @GetMapping("/get-all-classTime-by-batchId/{id}")
    public List<ClassTime> getClassTimeByBatchId(@PathVariable Integer id) {
        List<ClassTime> list = repository.findByBatchId(id);
        Global.colorPrint(list.get(0).getStartDateTime());
        return list;
    }

    @GetMapping("/get-all-classTime-by-programId/{id}")
    public List<ClassTime> getClassTimeByProgramId(@PathVariable Integer id) {
        return repository.findAllByProgramId(id);
    }

    @GetMapping("/get-all-classTime-by-teacherId/{id}")
    public List<ClassTime> getClassTimeByTeacherId(@PathVariable Integer id) {
        return repository.findAllByTeacherId(id);
    }

    @GetMapping("/get-all-classTime-by-studentId/{id}")
    public List<ClassTime> getClassTimeByStudentId(@PathVariable Integer id) {
        return repository.findAllByStudentId(id);
    }

    @DeleteMapping("/update-classTime")
    public ClassTime deleteClassTime(@RequestBody ClassTime classTime) {
        return repository.save(classTime);
    }

    @DeleteMapping("/delete-classTime-by-id/{id}")
    public ObjectNode deleteClassTime(@PathVariable Integer id) {
        repository.deleteById(id);
        return Global.createSuccessMessage("Delete successful");
    }

    @PostMapping("/save-all-classTime")
    public ObjectNode saveAllClassTime(@RequestBody List<ClassTime> classTimes) {
        ArrayList<ClassTime> updateList = new ArrayList<ClassTime>();
        for (ClassTime ct : classTimes) {
            updateList.add(repository.save(ct));
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
