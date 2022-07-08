import { Grid, Typography, TextField } from "@mui/material";
import { useState } from "react";
import { Address } from "../../classes/person-info";
import DropDown from "../dropdown";
import { districts, divisions, thanas } from "./../../data";

export type AddressFieldProps = {
  title: string;
  onChange?: (value) => void;
};

export default function AddressField(props: AddressFieldProps) {
  const [state, setState] = useState({
    division: null,
    district: null,
    thana: null,
    village: "",
  });
  function updateState(object) {
    setState({ ...state, ...object });
    props.onChange && props.onChange(state);
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="Division"
            value={state.division}
            onChange={(event) =>
              updateState({
                division: event.target.value,
                district: null,
                thana: null,
              })
            }
            data={divisions.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="District"
            value={state.district}
            onChange={(event) =>
              updateState({ district: event.target.value, thana: null })
            }
            data={districts
              .filter((item) => item.division_id == state.division)
              .map((item) => ({
                value: item.id,
                label: item.name,
              }))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="Thana"
            value={state.thana}
            onChange={(event) => updateState({ thana: event.target.value })}
            data={thanas
              .filter((item) => item.district_id == state.district)
              .map((item) => ({
                value: item.id,
                label: item.name,
              }))}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="House no / Road no / Village"
            defaultValue={state.village}
            onChange={(event) => {
              updateState({ village: event.target.value });
            }}
            onBlur={(event) => {
              updateState({ village: event.target.value });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
