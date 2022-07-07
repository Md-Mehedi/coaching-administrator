import React, { useState } from "react";
import {
  Avatar,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { blood_group, occupation, religion } from "./../../data";
import { DeleteForever } from "@mui/icons-material";
import SaveCancelButtons from "../../components/save-cancel-buttons";
import AddressField from "../../components/form-components/address-field";
import ContactInformation from "../../components/form-components/contact-field";
import ExamResultField from "../../components/form-components/exam-field";
import AvatarUpload from "../../components/avatar-upload";
import BasicInformation from "../../components/form-components/basic-information";
import ParentInformation from "../../components/form-components/parent-information";

export default function AddStudent() {
  return (
    <Grid container spacing={2}>
      <Grid item container>
        <BasicInformation />
      </Grid>
      <Grid item container>
        <ParentInformation />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Institution name" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Class" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Class Roll" />
      </Grid>
      <Grid item xs={12}>
        <AddressField title="Present Address" />
      </Grid>
      <Grid item xs={12}>
        <AddressField title="Permanent Address" />
      </Grid>
      <Grid item xs={12}>
        <ExamResultField title="JSC Exam Information" />
      </Grid>
      <Grid item xs={12}>
        <ExamResultField title="SSC Exam Information" />
      </Grid>
      <Grid item xs={12}>
        <ContactInformation />
      </Grid>
      <Grid item xs={12}>
        <SaveCancelButtons />
      </Grid>
    </Grid>
  );
}
