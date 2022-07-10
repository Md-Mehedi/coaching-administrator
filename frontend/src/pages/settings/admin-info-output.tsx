import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Field } from "../../components/person-components/about";

const useStyle = makeStyles((theme: Theme) => ({
  justifyContent: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.up("md")]: {
      alignItems: "start",
      justifyContent: "start",
    },
  },
}));
export default function AdminInformationOutput() {
  const classes = useStyle();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5} lg={4} className={classes.justifyContent}>
        <Avatar sx={{ width: 150, height: 150 }} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container direction="column" spacing={1}>
          <Grid item className={classes.justifyContent}>
            <Typography variant="h5">Nickname</Typography>
          </Grid>
          <Grid item>
            <Field field="Full Name" value="Kazi Wasif Amin Shammya" />
          </Grid>
          <Grid item>
            <Field field="Date of birth" value="30/05/1999" />
          </Grid>
          <Grid item>
            <Field field="Gender" value="Male" />
          </Grid>
          <Grid item>
            <Field field="Blood group" value="O+" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
