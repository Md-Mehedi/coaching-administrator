// components

import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import Redirect, { useNavigate, useMatch } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/login";
import WebLayout from "./web-layout";

const useStyles: any = makeStyles((theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    padding: "30px 0px",
  },
}));

export default function AuthLayout({ children }) {
  const classes = useStyles();
  const history = useNavigate();
  let match = useMatch;
  const [signOut, setSignOut] = useState(true);

  // useEffect(() => {
  //   if (AuthService.isLogin()) {
  //     setSignOut(false);
  //   }
  // }, []);
  return (
    <WebLayout>
      <main>
        <div
          // className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{
            // height: "100vw",
            backgroundColor: "#1E293B",
            backgroundSize: "100vw",
            // backgroundImage: `url(${auth_bg})`,
          }}
        >
          <Grid
            container
            alignContent="center"
            className={classes.root}
            justifyContent="center"
          >
            {children}
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
        </div>
      </main>
    </WebLayout>
  );
}
