import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SaveDeleteCancelButtons from "../../components/save-cancel-buttons";
import { programs, subjects } from "./../../data";
import WebLayout from "../../layouts/web-layout";
import Events from "../class-time/events";
import { Batch, Program, Subject } from "../../classes/coaching";
import MyTextfield from "./../../components/form-components/my-textfield";
import { API } from "../../api";
import { apiCatch, emptyFieldChecking } from "./../../tools/helper-functions";
import { useSnackbar } from "notistack";
import DropDown from "../../components/dropdown";
import DialogLayout from "../../layouts/dialog-layout";

type CreateBatchProps = {
  batch?: Batch;
  onChange: (batch: Batch) => void;
  verifier: any;
};
type CreateBatchState = {
  subjects: Subject[];
};

export function CreateBatch(props: CreateBatchProps) {
  const { enqueueSnackbar } = useSnackbar();
  props.verifier.current = errorVerify;
  const [state, setState] = useState<CreateBatchState>({
    subjects: [],
  });
  useEffect(() => {
    API.subject
      .getAll()
      .then((res) => {
        setState({ ...state, subjects: res.data });
      })
      .catch((r) => apiCatch(enqueueSnackbar, r));
  }, []);
  function errorVerify() {
    let success = true;
    let data = [
      { label: "Batch name", field: props.batch?.name },
      { label: "Subject", field: props.batch?.subject },
      { label: "Monthly fees", field: props.batch?.monthlyFees },
    ];
    success = emptyFieldChecking(enqueueSnackbar, data);
    return success;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MyTextfield
          label="Name"
          required
          value={props.batch?.name}
          onChange={(event) =>
            props.onChange({ ...props.batch, name: event.target.value })
          }
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
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
      </Grid> */}
      <Grid item xs={12} sm={6} md={4}>
        <DropDown
          label="Select subject"
          required
          disableUserChoice
          value={props.batch?.subject}
          options={state.subjects}
          optionLabel="name"
          onChange={(event, newValue) => {
            props.onChange({ ...props.batch, subject: newValue || undefined });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <MyTextfield
          label="Monthly Fees"
          required
          type="number"
          value={props.batch?.monthlyFees}
          onChange={(event) =>
            props.onChange({
              ...props.batch,
              monthlyFees: parseInt(event.target.value),
            })
          }
        />
      </Grid>
    </Grid>
  );
}
export type CreateBatchDialogProps = {
  open: boolean;
  onClose: (event) => void;
  batch?: Batch;
  saveButtonText?: string;
  cancelButtonText?: string;
  onSaveClick?: (newBatch?: Batch) => void;
  onCancelClick?: (event) => void;
  verifier: any;
  saveLoading: boolean;
};
export default function CreateBatchDialog(props: CreateBatchDialogProps) {
  const [state, setState] = useState<{ batch?: Batch }>({
    batch: new Batch(),
  });
  useEffect(() => {
    setState({ ...state, batch: props.batch });
  }, [props.batch]);

  return (
    <DialogLayout
      title="Create a batch"
      open={props.open}
      onClose={props.onClose}
      saveButtonText={props.saveButtonText}
      onSaveButtonClick={(event) =>
        props.onSaveClick && props.onSaveClick(state.batch)
      }
      primaryButtonLoading={props.saveLoading}
    >
      <CreateBatch
        batch={state.batch}
        onChange={(newBatch) => setState({ ...state, batch: newBatch })}
        verifier={props.verifier}
      />
    </DialogLayout>
  );
}
