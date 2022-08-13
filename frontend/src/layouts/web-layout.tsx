import React from "react";
import { Grid } from "@mui/material";
import Header, { HEADER_HEIGHT } from "../components/header";
import AuthService from "./../services/auth-service";

export default function WebLayout(props) {
  return (
    <>
      <Header />
      <Grid
        container
        sx={{ mt: `${HEADER_HEIGHT}px` }}
        justifyContent="center"
        alignItems="center"
      >
        {props.children}
      </Grid>
    </>
  );
}
