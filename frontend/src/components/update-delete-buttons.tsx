import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

type UpdateDeleteButtonsProps = {
  deleteLoading?: boolean;
  onUpdateClick?: (event) => void;
  onDeleteClick?: (event) => void;
  updateButtonText?: string;
  deleteButtonText?: string;
};

export default function UpdateDeleteButtons(props: UpdateDeleteButtonsProps) {
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
        <Button
          variant="contained"
          color="primary"
          onClick={props.onUpdateClick}
        >
          {props.updateButtonText || "Update"}
        </Button>
      </Grid>
      <Grid item>
        <LoadingButton
          loading={props.deleteLoading}
          loadingPosition="start"
          variant="contained"
          color="secondary"
          onClick={props.onDeleteClick}
        >
          {props.deleteButtonText || "Delete"}
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
