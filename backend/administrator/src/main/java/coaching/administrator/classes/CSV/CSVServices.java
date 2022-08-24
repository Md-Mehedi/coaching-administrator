package coaching.administrator.classes.CSV;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import coaching.administrator.classes.Address.Address;
import coaching.administrator.classes.Coaching.Coaching;
import coaching.administrator.classes.ContactType.ContactTypeRepository;
import coaching.administrator.classes.Department.Department;
import coaching.administrator.classes.Department.DepartmentRepository;
import coaching.administrator.classes.EduQualification.EduQualification;
import coaching.administrator.classes.Exam.QualificationExam;
import coaching.administrator.classes.Exam.QualificationExamRepository;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Institution.Institution;
import coaching.administrator.classes.Institution.InstitutionRepository;
import coaching.administrator.classes.Occupation.Occupation;
import coaching.administrator.classes.Occupation.OccupationRepository;
import coaching.administrator.classes.Person.Person;
import coaching.administrator.classes.PersonContact.PersonContact;
import coaching.administrator.classes.Religion.Religion;
import coaching.administrator.classes.Religion.ReligionRepository;
import coaching.administrator.classes.Security.jwt.JwtUtils;
import coaching.administrator.classes.Student.Student;
import coaching.administrator.classes.Student.StudentRepository;
import coaching.administrator.classes.Upazila.Upazila;
import coaching.administrator.classes.Upazila.UpazilaRepository;

@Service
public class CSVServices {

  @Autowired
  private ReligionRepository religionRepository;

  @Autowired
  private OccupationRepository occupationRepository;

  @Autowired
  private UpazilaRepository upazilaRepository;

  @Autowired
  private QualificationExamRepository qualificationExamRepository;

  @Autowired
  private InstitutionRepository institutionRepository;

  @Autowired
  private DepartmentRepository departmentRepository;

  @Autowired
  private ContactTypeRepository contactTypeRepository;

  @Autowired
  private StudentRepository studentRepository;

  public enum ERROR {
    DATE_OF_BIRTH("Date of birth is not valid"),
    PRESENT_DIVISION("Present Address : Division is not valid"),
    PRESENT_DISTRICT("Present Address : District is not valid"),
    PRESENT_UPAZILA("Present Address : Upazila is not valid"),
    PERMANENT_DIVISION("Permanent Address : Division is not valid"),
    PERMANENT_DISTRICT("Permanent Address : District is not valid"),
    PERMANENT_UPAZILA("Permanent Address : Upazila is not valid"),

    ;

    String message;

    ERROR(String message) {
      this.message = message;
    }
  }

  private void addError(List<String> str, String error) {
    str.add(error);
  }

