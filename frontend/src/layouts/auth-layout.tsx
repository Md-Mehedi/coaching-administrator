// components

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper,
} from "@mui/material";
import { DefaultTheme, makeStyles } from "@mui/styles";
import { useState } from "react";
import Redirect, { useNavigate, useMatch } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/login";
import WebLayout from "./web-layout";
import { HEADER_HEIGHT } from "./../components/header";
import SpecialLink from "./../components/special-link";
import { USER_LINKS } from "../links";
import { Theme } from "@mui/material/styles";

const useStyles: any = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    backgroundColor: "#1E293B",
    [theme.breakpoints.up("xs")]: {
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "end",
    },
  },
  paper: {
    [theme.breakpoints.up("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
    [theme.breakpoints.up("lg")]: {
      width: `40%`,
    },
    padding: 40,
    margin: 0,
  },
}));

export default function AuthLayout({ children }) {
  const classes = useStyles();
  const history = useNavigate();
  const [signOut, setSignOut] = useState(true);

  // useEffect(() => {
  //   if (AuthService.isLogin()) {
  //     setSignOut(false);
  //   }
  // }, []);
  return (
    <WebLayout>
      <Grid
        container
        alignContent="center"
        className={classes.root}
        padding={4}
      >
        <Grid className={classes.paper} component={Paper} elevation={6} square>
          {children}
        </Grid>
      </Grid>
      <Dialog open={!signOut}>
        <DialogTitle>{"You are already signed in!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(event) => {
              setSignOut(true);
              // AuthService.logout();
            }}
            color="primary"
          >
            Yes
          </Button>
          <Button
            onClick={(event) => {
              // history.goBack();
            }}
            color="primary"
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </WebLayout>
  );
}

export function ForgotPassword() {
  return (
    <SpecialLink
      href={USER_LINKS.forgotPassword.path}
      // href={
      //   history.location.pathname
      //     .split("/")
      //     .slice(0, -1)
      //     .join("/") + "/forgot-password"
      // }
      // variant="body2"
    >
      Forgot password?
    </SpecialLink>
  );
}
