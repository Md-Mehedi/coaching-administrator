import { DatePicker } from "@mui/lab";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@mui/material";
import React, { useState } from "react";
import { Coaching } from "../../classes/coaching";
import AvatarUpload from "../../components/avatar-upload";
import AddressField from "../../components/form-components/address-field";
import TextEditor from "../../components/text-editor";
import { blood_group } from "../../data";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Person } from "../../classes/person-info";
import AdminInformationInput from "./admin-information-input";
import CoachingInformationInput from "./coaching-information-input";

export default function AdminDetails() {
  function RegistrationForm() {
    return (
      <Grid item container>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Admin Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdminInformationInput />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Coaching Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CoachingInformationInput />
          </AccordionDetails>
        </Accordion>
      </Grid>
    );
  }
  return <RegistrationForm />;
}
