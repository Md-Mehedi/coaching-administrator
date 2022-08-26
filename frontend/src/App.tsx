import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SnackbarProvider } from "notistack";
import React from "react";
import "./index.css";
import Router from "./routes";
import CSVProvider from "./services/csv-hook";
import { lightTheme } from "./theme";

export const moment = require("moment");
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <LocalizationProvider
          // @ts-ignore
          dateAdapter={AdapterDateFns}
        >
          <SnackbarProvider maxSnack={3}>
            <CSVProvider>
              {/* <React.StrictMode> */}
              <Router />
              {/* </React.StrictMode> */}
            </CSVProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
