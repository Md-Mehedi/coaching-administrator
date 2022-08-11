import { DatePicker } from "@mui/lab";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Admin, Person } from "../../classes/person-info";
import AvatarUpload from "../../components/avatar-upload";
import { blood_group } from "../../data";
import { useSnackbar } from "notistack";
import { API } from "./../../api";
import { emptyFieldChecking, showSnackbar } from "../../tools/helper-functions";
import AuthService from "../../services/auth-service";
import axios from "axios";

export default function AdminInfoInput({
  admin,
  onChange,
  verifier,
}: {
  admin: Admin;
  onChange: (newAdmin: Admin) => void;
  verifier: any;
}) {
  verifier.current = errorVerifier;
  const { enqueueSnackbar } = useSnackbar();
  function errorVerifier() {
    const requiredFields = [
      { label: "Full name", field: admin?.person?.fullName },
      { label: "Nickname", field: admin?.person?.nickName },
      { label: "Gender", field: admin?.person?.gender },
      { label: "Date of birth", field: admin?.person?.dateOfBirth },
    ];
    return emptyFieldChecking(enqueueSnackbar, requiredFields);
  }
  function updateAdmin(object) {
    //@ts-ignore
    onChange({
      ...admin,
      person: {
        ...admin?.person,
        ...object,
      },
    });
  }
  return (
    <Grid container spacing={2}>
      <Grid item container alignItems="center">
        <AvatarUpload onChange={(files) => updateAdmin({ image: files[0] })} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          required
          fullWidth
          variant="outlined"
          label="Full name"
          value={admin?.person?.fullName || ""}
          onChange={(event) => {
            updateAdmin({ fullName: event.target.value });
          }}
          onBlur={(event) => {
            updateAdmin({ fullName: event.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          required
          fullWidth
          variant="outlined"
          label="Nickname"
          value={admin?.person?.nickName || ""}
          onChange={(event) => {
            updateAdmin({ nickName: event.target.value });
          }}
          onBlur={(event) => {
            updateAdmin({ nickName: event.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            value={admin?.person?.gender || ""}
            label="Gender"
            onChange={(event) => {
              updateAdmin({ gender: event.target.value });
            }}
          >
            <MenuItem value={"M"}>Male</MenuItem>
            <MenuItem value={"F"}>Female</MenuItem>
            <MenuItem value={"O"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DatePicker
          label="Date of birth"
          value={admin?.person?.dateOfBirth}
          onChange={(newValue) => {
            updateAdmin({ dateOfBirth: newValue });
          }}
          renderInput={(params) => <TextField required fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Blood group</InputLabel>
          <Select
            value={admin?.person?.bloodGroup || ""}
            label="Blood group"
            onChange={(event) => {
              updateAdmin({ bloodGroup: event.target.value });
            }}
          >
            {blood_group.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
