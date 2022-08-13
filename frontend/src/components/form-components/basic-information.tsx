import { DatePicker } from "@mui/lab";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Person, Religion } from "../../classes/person-info";
import { blood_group, religion } from "../../data";
import AvatarUpload from "../avatar-upload";
import DropDown from "../dropdown";
import MyTextfield from "./my-textfield";
import { API } from "./../../api";
import { emptyFieldChecking } from "./../../tools/helper-functions";

const GENDERS = [
  { id: "M", name: "Male" },
  { id: "F", name: "Female" },
  { id: "O", name: "Other" },
];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export default function BasicInformation({
  person,
  setPerson,
  verifier,
}: {
  person?: Person;
  setPerson: (person: Person) => void;
  verifier?: any;
}) {
  const [religions, setReligions] = useState<Religion[]>([]);
  useEffect(() => {
    API.religion.getList().then((response) => {
      setReligions(response.data);
    });
  }, []);

  verifier.current = (enqueueSnackbar) => {
    console.log("checking", person);
    let errorCheckingFields = [
      { label: "Full name", field: person?.fullName },
      { label: "Nickname", field: person?.nickName },
      { label: "Gender", field: person?.gender },
    ];
    return emptyFieldChecking(enqueueSnackbar, errorCheckingFields);
  };

  return (
    <Grid container spacing={2}>
      <Grid item container alignItems="center">
        <AvatarUpload
          file={person?.image}
          onChange={(newFile) => setPerson({ ...person, image: newFile })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          required
          label="Full name"
          value={person?.fullName}
          onChange={(event) =>
            setPerson({ ...person, fullName: event.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          required
          label="Nickname"
          value={person?.nickName}
          onChange={(event) =>
            setPerson({ ...person, nickName: event.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          required
          label="Gender"
          disableUserChoice
          options={GENDERS}
          optionLabel="name"
          value={GENDERS.find((item) => item.id == person?.gender)}
          onChange={(event, newValue) =>
            setPerson({ ...person, gender: newValue?.id })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          label="E-mail"
          value={person?.email}
          onChange={(event) =>
            setPerson({ ...person, email: event.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DatePicker
          label="Date of birth"
          value={person?.dateOfBirth}
          onChange={(newValue) => {
            setPerson({
              ...person,
              dateOfBirth: newValue,
            });
          }}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Blood group"
          disableUserChoice
          value={person?.bloodGroup}
          options={BLOOD_GROUPS}
          optionLabel=""
          onChange={(event, newValue) =>
            setPerson({ ...person, bloodGroup: newValue || undefined })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          label="Nationality"
          value={person?.nationality}
          onChange={(event) =>
            setPerson({ ...person, nationality: event.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Religion"
          value={person?.religion}
          options={religions}
          optionLabel="name"
          onChange={(event, newValue) => {
            console.log("in religion", newValue);
            setPerson({ ...person, religion: newValue || undefined });
          }}
        />
      </Grid>
    </Grid>
  );
}
