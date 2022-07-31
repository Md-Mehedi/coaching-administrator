import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

type SaveCancelButtonsProps = {
  loading?: boolean;
  onSaveClick?: (event) => void;
  onCancelClick?: (event) => void;
  saveButtonText?: string;
  cancelButtonText?: string;
};

export default function SaveCancelButtons(props: SaveCancelButtonsProps) {
  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <LoadingButton
          loading={props.loading}
          loadingPosition="start"
          variant="contained"
          color="primary"
          onClick={props.onSaveClick}
        >
          {props.saveButtonText || "Save"}
        </LoadingButton>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={props.onCancelClick}
        >
          {props.cancelButtonText || "Cancel"}
        </Button>
      </Grid>
    </Grid>
  );
}
