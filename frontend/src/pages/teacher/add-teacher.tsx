import { Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { API } from "../../api";
import {
  Board,
  Institution,
  Student,
  Teacher,
} from "../../classes/person-info";
import DropDown from "../../components/dropdown";
import AddressField from "../../components/form-components/address-field";
import BasicInformation from "../../components/form-components/basic-information";
import ContactInformation from "../../components/form-components/contact-field";
import ExamResultField from "../../components/form-components/exam-field";
import MyTextfield from "../../components/form-components/my-textfield";
import ParentInformation from "../../components/form-components/parent-information";
import PersonExamDetails from "../../components/form-components/person-exam-details";
import SaveCancelButtons from "../../components/save-cancel-buttons";
import { showSnackbar } from "../../tools/helper-functions";
import { useParams } from "react-router-dom";

type AddTeacherState = {
  boards: Board[];
  selectedBoard: Board | null;
  institutions: Institution[];
};
export default function AddTeacher() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [teacher, setTeacher] = useState<Teacher>(new Teacher());
  const [state, setState] = useState<AddTeacherState>({
    selectedBoard: null,
    institutions: [],
    boards: [],
  });
  useEffect(() => {
    API.institution.getUniversityList().then((response) => {
      setState({ ...state, institutions: response.data });
    });
    alert("Teacher id:" + id);
    id &&
      API.teacher.getById(parseInt(id)).then((response) => {
        setTeacher(response.data);
      });
  }, []);
  function addTeacher() {
    teacher &&
      API.teacher.add(teacher).then((response) => {
        showSnackbar(enqueueSnackbar, response.data);
      });
  }

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <BasicInformation
          person={teacher?.person}
          setPerson={(newPerson) =>
            setTeacher({ ...teacher, person: newPerson })
          }
        />
      </Grid>
      <Grid item container>
        <ParentInformation
          person={teacher?.person}
          setPerson={(newPerson) =>
            setTeacher({ ...teacher, person: newPerson })
          }
        />
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          label="Salary"
          value={teacher?.salary}
          onChange={(event) =>
            setTeacher({ ...teacher, salary: event.target.value })
          }
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Currently studying institution"
          value={teacher?.person.}
          options={state.institutions}
          optionLabel="name"
          onChange={(event, newValue) =>
            setTeacher({ ...teacher, institution: newValue || undefined })
          }
        />
      </Grid> */}
      <Grid item xs={12}>
        <AddressField
          title="Present Address"
          value={teacher?.person?.presentAddress}
          onChange={(address) =>
            setTeacher({
              ...teacher,
              person: { ...teacher?.person, presentAddress: address },
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <AddressField
          title="Permanent Address"
          value={teacher?.person?.permanentAddress}
          onChange={(address) =>
            setTeacher({
              ...teacher,
              person: { ...teacher?.person, permanentAddress: address },
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <PersonExamDetails
          examInfo={teacher?.person?.eduQualifications}
          onChange={(newInfo) =>
            setTeacher({
              ...teacher,
              person: { ...teacher?.person, eduQualifications: newInfo },
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <ContactInformation
          contacts={teacher?.person?.contacts}
          onChange={(newContacts) =>
            setTeacher({
              ...teacher,
              person: { ...teacher?.person, contacts: newContacts },
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <SaveCancelButtons onSaveClick={(event) => addTeacher()} />
      </Grid>
    </Grid>
  );
}
