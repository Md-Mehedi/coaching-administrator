import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Person } from "../../classes/person-info";
import { occupation } from "../../data";
import MyTextfield from "./my-textfield";
import { Occupation } from "./../../classes/person-info";
import DropDown from "../dropdown";
import { API } from "./../../api";

export default function ParentInformation({
  person,
  setPerson,
}: {
  person?: Person;
  setPerson: (person: Person) => void;
}) {
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  useEffect(() => {
    API.occupation.getList().then((response) => {
      setOccupations(response.data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          label="Father's name"
          value={person?.fatherName}
          onChange={(event) =>
            setPerson({ ...person, fatherName: event.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Father Occupation"
          options={occupations}
          optionLabel={"name"}
          onChange={(event, newValue) =>
            setPerson({ ...person, fatherOccupation: newValue || undefined })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          label="Mother's name"
          value={person?.motherName}
          onChange={(event) =>
            setPerson({ ...person, motherName: event.target.value })
          }
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Mother Occupation"
          options={occupations}
          optionLabel={"name"}
          onChange={(event, newValue) =>
            setPerson({ ...person, motherOccupation: newValue || undefined })
          }
        />
      </Grid>
    </Grid>
  );
}
