import { Avatar, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Field } from "../../components/person-components/about";
import { API } from "../../api";
import AuthService from "../../services/auth-service";
import { Admin, getGender } from "../../classes/person-info";
import SpecialLink from "./../../components/special-link";
import AdminCoachingInput from "./../auth/admin-coaching-input";
import { USER_LINKS } from "../../links";
import { resolveURL } from "../../tools/helper-functions";

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
    setAdmin(AuthService.getAdmin());
  }, []);
  console.log("in admin output", admin);
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item container spacing={3}>
        <Grid item xs={12} md={5} lg={4} className={classes.justifyContent}>
          <Avatar
            sx={{ width: 150, height: 150 }}
            src={resolveURL(admin?.person?.image)}
          />
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
      <Grid item container justifyContent="center">
        <SpecialLink href={USER_LINKS.adminCoachingInput.path}>
          <Button variant="contained">Update</Button>
        </SpecialLink>
      </Grid>
    </Grid>
  );
}
