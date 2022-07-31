import { Grid, Typography, TextField, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { Address, District } from "../../classes/person-info";
import DropDown from "../dropdown";
import { districts, divisions, thanas } from "./../../data";
import { Division, Upazila } from "./../../classes/person-info";
import { API } from "../../api";

export type AddressFieldProps = {
  title: string;
  value?: Address;
  onChange?: (address: Address) => void;
};

export default function AddressField(props: AddressFieldProps) {
  const [state, setState] = useState<{
    divisions: Division[];
    districts: District[];
    upazilas: Upazila[];
    selectedDivision?: Division | null;
    selectedDistrict?: District | null;
    address: Address;
  }>({
    divisions: [],
    districts: [],
    upazilas: [],
    selectedDivision: props.value?.upazila?.district?.division,
    selectedDistrict: props.value?.upazila?.district,
    address: props.value || new Address(),
  });
  function loadDivisions() {
    API.address.getDivisions().then((response) => {
      setState({
        ...state,
        divisions: response.data,
        address: props.value || new Address(),
        selectedDivision: props.value?.upazila?.district?.division || null,
        selectedDistrict: props.value?.upazila?.district || null,
      });
    });
  }
  function loadDistricts(division: Division | null) {
    division
      ? API.address.getDistricts(division?.id || -1).then((response) => {
          setState({
            ...state,
            selectedDivision: division,
            selectedDistrict: null,
            address: { ...state.address, upazila: null },
            districts: response.data,
          });
          props.onChange && props.onChange({ ...state.address, upazila: null });
        })
      : setState({ ...state, selectedDistrict: null, districts: [] });
  }
  function loadUpazilas(district: District | null) {
    district
      ? API.address.getUpazilas(district?.id || -1).then((response) => {
          setState({
            ...state,
            selectedDistrict: district,
            address: { ...state.address, upazila: null },
            upazilas: response.data,
          });
          props.onChange && props.onChange({ ...state.address, upazila: null });
        })
      : setState({
          ...state,
          upazilas: [],
          address: { ...state.address, upazila: null },
        });
  }
  useEffect(() => {
    setState({ ...state, address: props.value || new Address() });
    loadDivisions();
  }, [props.value]);
  console.log("Address : ", state.address);
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
              setState({ ...state, selectedDivision: newValue });
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
              setState({ ...state, selectedDistrict: newValue });
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
