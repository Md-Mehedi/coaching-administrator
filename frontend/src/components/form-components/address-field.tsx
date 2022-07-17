import { Grid, Typography, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { Address, District } from "../../classes/person-info";
import DropDown from "../dropdown";
import { districts, divisions, thanas } from "./../../data";
import { Division, Upazila } from "./../../classes/person-info";
import { API } from "../../api";

export type AddressFieldProps = {
  title: string;
  onChange?: (address: Address) => void;
};

export default function AddressField(props: AddressFieldProps) {
  const [state, setState] = useState<{
    divisions: Division[];
    districts: District[];
    upazilas: Upazila[];
    selectedDivision: Division | null;
    selectedDistrict: District | null;
    address: Address;
  }>({
    divisions: [],
    districts: [],
    upazilas: [],
    selectedDivision: null,
    selectedDistrict: null,
    address: new Address(),
  });
  function loadDivisions() {
    API.address.getDivisions().then((response) => {
      console.log(response.data);
      setState({ ...state, divisions: response.data });
    });
  }
  function loadDistricts(division: Division | null) {
    API.address.getDistricts(division?.id || -1).then((response) => {
      console.log(response.data);
      setState({
        ...state,
        selectedDivision: division,
        selectedDistrict: null,
        address: { ...state.address, upazila: null },
        districts: response.data,
      });
      props.onChange && props.onChange({ ...state.address, upazila: null });
    });
  }
  function loadUpazilas(district: District | null) {
    API.address.getUpazilas(district?.id || -1).then((response) => {
      console.log(response.data);
      setState({
        ...state,
        selectedDistrict: district,
        address: { ...state.address, upazila: null },
        upazilas: response.data,
      });
      props.onChange && props.onChange({ ...state.address, upazila: null });
    });
  }
  useEffect(() => {
    loadDivisions();
  }, []);
  console.log(state);
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="Division"
            value={state.selectedDivision || null}
            onChange={(event, newValue) => {
              loadDistricts(newValue);
            }}
            options={state.divisions}
            optionLabel="name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="District"
            value={state.selectedDistrict || null}
            onChange={(event, newValue) => {
              loadUpazilas(newValue);
            }}
            options={state.districts}
            optionLabel="name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DropDown
            label="Upazila"
            value={state.address?.upazila || null}
            onChange={(event, newValue) => {
              setState({
                ...state,
                address: { ...state.address, upazila: newValue },
              });
              props.onChange &&
                props.onChange({ ...state.address, upazila: newValue });
            }}
            options={state.upazilas}
            optionLabel="name"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="House no / Road no / Village"
            value={state.address?.village}
            onChange={(event) => {
              setState({
                ...state,
                address: { ...state.address, village: event.target.value },
              });
            }}
            onBlur={(event) => {
              setState({
                ...state,
                address: { ...state.address, village: event.target.value },
              });
              props.onChange &&
                props.onChange({
                  ...state.address,
                  village: event.target.value,
                });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
