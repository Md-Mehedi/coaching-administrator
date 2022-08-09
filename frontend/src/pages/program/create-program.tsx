import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SaveDeleteCancelButtons from "../../components/save-cancel-buttons";
import { programs, subjects } from "./../../data";
import AdminLayout from "../../layouts/admin-layout";
import TextEditor from "./../../components/text-editor";
import MyTextfield from "./../../components/form-components/my-textfield";
import { emptyFieldChecking } from "./../../tools/helper-functions";
import { useSnackbar } from "notistack";
import DialogLayout from "../../layouts/dialog-layout";
import { Program } from "../../classes/coaching";

type CreateProgramProps = {
  program?: Program;
  onChange: (program: Program) => void;
  verifier: any;
};

function CreateProgram(props: CreateProgramProps) {
  const { enqueueSnackbar } = useSnackbar();
  props.verifier.current = errorVerify;

  function errorVerify() {
    let success = true;
    let data = [{ label: "Program name", field: props.program?.name }];
    success = emptyFieldChecking(enqueueSnackbar, data);
    return success;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MyTextfield
          required
          label="Program Name"
          value={props.program?.name}
          onChange={(event) =>
            props.onChange &&
            props.onChange({ ...props.program, name: event.target.value })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextEditor
          label={"Description"}
          value={props.program?.description}
          onChange={(newValue) =>
            props.onChange &&
            props.onChange({ ...props.program, description: newValue })
          }
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
        <MyTextfield label="Admission Fees" />
      </Grid> */}
    </Grid>
  );
}

export type CreateProgramDialogProps = {
  open: boolean;
  onClose: (event) => void;
  program?: Program;
  saveButtonText?: string;
  cancelButtonText?: string;
  onSaveClick?: (newProgram?: Program) => void;
  onCancelClick?: (event) => void;
  verifier: any;
  saveLoading: boolean;
};
export default function CreateProgramDialog(props: CreateProgramDialogProps) {
  const [state, setState] = useState<{ program?: Program }>({
    program: new Program(),
  });
  useEffect(() => {
    setState({ ...state, program: props.program });
  }, [props.program]);

  return (
    <DialogLayout
      open={props.open}
      onClose={props.onClose}
      saveButtonText={props.saveButtonText}
      onSaveButtonClick={(event) =>
        props.onSaveClick && props.onSaveClick(state.program)
      }
      primaryButtonLoading={props.saveLoading}
    >
      <CreateProgram
        program={state.program}
        onChange={(newProgram) => setState({ ...state, program: newProgram })}
        verifier={props.verifier}
      />
    </DialogLayout>
  );
}
