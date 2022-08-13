import { Grid, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
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
import QualificationExamResultField from "../../components/form-components/qualifiction-exam-field";
import MyTextfield from "../../components/form-components/my-textfield";
import ParentInformation from "../../components/form-components/parent-information";
import PersonQualification from "../../components/form-components/person-qualification-exam-details";
import SaveDeleteCancelButtons from "../../components/save-cancel-buttons";
import { apiCatch, showSnackbar } from "../../tools/helper-functions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddPerson from "../../components/form-components/add-person";
import { ADMIN_LINKS } from "./../../links";

type AddTeacherState = {
  boards: Board[];
  selectedBoard: Board | null;
  institutions: Institution[];
};
export default function AddTeacher() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const { enqueueSnackbar } = useSnackbar();
  const [teacher, setTeacher] = useState<Teacher>(new Teacher());
  const personVerifier = useRef(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (state) {
      setTeacher(state as Teacher);
    }
  }, [state]);

  console.log("Current teacher", teacher);

  function postTeacher() {
    if (errorVerify() && teacher) {
      setSaveLoading(true);
      let api: any = null;
      if (state) {
        api = API.teacher.update;
      } else {
        api = API.teacher.add;
      }
      api(teacher)
        .then((response) => {
          showSnackbar(enqueueSnackbar, response.data);
          setSaveLoading(false);
          navigate(ADMIN_LINKS.teacherList.path);
        })
        .catch((r) => {
          apiCatch(enqueueSnackbar, r);
          setSaveLoading(false);
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
          person={teacher.person}
          onChange={(newPerson) =>
            setTeacher({ ...teacher, person: newPerson })
          }
          verifier={personVerifier}
        />
      </Grid>
      <Grid item>
        <SaveDeleteCancelButtons
          saveButtonText={state ? "Update" : "Save"}
          loading={saveLoading}
          onSaveClick={(event) => postTeacher()}
        />
      </Grid>
    </Grid>
  );
}
