import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SaveCancelButtons from "../../components/save-cancel-buttons";
import AddressField from "../../components/form-components/address-field";
import ContactInformation from "../../components/form-components/contact-field";
import ExamResultField from "../../components/form-components/exam-field";
import AvatarUpload from "../../components/avatar-upload";
import BasicInformation from "../../components/form-components/basic-information";
import ParentInformation from "../../components/form-components/parent-information";
import { Institution, Student } from "../../classes/person-info";
import MyTextfield from "./../../components/form-components/my-textfield";
import DropDown from "../../components/dropdown";
import { Board } from "./../../classes/person-info";
import { API } from "./../../api";

type AddStudentState = {
  boards: Board[];
  selectedBoard: Board | null;
  institutions: Institution[];
};
export default function AddStudent() {
  const [student, setStudent] = useState<Student>();
  const [state, setState] = useState<AddStudentState>({
    selectedBoard: null,
    institutions: [],
    boards: [],
  });
  useEffect(() => {
    API.board.getList().then((response) => {
      setState({ ...state, boards: response.data });
    });
  }, []);
  function loadInstitutions(board: Board | null) {
    board &&
      API.institution.getListByBoard(board.id).then((response) => {
        setState({ ...state, institutions: response.data });
      });
  }

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <BasicInformation
          person={student?.person}
          setPerson={(newPerson) =>
            setStudent({ ...student, person: newPerson })
          }
        />
      </Grid>
      <Grid item container>
        <ParentInformation
          person={student?.person}
          setPerson={(newPerson) =>
            setStudent({ ...student, person: newPerson })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Board"
          value={student?.institution?.board}
          options={state.boards}
          optionLabel="name"
          onChange={(event, newValue) => {
            setState({ ...state, selectedBoard: newValue });
            setStudent({ ...student, institution: undefined });
            loadInstitutions(newValue);
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Institution name"
          value={student?.institution}
          options={state.institutions}
          optionLabel="name"
          onChange={(event, newValue) =>
            setStudent({ ...student, institution: newValue || undefined })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Class"
          value={student?.classNo}
          options={[9, 10, 11, 12]}
          optionLabel=""
          onChange={(event, newValue) =>
            setStudent({ ...student, classNo: newValue || undefined })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield label="Class Roll" />
      </Grid>
      <Grid item xs={12}>
        <AddressField
          title="Present Address"
          value={student?.person?.presentAddress}
          onChange={(address) =>
            setStudent({
              ...student,
              person: { ...student?.person, presentAddress: address },
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <AddressField
          title="Permanent Address"
          value={student?.person?.permanentAddress}
          onChange={(address) =>
            setStudent({
              ...student,
              person: { ...student?.person, permanentAddress: address },
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
