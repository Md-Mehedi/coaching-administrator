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
import { useEffect, useState } from "react";
import { PersonContact } from "../../classes/person-info";
import { updateArray } from "../../tools/helper-functions";
import DropDown from "../dropdown";
import { API } from "./../../api";
import MyTextfield from "./my-textfield";

function SingleContactInformation({
  contact,
  onChange,
  onDelete,
  contactTypes,
}: {
  contact: PersonContact;
  onChange: (contact: PersonContact) => void;
  onDelete: () => void;
  contactTypes: string[];
}) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <DropDown
          label="Contact type"
          value={contact.contactType}
          options={contactTypes}
          optionLabel=""
          onChange={(event, newValue) => {
            console.log("New Value: ", newValue);
            onChange({ ...contact, contactType: newValue || "" });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <MyTextfield
          label="Number"
          value={contact.number}
          onChange={(event) =>
            onChange({ ...contact, number: event.target.value })
          }
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={onDelete}>
          <DeleteForever />
        </IconButton>
        {/* <IconButton
          onClick={(event) => {
            const info = state.contacts.filter(
              (item, curIndex) => curIndex != idx
            );
            setState({ ...state, contacts: info });
          }}
        >
          <DeleteForever />
        </IconButton> */}
      </Grid>
    </Grid>
  );
}
export default function ContactInformation({
  contacts,
  onChange,
}: {
  contacts?: PersonContact[];
  onChange?: (newContacts: PersonContact[]) => void;
}) {
  const [state, setState] = useState<{
    contactTypes: string[];
  }>({
    contactTypes: [],
  });
  useEffect(() => {
    state.contactTypes ||
      API.person.contacts.getContactTypes().then((response) => {
        setState({ ...state, contactTypes: response.data });
      });
  }, []);
  console.log("in contact", contacts);
  console.log("in contact", state.contactTypes);

  function addMoreNumberClicked(event) {
    let newContact: PersonContact = { contactType: state.contactTypes[0] };
    onChange &&
      (contacts ? onChange([...contacts, newContact]) : onChange([newContact]));
  }
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">Contact Information</Typography>
      </Grid>
      {contacts?.map((item, idx) => (
        <Grid item container>
          <SingleContactInformation
            contact={item}
            contactTypes={state.contactTypes}
            onChange={(newContact) => {
              onChange && onChange(updateArray(contacts, idx, newContact));
            }}
            onDelete={() => {
              onChange && onChange(contacts.splice(idx));
            }}
          />
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
