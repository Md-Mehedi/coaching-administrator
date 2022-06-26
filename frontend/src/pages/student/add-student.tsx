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

export default function AddStudent() {
  const [state, setState] = useState({
    gender: "M",
    dob: null,
    bloodGroup: blood_group[0],
    fatherOccupation: occupation[0],
    motherOccupation: occupation[1],
    religion: religion[0],
  });
  return (
    <Grid container spacing={2}>
      <Grid item container alignItems="center">
        <AvatarUpload />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Full name" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Nickname" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            value={state.gender}
            label="Gender"
            onChange={(event) =>
              setState({ ...state, gender: event.target.value })
            }
          >
            <MenuItem value={"M"}>Male</MenuItem>
            <MenuItem value={"F"}>Female</MenuItem>
            <MenuItem value={"O"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="E-mail" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Father's name" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Mother's name" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <DatePicker
          label="Date of birth"
          value={state.dob}
          onChange={(newValue) => {
            setState({
              ...state,
              dob: newValue,
            });
          }}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Blood group</InputLabel>
          <Select
            value={state.bloodGroup}
            label="Blood group"
            onChange={(event) =>
              setState({ ...state, bloodGroup: event.target.value })
            }
          >
            {blood_group.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField fullWidth variant="outlined" label="Nationality" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Father Occupation
          </InputLabel>
          <Select
            value={state.fatherOccupation}
            label="Father Occupation"
            onChange={(event) =>
              setState({ ...state, fatherOccupation: event.target.value })
            }
          >
            {occupation.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Mother Occupation
          </InputLabel>
          <Select
            value={state.motherOccupation}
            label="Mother Occupation"
            onChange={(event) =>
              setState({ ...state, motherOccupation: event.target.value })
            }
          >
            {occupation.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Religion</InputLabel>
          <Select
            value={state.religion}
            label="Religion"
            onChange={(event) =>
              setState({ ...state, religion: event.target.value })
            }
          >
            {religion.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
