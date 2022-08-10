import { Avatar, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Field } from "../../components/person-components/about";
import { API } from "../../api";
import AuthService from "../../services/auth-service";
import { Admin, getGender } from "../../classes/person-info";

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
  const [admin, setAdmin] = useState<Admin | null>();
  useEffect(() => {
    API.admin.getAdmin().then((response) => {
      setAdmin(response.data);
    });
  }, []);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5} lg={4} className={classes.justifyContent}>
        <Avatar sx={{ width: 150, height: 150 }} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid container direction="column" spacing={1}>
          <Grid item className={classes.justifyContent}>
            <Typography variant="h5">{admin?.person?.nickName}</Typography>
          </Grid>
          <Grid item>
            <Field field="Full Name" value={admin?.person?.fullName} />
          </Grid>
          <Grid item>
            <Field field="Date of birth" value={admin?.person?.dateOfBirth} />
          </Grid>
          <Grid item>
            <Field field="Gender" value={getGender(admin?.person?.gender)} />
          </Grid>
          <Grid item>
            <Field field="Blood group" value={admin?.person?.bloodGroup} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
