import React from "react";
import { Grid } from "@mui/material";
import Header, { HEADER_HEIGHT } from "../components/header";

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
