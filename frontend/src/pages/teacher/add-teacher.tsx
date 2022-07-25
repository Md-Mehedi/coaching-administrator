import { Grid, TextField } from "@mui/material";
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
import SaveCancelButtons from "../../components/save-cancel-buttons";

type AddTeacherState = {
  boards: Board[];
  selectedBoard: Board | null;
  institutions: Institution[];
};
export default function AddTeacher() {
  const [teacher, setTeacher] = useState<Teacher>();
  const [state, setState] = useState<AddTeacherState>({
    selectedBoard: null,
    institutions: [],
    boards: [],
  });
  useEffect(() => {
    API.institution.getUniversityList().then((response) => {
      setState({ ...state, institutions: response.data });
    });
  }, []);

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
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Currently studying institution"
          value={teacher?.person.ins}
          options={state.institutions}
          optionLabel="name"
          onChange={(event, newValue) =>
            setTeacher({ ...teacher, institution: newValue || undefined })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Class"
          value={teacher?.classNo}
          options={[9, 10, 11, 12]}
          optionLabel=""
          onChange={(event, newValue) =>
            setTeacher({ ...teacher, classNo: newValue || undefined })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield label="Class Roll" />
      </Grid>
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
        <ExamResultField title="JSC Exam Information" />
      </Grid>
      <Grid item xs={12}>
        <ExamResultField title="SSC Exam Information" />
      </Grid>
      <Grid item xs={12}>
        <ContactInformation />
      </Grid>
      <Grid item xs={12}>
        <SaveCancelButtons />
      </Grid>
    </Grid>
  );
}
