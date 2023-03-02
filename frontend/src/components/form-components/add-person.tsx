import { Grid, Card, CardContent } from "@mui/material";
import React, { useRef } from "react";
import { Person } from "../../classes/person-info";
import addStudent from "../../pages/student/add-student";
import SaveDeleteCancelButtons from "../save-cancel-buttons";
import AddressField from "./address-field";
import BasicInformation from "./basic-information";
import ContactInformation from "./contact-field";
import ParentInformation from "./parent-information";
import PersonQualification from "./person-qualification-exam-details";
import { emptyFieldChecking } from "./../../tools/helper-functions";
import { Register } from "../../pages/auth/register";
import { useSnackbar } from "notistack";

export default function AddPerson({
  person,
  onChange,
  verifier,
}: {
  person?: Person;
  onChange: (newPerson: Person) => void;
  verifier?: any;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const basicInfoVerifier = useRef(null);
  const parentInfoVerifier = useRef(null);
  const qualificationVerifier = useRef(null);
  const contactVerifier = useRef(null);

  verifier.current = (enqueueSnackbar) => {
    let success = true;
    if (typeof basicInfoVerifier?.current === "function")
      // @ts-ignore
      success &= basicInfoVerifier.current(enqueueSnackbar);
    if (typeof parentInfoVerifier?.current === "function")
      // @ts-ignore
      success &= parentInfoVerifier.current(enqueueSnackbar);
    if (typeof qualificationVerifier?.current === "function")
      // @ts-ignore
      success &= qualificationVerifier.current(enqueueSnackbar);
    if (typeof contactVerifier?.current === "function")
      // @ts-ignore
      success &= contactVerifier.current(enqueueSnackbar);
    return success;
  };
  return (
    <Grid container spacing={2}>
      <Grid item container>
        <Card sx={{ width: "100%", backgroundColor: "white", color: "black" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item container>
                <BasicInformation
                  person={person}
                  setPerson={(newPerson) => onChange(newPerson)}
                  verifier={basicInfoVerifier}
                />
              </Grid>
              <Grid item container>
                <ParentInformation
                  person={person}
                  setPerson={(newPerson) => onChange(newPerson)}
                  verifier={parentInfoVerifier}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Board"
          value={state.selectedBoard}
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
          onChange={(event, newValue) => {
            if (!newValue?.board) {
              newValue = { ...newValue, board: state.selectedBoard };
            }
            setStudent({ ...student, institution: newValue || undefined });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Class"
          value={student?.classNo}
          options={["9", "10", "11", "12"]}
          optionLabel=""
          onChange={(event, newValue) =>
            setStudent({ ...student, classNo: newValue || undefined })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          label="Class Roll"
          value={student?.classRollNo}
          onChange={(event) =>
            setStudent({ ...student, classRollNo: event.target.value })
          }
        />
      </Grid> */}
      <Grid item container>
        <Card sx={{ width: "100%", backgroundColor: "white", color: "black" }}>
          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12}>
                <AddressField
                  title="Present Address"
                  value={person?.presentAddress}
                  onChange={(address) =>
                    onChange({ ...person, presentAddress: address })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <AddressField
                  title="Permanent Address"
                  value={person?.permanentAddress}
                  onChange={(address) =>
                    onChange({ ...person, permanentAddress: address })
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item container>
        <Card sx={{ width: "100%", backgroundColor: "white", color: "black" }}>
          <CardContent>
            <PersonQualification
              currentQualification={person?.currentQualification}
              onCurrentQualificationChange={(newQualification) =>
                onChange({
                  ...person,
                  currentQualification: newQualification,
                })
              }
              qualificationInfo={person?.eduQualifications}
              onChange={(newInfo) =>
                onChange({ ...person, eduQualifications: newInfo })
              }
              verifier={qualificationVerifier}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item container>
        <Card sx={{ width: "100%", backgroundColor: "white", color: "black" }}>
          <CardContent>
            <ContactInformation
              contacts={person?.contacts}
              onChange={(newContacts) =>
                onChange({ ...person, contacts: newContacts })
              }
              verifier={contactVerifier}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
