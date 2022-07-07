import { DatePicker } from "@mui/lab";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { blood_group, religion } from "../../data";
import AvatarUpload from "../avatar-upload";

export default function BasicInformation() {
  const [state, setState] = useState({
    gender: "M",
    dob: null,
    bloodGroup: blood_group[0],
    religion: religion[0],
  });
  return (
    <Grid container spacing={2}>
      <Grid item container alignItems="center">
        <AvatarUpload />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Full name" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Nickname" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            value={state.gender}
            label="Gender"
            onChange={(event) =>
              setState({ ...state, gender: event.target.value })
            }
          >
            <MenuItem value={"M"}>Male</MenuItem>
            <MenuItem value={"F"}>Female</MenuItem>
            <MenuItem value={"O"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="E-mail" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DatePicker
          label="Date of birth"
          value={state.dob}
          onChange={(newValue) => {
            setState({
              ...state,
              dob: newValue,
            });
          }}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Blood group</InputLabel>
          <Select
            value={state.bloodGroup}
            label="Blood group"
            onChange={(event) =>
              setState({ ...state, bloodGroup: event.target.value })
            }
          >
            {blood_group.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Nationality" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Religion</InputLabel>
          <Select
            value={state.religion}
            label="Religion"
            onChange={(event) =>
              setState({ ...state, religion: event.target.value })
            }
          >
            {religion.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