  public List<String> addStudent(HashMap<String, String> object) {
    for (String key : object.keySet()) {
      System.out.println(key + " : " + object.get(key));

    }
    List<String> errorList = new ArrayList<>();
    // return errorList;
    Person person = new Person();
    person.setFullName(object.get("Full name"));
    person.setNickName(object.get("Nickname"));
    if (!object.get("Gender").equals("M") && object.get("Gender").equals("F")) {
      addError(errorList, "Gender should be 'M' or 'F'");
    } else {
      person.setGender(object.get("Gender"));
    }
    person.setEmail(object.get("Email"));
    if (object.get("Date of birth(dd-mm-yyyy)") != "") {
      try {
        String pattern = "dd-MM-yyyy";
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
        Date date = simpleDateFormat.parse(object.get("Date of birth(dd-mm-yyyy)"));
        person.setDateOfBirth(date);
      } catch (Exception e) {
        addError(errorList, "Date of birth is not in valid format");
      }
    }
    person.setBloodGroup(object.get("Blood group"));
    person.setNationality(object.get("Nationality"));

    Religion religion = religionRepository.findByName(object.get("Religion"));
    if (religion == null) {
      religion = new Religion();
      religion.setName(object.get("Religion"));
    }
    person.setReligion(religion);

    person.setFatherName(object.get("Father's name"));

    if (object.get("Father's Occupation") != "") {
      Occupation occupation = occupationRepository.findByName(object.get("Father's Occupation"));
      if (occupation == null) {
        addError(errorList, "Father's occupation is not found in database");
      } else {
        person.setFatherOccupation(occupation);
      }
    }

    person.setMotherName(object.get("Mother's name"));
    if (object.get("Mother's Occupation") != "") {
      Occupation occupation = occupationRepository.findByName(object.get("Mother's Occupation"));
      if (occupation == null) {
        addError(errorList, "Mother's occupation is not found in database");
      } else {
        person.setMotherOccupation(occupation);
      }
    }

    Address present = new Address();

    if (object.get("Present Address (Upazila)") != "") {
      Upazila presentUpazila = upazilaRepository.findByName(object.get("Present Address (Upazila)"));
      if (presentUpazila == null) {
        addError(errorList, "Present Address : Upazila is not valid");
      }
      present.setUpazila(presentUpazila);
    }
    present.setVillage(object.get("Present Address (House no/Road no)"));
    person.setPresentAddress(present);

    Address permanent = new Address();
    if (object.get("Permanent Address (Upazila)") != "") {
      Upazila permanentUpazila = upazilaRepository.findByName(object.get("Permanent Address (Upazila)"));
      if (permanentUpazila == null) {
        addError(errorList, "Permanent Address : Upazila is not valid");
      }
      permanent.setUpazila(permanentUpazila);
    }
    permanent.setVillage(object.get("Permanent Address (House no/Road no)"));
    person.setPermanentAddress(permanent);

    // Qualification
    EduQualification current = new EduQualification();
    if (object.get("Currently studying (Exam name)") != "") {
      QualificationExam currentExam = qualificationExamRepository
          .findByName(object.get("Currently studying (Exam name)"));
      if (currentExam == null) {
        addError(errorList, "Currently studying (Exam name) is not valid");
      }
      current.setQualificationExam(currentExam);
    } else {
      addError(errorList, "Currently studying (Exam name) is not found");
    }
    if (object.get("Currently studying (Institution name)") != "") {
      Institution currentInstitution = institutionRepository
          .findByName(object.get("Currently studying (Institution name)"));
      if (currentInstitution == null) {
        addError(errorList, "Currently studying (Institution name) is not valid");
      }
      current.setInstitution(currentInstitution);
    } else {
      addError(errorList, "Currently studying (Institution) is not found");
    }
    if (object.get("Currently studying (Group/Department name)") != "") {
      Department currentDepartment = departmentRepository
          .findByName(object.get("Currently studying (Group/Department name)"));
      if (currentDepartment == null) {
        addError(errorList, "Currently studying (Group/Department name) is not valid");
      }
      current.setDepartment(currentDepartment);
    } else {
      addError(errorList, "Currently studying (Group/Department) is not found");
    }
    person.setCurrentQualification(current);

    Set<EduQualification> qualifications = new HashSet<EduQualification>();
    if (object.get("JSC Institution name") != "") {
      EduQualification jsc = new EduQualification();
      QualificationExam jscExam = qualificationExamRepository
          .findByName("JSC");
      jsc.setQualificationExam(jscExam);
      Institution jscInstitution = institutionRepository
          .findByName(object.get("JSC Institution name"));
      if (jscInstitution == null) {
        addError(errorList, "JSC Institution name is not valid");
      }
      jsc.setInstitution(jscInstitution);
      Department jscDepartment = departmentRepository
          .findByName(object.get("JSC Group name"));
      if (jscDepartment == null) {
        addError(errorList, "JSC Group name is not valid");
      }
      jsc.setDepartment(jscDepartment);
      try {
        jsc.setPassingYear(Integer.parseInt(object.get("JSC Passing year")));
      } catch (Exception e) {
        addError(errorList, "JSC Passing year is not valid");
      }
      jsc.setResult((object.get("JSC Result")));
      qualifications.add(jsc);
    }

    if (object.get("SSC Institution name") != "") {
      EduQualification ssc = new EduQualification();
      QualificationExam sscExam = qualificationExamRepository
          .findByName("SSC");
      ssc.setQualificationExam(sscExam);
      Institution sscInstitution = institutionRepository
          .findByName(object.get("SSC Institution name"));
      if (sscInstitution == null) {
        addError(errorList, "SSC Institution name is not valid");
      }
      ssc.setInstitution(sscInstitution);
      Department sscDepartment = departmentRepository
          .findByName(object.get("SSC Group name"));
      if (sscDepartment == null) {
        addError(errorList, "SSC Group name is not valid");
      }
      ssc.setDepartment(sscDepartment);
      try {
        ssc.setPassingYear(Integer.parseInt(object.get("SSC Passing year")));
      } catch (Exception e) {
        addError(errorList, "SSC Passing year is not valid");
      }
      ssc.setResult((object.get("SSC Result")));
      qualifications.add(ssc);
    }

    if (object.get("SSC Institution name") != "") {
      EduQualification hsc = new EduQualification();
      QualificationExam hscExam = qualificationExamRepository
          .findByName("HSC");
      hsc.setQualificationExam(hscExam);
      Institution hscInstitution = institutionRepository
          .findByName(object.get("HSC Institution name"));
      if (hscInstitution == null) {
        addError(errorList, "HSC Institution name is not valid");
      }
      hsc.setInstitution(hscInstitution);
      Department hscDepartment = departmentRepository
          .findByName(object.get("HSC Group name"));
      if (hscDepartment == null) {
        addError(errorList, "HSC Group name is not valid");
      }
      hsc.setDepartment(hscDepartment);
      try {
        hsc.setPassingYear(Integer.parseInt(object.get("HSC Passing year")));
      } catch (Exception e) {
        addError(errorList, "HSC Passing year is not valid");
      }
      hsc.setResult((object.get("HSC Result")));
      qualifications.add(hsc);
    }
    person.setEduQualifications(qualifications);

    // Contacts
    PersonContact personal = new PersonContact();
    personal.setContactType(contactTypeRepository.findByName("Personal"));
    personal.setNumber(object.get("Personal number"));
    PersonContact father = new PersonContact();
    father.setContactType(contactTypeRepository.findByName("Father"));
    father.setNumber(object.get("Father number"));
    PersonContact mother = new PersonContact();
    mother.setContactType(contactTypeRepository.findByName("Mother"));
    mother.setNumber(object.get("Mother number"));
    Set<PersonContact> contacts = new HashSet<PersonContact>();
    contacts.add(personal);
    contacts.add(father);
    contacts.add(mother);
    person.setContacts(contacts);

    Student student = new Student();
    student.setPerson(person);

    if (errorList.size() == 0) {
      Global.colorPrint(student);
      Coaching coaching = new Coaching();
      coaching.setId(JwtUtils.getCoachingId());
      student.getPerson().setCoaching(coaching);
      student.getPerson().setJoiningDate(new Date());
      studentRepository.save(student);
      studentRepository.flush();
    }
    return errorList;
  }

}
