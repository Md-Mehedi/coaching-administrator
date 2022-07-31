import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";
import CreateProgram from "../pages/program/create-program";
import { LoadingButton } from "@mui/lab";
import SaveCancelButtons from "./../components/save-cancel-buttons";

export interface DialogLayoutProps {
  open?: boolean;
  onClose?: (event) => void;
  children: JSX.Element | JSX.Element[];
  title?: string;
  primaryButtonText?: string;
  onPrimaryButtonClick?: (event) => void;
  secondaryButtonText?: string;
  onSecondaryButtonClick?: (event) => void;
  fullWidth?: boolean;
  primaryButtonLoading?: boolean;
}

export default function DialogLayout(props: DialogLayoutProps) {
  return (
    <Dialog
      onClose={props.onClose}
      open={props.open || false}
      PaperProps={{ sx: { width: props.fullWidth ? "100%" : "-1" } }}
    >
      {props.title && (
        <DialogTitle sx={{ textAlign: "center" }}>{props.title}</DialogTitle>
      )}
      <DialogContent sx={{ p: 0, m: 0 }}>
        <Grid container sx={{ padding: 2 }}>
          {props.children}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <SaveCancelButtons
            loading={props.primaryButtonLoading}
            saveButtonText={props.primaryButtonText}
            cancelButtonText={props.secondaryButtonText}
            onSaveClick={props.onPrimaryButtonClick}
            onCancelClick={(event) => {
              props.onSecondaryButtonClick &&
                props.onSecondaryButtonClick(event);
              props.onClose && props.onClose(event);
            }}
          />
          {/* <Grid item>
            <LoadingButton
            loading={}
              variant="contained"
              color="primary"
              onClick={(event) => {
                if (props.primaryButtonClick) {
                  props.primaryButtonClick(event);
                }
              }}
            >
              {props.primaryButtonText || "Save"}
            </LoadingButt>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={(event) => {
                props.onClose && props.onClose(event);
                props.secondaryButtonClick && props.secondaryButtonClick(event);
              }}
            >
              {props.secondaryButtonText || "Cancel"}
            </Button>
          </Grid> */}
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
