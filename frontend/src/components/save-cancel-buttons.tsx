import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

type SaveCancelButtonsProps = {
  onSaveClick?: (event) => void;
  onCancelClick?: (event) => void;
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
        <Button variant="contained" color="primary" onClick={props.onSaveClick}>
          Save
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={props.onCancelClick}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
}
