import { Grid, Box, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { API } from "../api";
import { Student } from "../classes/person-info";
import DropDown from "./dropdown";

export type SearchByNameOrIdFieldProps = {
  multiple?: boolean;
  selectedStudent: Student | Student[] | null;
  onChange: (newStudent: Student | Student[] | null) => void;
};
export default function SearchByNameOrIdField(
  props: SearchByNameOrIdFieldProps
) {
  const [state, setState] = useState<{
    students: Student[];
    // selectedValue: Student | Student[] | null;
  }>({
    students: [],
    // selectedValue: props.multiple ? [] : null,
  });
  useEffect(() => {
    API.student.getAll().then((response) => {
      setState({ ...state, students: response.data });
    });
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DropDown
          label="Add students"
          multiple={props.multiple}
          filterSelectedOptions={props.multiple}
          value={props.selectedStudent}
          onChange={(event, newValue) => {
            props.onChange(newValue);
            // setState({ ...state, selectedValue: newValue });
          }}
          options={state.students}
          autoHighlight
          getOptionLabel={(option) =>
            option.person?.id + " - " + option.person?.fullName
          }
          // renderOption={(props, option) => (
          //   <Box
          //     component="li"
          //     sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          //     {...props}
          //   >
          //     {/* <img
          //     loading="lazy"
          //     width="20"
          //     src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
          //     srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
          //     alt=""
          //   /> */}
          //     {option.id} - {option.name}
          //   </Box>
          // )}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label="ID - Name"
              placeholder="Enter student ID or Name"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
        {/* <TextField fullWidth variant="outlined" label="ID" /> */}
      </Grid>
      {/* <Grid item xs={12} sm={6}>
        <Autocomplete
          value={state.selectedValue}
          onChange={(event, newValue) => {
            setState({ ...state, selectedValue: newValue });
          }}
          id="country-select-demo"
          options={students}
          autoHighlight
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.id} - {option.name}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nickname"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Grid> */}
    </Grid>
  );
}
