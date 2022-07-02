import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SaveCancelButtons from "../../components/save-cancel-buttons";
import { programs, subjects } from "./../../data";
import Admin from "./../../layouts/admin";
import Event from "./event";

type CreateBatchProps = {};
type CreateBatchState = {
  programId: number;
  subjectId: number;
};

export default function CreateBatch(props: CreateBatchProps) {
  const [state, setState] = useState<CreateBatchState>({
    programId: 0,
    subjectId: 0,
  });
  return (
    <Admin>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth variant="outlined" label="Name" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Select Program</InputLabel>
            <Select
              value={state.programId}
              label="Select Program"
              onChange={(event) => {
                setState({
                  ...state,
                  programId: event.target.value as number,
                });
                console.log(event);
              }}
            >
              <MenuItem value={0}>-- Select Program --</MenuItem>
              {programs.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Select Subject</InputLabel>
            <Select
              value={state.subjectId}
              label="Select Subject"
              onChange={(event) => {
                setState({
                  ...state,
                  subjectId: event.target.value as number,
                });
              }}
            >
              <MenuItem value={0}>-- Select Subject --</MenuItem>
              {subjects.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Monthly Fees" />
        </Grid>
        <Grid item xs={12}>
          <Event title="Class 1" />
        </Grid>
        <Grid item container>
          <SaveCancelButtons />
        </Grid>
      </Grid>
    </Admin>
  );
}
