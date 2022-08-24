import React, { useState, useEffect, useContext } from "react";
import { useSnackbar } from "notistack";
import { Grid, Button, Typography } from "@mui/material";
import DialogLayout from "../layouts/dialog-layout";
import CSVDownloader from "../tools/csv/csv-downloader";
import { csvTemplate, parseCSV } from "../tools/csv/csv-template";
import CSVUploader from "../tools/csv/csv-uploader";
import {
  createMultipartFromObject,
  showSnackbar,
} from "../tools/helper-functions";

/**
 * Initializing Context
 */
export type CSVContextType = {
  templateFileName: string;
  templateData: string[];
  importData: string[][];
  dialogOpen: boolean;
  dialogTitle: string;
  api: any;
  errorList: string[][];
};
const CSVContextDefaultData: CSVContextType = {
  templateFileName: "",
  templateData: [],
  importData: [],
  dialogOpen: false,
  dialogTitle: "",
  api: (data) => {},
  errorList: [],
};
export const CSVContext = React.createContext<{
  state: CSVContextType;
  setState: (state: CSVContextType) => void;
  openDialog: () => void;
}>({
  state: CSVContextDefaultData,
  setState: (state) => {},
  openDialog: () => {},
});

/**
 * Creating provider with default state
 * - holds the state for the message used everywhere in the App
 * - takes children parameter because it needs to render the children of the context
 * - updateMessage can be used from any child of provider and will update the global state
 */
export default function CSVProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState<CSVContextType>(CSVContextDefaultData);
  function openDialog() {
    setState({ ...state, dialogOpen: true });
  }
  function prepareCSVforErrorEntries(errorList) {
    let csvData: string[][] = [];
    csvData.push([...state.importData[0], "Error Description"]);
    for (const property in errorList) {
      csvData.push([...state.importData[property], errorList[property]]);
    }
    console.log(csvData);
    setState({ ...state, errorList: csvData, dialogOpen: true });
  }
  function uploadData(event) {
    if (state.importData.length == 0) {
      enqueueSnackbar("Please select a file", { variant: "error" });
      return;
    }
    let object = parseCSV(state.templateData, state.importData);
    console.log(object);
    if (state.api) {
      let formData = createMultipartFromObject(object);
      state.api(formData).then((response) => {
        console.log("response", response);
        let errorList = response.data;
        console.log("error list", errorList);
        if (state.importData.length > Object.keys(errorList).length) {
          enqueueSnackbar(
            `${
              state.importData.length - Object.keys(errorList).length - 1
            } import uploaded successfully`,
            { variant: "success" }
          );
        }
        if (Object.keys(errorList).length > 0) {
          enqueueSnackbar(
            `${
              Object.keys(errorList).length
            } import failed. Download the error list`,
            { variant: "error" }
          );
          prepareCSVforErrorEntries(errorList);
        }
      });
      setState({ ...state, dialogOpen: false });
      enqueueSnackbar(
        "Data uploaded successfully. Please wait for confirmation.",
        { variant: "success" }
      );
    } else {
      enqueueSnackbar("No API found", { variant: "error" });
    }
  }
  return (
    <CSVContext.Provider value={{ state, setState, openDialog }}>
      {children}
      <DialogLayout
        // title={props.title ? (props.title as string) : ""}
        open={state.dialogOpen}
        onClose={() => {
          setState({ ...state, dialogOpen: false });
        }}
        onSaveButtonClick={uploadData}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button variant="contained">
              <CSVDownloader
                buttonLabel="Download Template"
                data={state.templateData ? [state.templateData] : []}
                fileName={state.templateFileName || "template.csv"}
              />
            </Button>
          </Grid>
          <Grid item>
            <CSVUploader
              onUpload={(data: string[][]) => {
                let trimmedData = data.map((row) =>
                  row.map((cell) => cell.trim())
                );
                data = [];
                console.log(trimmedData);
                for (let i = 0; i < trimmedData.length; i++) {
                  if (trimmedData[i].length > 1) {
                    data.push(trimmedData[i]);
                  }
                }
                console.log(data);
                setState({ ...state, importData: data });
              }}
            />
          </Grid>
          {state.errorList && state.errorList.length > 0 ? (
            <Grid
              item
              container
              direction="column"
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <Typography align="justify">
                  There are some errors. Please download the below file where
                  the error entry will be found with proper description. Please
                  remove the 'Error Description' column before upload it.{" "}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error">
                  <CSVDownloader
                    buttonLabel="Download Wrong Entries"
                    data={state.errorList}
                    fileName={
                      state.templateFileName
                        ? state.templateFileName + "_errors"
                        : "errors.csv"
                    }
                  />
                </Button>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
          {/* {props.errorCSV && (
            <Grid item>
              <Button variant="contained">
                <CSVDownloader
                  buttonLabel="Download Error List"
                  data={props.errorCSV}
                  fileName={props.csvTemplateFileName || "template.csv"}
                />
              </Button>
            </Grid>
          )} */}
        </Grid>
      </DialogLayout>
    </CSVContext.Provider>
  );
}

export function useCSV(api, title, templateData, templateFileName) {
  const context = React.useContext(CSVContext);
  if (context == undefined) {
    throw new Error("useCSV must be used within a CSVProvider");
  }
  useEffect(() => {
    context.setState({
      ...context.state,
      api: api,
      dialogTitle: title,
      templateData: templateData,
      templateFileName: templateFileName,
    });
  }, [api, title, templateData, templateFileName]);
  return { openCSVImportDialog: context.openDialog };
}

// /**
//  * Example component for updating the state
//  */
// const MessageUpdater = () => {
//   const [message, updateMessage] = useContext(BrowseContext);

//   return (
//     <div>
//       <p>message in message updater is.. {message}</p>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => updateMessage(e.target.value)}
//       />
//     </div>
//   );
// };

// /**
//  * Example of component that displays the message
//  * (all child components can use the message in the same way, without passing props)
//  */
// const App = () => {
//   const [message] = useContext(BrowseContext);

//   useEffect(() => {
//     console.log("effect on message tirggered");
//   }, [message]);

//   return (
//     <>
//       <p>Message in app is.. {message}</p>
//       <MessageUpdater />
//     </>
//   );
// };

// /**
//  * Wrapps the App with the provider that holds the global message state and update function
//  */
// const AppContext = () => {
//   return (
//     <BrowseProvider>
//       <App />
//     </BrowseProvider>
//   );
// };
