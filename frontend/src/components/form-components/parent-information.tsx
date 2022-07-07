import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { occupation } from "../../data";

export default function ParentInformation() {
  const [state, setState] = useState({
    fatherOccupation: occupation[0],
    motherOccupation: occupation[1],
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Father's name" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Mother's name" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Father Occupation
          </InputLabel>
          <Select
            value={state.fatherOccupation}
            label="Father Occupation"
            onChange={(event) =>
              setState({ ...state, fatherOccupation: event.target.value })
            }
          >
            {occupation.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Mother Occupation
          </InputLabel>
          <Select
            value={state.motherOccupation}
            label="Mother Occupation"
            onChange={(event) =>
              setState({ ...state, motherOccupation: event.target.value })
            }
          >
            {occupation.map((item) => (
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
