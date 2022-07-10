import { Grid, Box, TextField, Autocomplete } from "@mui/material";
import { useState } from "react";

export type SearchByNameOrIdFieldProps = {
  multiple?: boolean;
};
export default function SearchByNameOrIdField(
  props: SearchByNameOrIdFieldProps
) {
  const [state, setState] = useState<{
    selectedValue:
      | { id: string; name: string }
      | { id: string; name: string }[]
      | null;
  }>({
    selectedValue: props.multiple ? [] : null,
  });
  const students = [
    { id: "2312001", name: "Aman" },
    { id: "2312002", name: "Nasir" },
    { id: "2212003", name: "Shemu" },
    { id: "2112005", name: "Runa" },
    { id: "2312006", name: "Al Amin" },
  ];
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Autocomplete
          multiple={props.multiple}
          filterSelectedOptions={props.multiple}
          value={state.selectedValue}
          onChange={(event, newValue) => {
            setState({ ...state, selectedValue: newValue });
          }}
          options={students}
          autoHighlight
          getOptionLabel={(option) => option.id + " - " + option.name}
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
