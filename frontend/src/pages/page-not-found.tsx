import { Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export default function PageNotFound() {
  const location = useLocation();
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h1" align="center">
          404
        </Typography>
        <Typography variant="h2" align="center">
          PAGE <br /> NOT <br /> FOUND
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" align="center" color="red">
          {location.pathname}
        </Typography>
      </Grid>
    </Grid>
  );
}
