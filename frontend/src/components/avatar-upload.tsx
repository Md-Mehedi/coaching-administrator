import { Grid, Avatar, Button } from "@mui/material";
import React from "react";

export default function AvatarUpload() {
  return (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item>
        <Avatar sx={{ width: 200, height: 200 }} />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Upload Picture
        </Button>
      </Grid>
    </Grid>
  );
}
