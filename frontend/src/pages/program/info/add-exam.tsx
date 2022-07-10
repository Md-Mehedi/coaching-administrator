import {
  AddCircleOutline,
  ArrowDownward,
  DeleteForever,
} from "@mui/icons-material";
import {
  Grid,
  TextField,
  Typography,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import DropDown from "../../../components/dropdown";
import SaveCancelButtons from "../../../components/save-cancel-buttons";
import TextEditor from "../../../components/text-editor";
import { examTypes } from "../../../data";
import AdminLayout from "../../../layouts/admin-layout";
import Events from "../../batch/events";

function ExamTypeMark(props) {
  const [state, setState] = useState({
    type: null,
    mark: "0",
  });
  const data = [
    { value: 1, label: "CQ" },
    { value: 2, label: "MCQ" },
    { value: 3, label: "Other" },
    { value: 4, label: "Short Question" },
  ];
  function updateState(object) {
    setState({ ...state, ...object });
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <DropDown
          label="Exam Type"
          value={state.type}
          onChange={(event, newValue) => updateState({ type: newValue })}
          options={data}
          optionLabel="label"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          variant="outlined"
          label="Mark"
          defaultValue={state.mark}
          onChange={(event) => updateState({ mark: event.target.value })}
          onBlur={(event) => updateState({ mark: event.target.value })}
        />
      </Grid>
    </Grid>
  );
}
function ExamSubject() {
  const [state, setState] = useState({
    subject: null,
  });
  const data = [
    { value: 1, label: "Physics" },
    { value: 2, label: "Chemistry" },
    { value: 3, label: "Biology" },
    { value: 4, label: "Mathematics" },
    { value: 5, label: "Higher Mathematics" },
  ];
  function updateState(object) {
    setState({ ...state, ...object });
  }
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDownward />}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={10} md={6}>
            <DropDown
              label="Subject"
              value={state.subject}
              onChange={(event, newValue) => {
                updateState({ subject: newValue });
                event.preventDefault();
                event.stopPropagation();
              }}
              options={data}
              optionLabel="label"
            />
          </Grid>
          <Grid item>
            <IconButton>
              <DeleteForever />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="row" spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container direction="column" spacing={1}>
                <Grid item></Grid>
                <Grid item>
                  <ExamTypeMark />
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Button variant="contained" startIcon={<AddCircleOutline />}>
                    Add More Type
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="h6">Syllabus</Typography>
              <TextEditor />
            </Grid>
          </Grid>
          <Grid item container>
            <Events disableMoreClass disableRepeat />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default function AddExam() {
  const [state, setState] = useState({
    examType: 0,
  });
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField fullWidth variant="outlined" label="Exam Name" />
      </Grid>
      <Grid item>
        <ExamSubject />
        <ExamSubject />
        <ExamSubject />
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Button variant="contained" startIcon={<AddCircleOutline />}>
          Add More Subject
        </Button>
      </Grid>
    </Grid>
  );
}
