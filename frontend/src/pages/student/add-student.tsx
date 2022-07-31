import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
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
import QualificationExamResultField from "../../components/form-components/qualifiction-exam-field";
import AvatarUpload from "../../components/avatar-upload";
import BasicInformation from "../../components/form-components/basic-information";
import ParentInformation from "../../components/form-components/parent-information";
import { Institution, Student } from "../../classes/person-info";
import MyTextfield from "./../../components/form-components/my-textfield";
import DropDown from "../../components/dropdown";
import { Board } from "./../../classes/person-info";
import { API } from "./../../api";
import { showSnackbar } from "../../tools/helper-functions";
import { useSnackbar } from "notistack";
import PersonQualification from "../../components/form-components/person-qualification-exam-details";
import AddPerson from "./../../components/form-components/add-person";
import { apiCatch } from "./../../tools/helper-functions";
import { useLocation } from "react-router-dom";

type AddStudentState = {
  boards: Board[];
  selectedBoard: Board | null;
  institutions: Institution[];
};
export default function AddStudent() {
  const { state } = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [student, setStudent] = useState<Student>(new Student());
  const personVerifier = useRef(null);
  const [saveLoading, setLoading] = useState(false);

  console.log("Current student", student);

  function postStudent() {
    setLoading(true);
    if (errorVerify() && student) {
      let api: any = null;
      if (state) {
        api = API.student.update;
      } else {
        api = API.student.add;
      }
      api(student)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setLoading(false);
        })
        .catch((r) => {
          apiCatch(enqueueSnackbar, r);
          setLoading(false);
        });
    }
  }

  function errorVerify() {
    let success = true;
    if (typeof personVerifier?.current === "function")
      // @ts-ignore
      success &= personVerifier.current(enqueueSnackbar);
    return success;
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <AddPerson
          person={student.person}
          onChange={(newPerson) =>
            setStudent({ ...student, person: newPerson })
          }
          verifier={personVerifier}
        />
      </Grid>
      <Grid item>
        <SaveCancelButtons
          saveButtonText={state ? "Update" : "Save"}
          loading={saveLoading}
          onSaveClick={(event) => postStudent()}
        />
      </Grid>
    </Grid>
  );
}
