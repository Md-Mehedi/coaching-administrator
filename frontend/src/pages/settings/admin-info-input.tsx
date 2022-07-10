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
import { useState } from "react";
import { Person } from "../../classes/person-info";
import AvatarUpload from "../../components/avatar-upload";
import { blood_group } from "../../data";

export default function AdminInfoInput() {
  const [admin, setAdmin] = useState(new Person());
  function updateAdmin(object) {
    setAdmin({ ...admin, ...object });
  }
  return (
    <Grid container spacing={2}>
      <Grid item container alignItems="center">
        <AvatarUpload />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          variant="outlined"
          label="Full name"
          defaultValue={admin.fullName}
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
          fullWidth
          variant="outlined"
          label="Nickname"
          defaultValue={admin.nickName}
          onChange={(event) => {
            updateAdmin({ nickName: event.target.value });
          }}
          onBlur={(event) => {
            updateAdmin({ nickName: event.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            value={admin.gender}
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
          value={admin.dateOfBirth}
          onChange={(newValue) => {
            updateAdmin({ dateOfBirth: newValue });
          }}
          renderInput={(params) => <TextField fullWidth {...params} />}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Blood group</InputLabel>
          <Select
            value={admin.bloodGroup}
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
