import { Button, Grid, TextField } from "@mui/material";
import AvatarUpload from "../../components/avatar-upload";
import AddressField from "../../components/form-components/address-field";
import TextEditor from "../../components/text-editor";
import { useEffect, useState } from "react";
import { Coaching } from "../../classes/coaching";
import AddDialog from "../../components/add-dialog";
import ImageUpload from "../../components/image-upload";
import {
  emptyFieldChecking,
  showSnackbar,
} from "./../../tools/helper-functions";
import { useSnackbar } from "notistack";
import { API } from "./../../api";
import AuthService from "../../services/auth-service";
import { Admin } from "../../classes/person-info";

export default function CoachingInformationInput({
  coaching,
  onChange,
  verifier,
}: {
  coaching: Coaching;
  onChange: (newCoaching: Coaching) => void;
  verifier: any;
}) {
  verifier.current = errorVerifier;
  const { enqueueSnackbar } = useSnackbar();
  function updateCoaching(object) {
    onChange({ ...coaching, ...object });
  }
  function errorVerifier() {
    const requiredFields = [
      { label: "Coaching name", field: coaching?.name },
      { label: "Contact no", field: coaching?.contactNo },
    ];
    return emptyFieldChecking(enqueueSnackbar, requiredFields);
  }
  return (
    <Grid container spacing={2}>
      <Grid item container alignItems="center" justifyContent="center">
        <ImageUpload
          file={coaching.image}
          onChange={(file) => updateCoaching({ image: file })}
          uploadButtonText="Upload logo"
        />
      </Grid>
      <Grid item container>
        <TextField
          fullWidth
          required
          variant="outlined"
          label="Coaching name"
          value={coaching?.name}
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
          value={coaching?.description}
          onChange={(value) => updateCoaching({ description: value })}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          required
          variant="outlined"
          label="Contact no"
          value={coaching?.contactNo}
          onChange={(event) => {
            updateCoaching({ contactNo: event.target.value });
          }}
          onBlur={(event) => {
            updateCoaching({ contactNo: event.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Whatsapp no"
          value={coaching?.whatsappNo}
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
          value={coaching?.facebookLink}
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
          value={coaching?.youtubeLink}
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
          value={coaching?.email}
          onChange={(event) => {
            updateCoaching({ email: event.target.value });
          }}
          onBlur={(event) => {
            updateCoaching({ email: event.target.value });
          }}
        />
      </Grid>
      <Grid item container>
        <AddressField
          title="Address"
          value={coaching?.address}
          onChange={(newAddress) =>
            onChange({ ...coaching, address: newAddress })
          }
        />
      </Grid>
    </Grid>
  );
}
