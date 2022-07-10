import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { AddCircle, DeleteForever, RemoveCircle } from "@mui/icons-material";
import DialogLayout, { DialogLayoutProps } from "../layouts/dialog-layout";

export interface AddDialogProps extends DialogLayoutProps {
  button?: {
    icon?: JSX.Element;
    buttonLabel?: string;
  };
  title?: string;
  children: JSX.Element | JSX.Element[];
  saveButtonClick?: (event) => void;
  cancelButtonClick?: (event) => void;
}

export default function AddDialog(props: AddDialogProps) {
  const [state, setState] = useState({ open: false, value: 2 });
  return (
    <>
      <Button
        variant="contained"
        startIcon={props?.button?.icon || <AddCircle />}
        onClick={(event) => {
          setState({ ...state, open: true });
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        {props?.button?.buttonLabel || "Add"}
      </Button>
      <DialogLayout
        {...props}
        title={props.title}
        open={state.open}
        onClose={(event) => {
          setState({ ...state, open: false });
          props.onClose && props.onClose(event);
          event.stopPropagation();
        }}
        primaryButtonClick={props.saveButtonClick}
        secondaryButtonClick={props.cancelButtonClick}
      >
        {props?.children}
      </DialogLayout>
    </>
  );
}
