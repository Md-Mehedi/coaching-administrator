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

export interface DialogLayoutProps {
  open?: boolean;
  onClose?: (event) => void;
  children: JSX.Element | JSX.Element[];
  title?: string;
  primaryButtonText?: string;
  primaryButtonClick?: (event) => void;
  secondaryButtonText?: string;
  secondaryButtonClick?: (event) => void;
}

export default function DialogLayout(props: DialogLayoutProps) {
  return (
    <Dialog onClose={props.onClose} open={props.open || false}>
      <DialogTitle sx={{ textAlign: "center" }}>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={props.primaryButtonClick}
            >
              {props.primaryButtonText || "Save"}
            </Button>
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
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
