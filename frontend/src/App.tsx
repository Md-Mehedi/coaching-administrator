import { ThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import "./index.css";
import Router from "./routes";
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
          <React.StrictMode>
            <Router />
          </React.StrictMode>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
