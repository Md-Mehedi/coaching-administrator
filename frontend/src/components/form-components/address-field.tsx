import { Grid, Typography, TextField, Autocomplete } from "@mui/material";
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
            onChange={(event, newValue) => {
              updateState({ division: newValue });
            }}
            options={divisions}
            optionLabel="name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="District"
            value={state.district}
            onChange={(event, newValue) =>
              updateState({ district: newValue, thana: null })
            }
            options={districts.filter(
              // @ts-ignore
              (item) => state.division && item.division_id == state.division.id
            )}
            optionLabel="name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="Thana"
            value={state.thana}
            onChange={(event, newValue) => updateState({ thana: newValue })}
            options={thanas.filter(
              // @ts-ignore
              (item) => state.district && item.district_id == state.district.id
            )}
            optionLabel="name"
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
