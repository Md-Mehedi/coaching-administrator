import { DeleteForever } from "@mui/icons-material";
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { useState } from "react";

export type Contact = {
  type: string;
  number: string;
};

export type ContactInformationStates = {
  info: Contact[];
};
const contacts: Contact[] = [
  { type: "Personal", number: "019234482" },
  { type: "Father", number: "019234482" },
  { type: "Mother", number: "019234482" },
];
const contact_type: string[] = ["Personal", "Father", "Mother"];

export default function ContactInformation() {
  const [state, setState] = useState<ContactInformationStates>({
    info: contacts,
  });
  function addMoreNumberClicked(event) {
    const newContact = {
      type: contact_type[0],
      number: "",
    };
    const newInfo = [...state.info, newContact];
    setState({ ...state, info: newInfo });
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">Contact Information</Typography>
      </Grid>
      {state.info.map((item, idx) => (
        <Grid key={idx} item container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Contact type
              </InputLabel>
              <Select
                value={item.type}
                label="Contact type"
                onChange={(event) => {
                  const info = state.info;
                  info[idx].type = event.target.value;
                  setState({
                    ...state,
                    info: info,
                  });
                }}
              >
                {contact_type.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth variant="outlined" label="Number" />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={(event) => {
                const info = state.info.filter(
                  (item, curIndex) => curIndex != idx
                );
                setState({ ...state, info: info });
              }}
            >
              <DeleteForever />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={addMoreNumberClicked}
          >
            Add more number
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
