import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

export default function MyTextfield(props: TextFieldProps) {
  return (
    <TextField
      onBlur={props.onChange}
      variant="outlined"
      fullWidth
      {...props}
      value={props.value || ""}
    />
  );
}
