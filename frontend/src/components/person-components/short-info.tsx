import { Grid, Avatar, Typography } from "@mui/material";
import React from "react";

export default function ShortInfo() {
  return (
    <Grid
      container
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Avatar sx={{ width: 200, height: 200 }} />
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="body1">Full name </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Nickname</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Personal contact</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
