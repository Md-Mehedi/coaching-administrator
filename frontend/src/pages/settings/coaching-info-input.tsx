import { Button, Grid, TextField } from "@mui/material";
import AvatarUpload from "../../components/avatar-upload";
import AddressField from "../../components/form-components/address-field";
import TextEditor from "../../components/text-editor";
import { useState } from "react";
import { Coaching } from "../../classes/coaching";
import AddDialog from "../../components/add-dialog";
import ImageUpload from "../../components/image-upload";

export default function CoachingInformationInput() {
  const [coaching, setCoaching] = useState(new Coaching());
  function updateCoaching(object) {
    setCoaching({ ...coaching, ...object });
  }
  return (
    <Grid container spacing={2}>
      <Grid item container alignItems="center" justifyContent="center">
        <ImageUpload uploadButtonText="Upload logo" />
      </Grid>
      <Grid item container>
        <TextField
          fullWidth
          variant="outlined"
          label="Coaching name"
          defaultValue={coaching.name}
          onChange={(event) => {
            updateCoaching({ name: event.target.value });
          }}
          onBlur={(event) => {
            updateCoaching({ name: event.target.value });
          }}
        />
      </Grid>
      <Grid item container>
        <TextEditor
          value={coaching.description}
          onChange={(value) => updateCoaching({ description: value })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Whatsapp no"
          defaultValue={coaching.whatsappNo}
          onChange={(event) => {
            updateCoaching({ whatsappNo: event.target.value });
          }}
          onBlur={(event) => {
            updateCoaching({ whatsappNo: event.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Facebook"
          defaultValue={coaching.facebookLink}
          onChange={(event) => {
            updateCoaching({ facebookLink: event.target.value });
          }}
          onBlur={(event) => {
            updateCoaching({ facebookLink: event.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Youtube"
          defaultValue={coaching.youtubeLink}
          onChange={(event) => {
            updateCoaching({ youtubeLink: event.target.value });
          }}
          onBlur={(event) => {
            updateCoaching({ youtubeLink: event.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          defaultValue={coaching.email}
          onChange={(event) => {
            updateCoaching({ email: event.target.value });
          }}
          onBlur={(event) => {
            updateCoaching({ email: event.target.value });
          }}
        />
      </Grid>
      <Grid item container>
        <AddressField title="Address" />
      </Grid>
      <Grid
        item
        container
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Button variant="contained">Submit</Button>
        </Grid>
        <Grid item>
          <Button variant="contained">Save</Button>
        </Grid>
        <Grid item>
          <Button variant="contained">Cancel</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
