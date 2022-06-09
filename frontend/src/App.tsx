import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import Router from "./routes";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <Router />
        </React.StrictMode>
      </ThemeProvider>
    </div>
  );
}

export default App;
