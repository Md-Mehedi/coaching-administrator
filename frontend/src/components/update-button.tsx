import React from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

export default function UpdateButton() {
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
        <Button variant="contained" color="primary">
          Update
        </Button>
      </Grid>
    </Grid>
  );
}
