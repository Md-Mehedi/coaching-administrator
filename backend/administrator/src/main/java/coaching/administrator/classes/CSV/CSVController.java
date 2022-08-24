
package coaching.administrator.classes.CSV;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Person.PersonRepository;
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
@CrossOrigin(origins = Global.FRONTEND_PATH, maxAge = 3600)
public class CSVController {

  @Autowired
  CSVServices services;

  @Autowired
  ObjectMapper mapper;

  private String parseError(List<String> list) {
    String error = "";
    for (int i = 0; i < list.size(); i++) {
      if (i != 0) {
        error += ", ";
      }
      error += "ERROR-" + (i + 1) + ": " + list.get(i);
    }
    return error;
  }

  @PreAuthorize("hasRole('COACHING_ADMIN')")
  @PostMapping("/import-students")
  public ObjectNode importStudents(@RequestPart("object") HashMap<String, String> object[]) {
    ObjectNode node = mapper.createObjectNode();
    for (int i = 1; i < object.length; i++) {
      if (object[i] == null)
        continue;
      List<String> errorList = services.addStudent(object[i]);
      if (errorList.size() > 0)
        node.put("" + i, parseError(errorList));
    }
    System.out.println(node);
    return node;
  }

}
