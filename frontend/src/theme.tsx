import * as React from "react";
import ReactDOM from "react-dom";
import { red } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    secondary: {
      main: red[500],
    },
  },
});
