import { Email, Facebook, WhatsApp, YouTube } from "@mui/icons-material";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import TextEditor from "../../components/text-editor";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

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

export default function CoachingInformationOutput() {
  const classes = useStyle();
  return (
    <Grid container spacing={3} className={classes.justifyContent}>
      <Grid item xs={12} md={5} lg={4} className={classes.justifyContent}>
        <Avatar sx={{ width: 200, height: 200 }} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <Grid
          container
          direction="column"
          spacing={2}
          className={classes.justifyContent}
        >
          <Grid item>
            <Typography variant="h5">Coaching Name</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">Address</Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            spacing={2}
            alignItems="center"
            className={classes.justifyContent}
          >
            <Grid item>
              <IconButton>
                <Facebook />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <WhatsApp />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <YouTube />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <Email />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextEditor readOnly />
      </Grid>
    </Grid>
  );
}
