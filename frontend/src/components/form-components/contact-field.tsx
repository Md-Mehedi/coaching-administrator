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
import { ContactType, PersonContact } from "../../classes/person-info";
import { emptyFieldChecking, updateArray } from "../../tools/helper-functions";
import DropDown from "../dropdown";
import { API } from "./../../api";
import MyTextfield from "./my-textfield";

function SingleContactInformation({
  contact,
  onChange,
  onDelete,
  contactTypes,
  verifier,
}: {
  contact: PersonContact;
  onChange: (contact: PersonContact) => void;
  onDelete: () => void;
  contactTypes: ContactType[];
  verifier: any;
}) {
  verifier.current = (enqueueSnackbar) => {
    let errorVerifyField = [
      { label: "Contact type", field: contact.contactType },
      { label: "Contact number", field: contact.number },
    ];
    return emptyFieldChecking(enqueueSnackbar, errorVerifyField);
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      spacing={2}
      alignItems="center"
    >
      <Grid item sx={{ flexGrow: 1 }}>
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <DropDown
              required
              label="Contact type"
              value={contact.contactType}
              options={contactTypes}
              optionLabel="name"
              onChange={(event, newValue) => {
                onChange({ ...contact, contactType: newValue || undefined });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MyTextfield
              required
              label="Number"
              value={contact.number}
              onChange={(event) =>
                onChange({ ...contact, number: event.target.value })
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton onClick={onDelete}>
          <DeleteForever />
        </IconButton>
      </Grid>
    </Grid>
  );
}
export default function ContactInformation({
  contacts,
  onChange,
  verifier,
}: {
  contacts?: PersonContact[];
  onChange?: (newContacts: PersonContact[]) => void;
  verifier?: any;
}) {
  const [state, setState] = useState<{
    contactTypes: ContactType[];
  }>({
    contactTypes: [],
  });
  useEffect(() => {
    API.person.contacts.getContactTypes().then((response) => {
      console.log("contact types", response.data);
      setState({ ...state, contactTypes: response.data });
    });
  }, []);

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
              contacts.splice(idx);
              onChange && onChange(contacts);
            }}
            verifier={verifier}
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
