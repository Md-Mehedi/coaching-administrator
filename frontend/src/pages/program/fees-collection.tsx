import React from "react";
import {
  Avatar,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Admin from "../../layouts/admin";
import { payment } from "../../data";
import HierarchyCheckbox from "../../components/hierarchy-checkbox";

export default function FeesCollection() {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  function Field({
    label,
    control,
    amount,
    disablePayField,
  }: {
    label: string;
    control: React.ReactElement<any, any>;
    amount?: number;
    disablePayField?: boolean;
  }) {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <FormControlLabel label={label} control={control} />
        </Grid>
        {!disablePayField && (
          <>
            <Grid
              item
              container
              direction="column"
              xs={3}
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="overline">Payable</Typography>
              <Typography variant="subtitle1">{amount}</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                variant="outlined"
                label="Pay"
                defaultValue={amount}
              />
            </Grid>
          </>
        )}
      </Grid>
    );
  }
  return (
    <Admin>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item xs={6}>
          <TextField variant="outlined" label="Roll no" />
        </Grid>
        {/* <HierarchyCheckbox data={payment} /> */}
        {/* <Grid
          item
          container
          direction="row"
          spacing={5}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Avatar sx={{ width: 150, height: 150 }} />
          </Grid>
          <Grid item>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <Typography variant="subtitle1">
                  Name : Asif Ahmed Utsa
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Class : 12</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Roll : 1702</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Mobile : 017xxxxxxxx
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
        {/* <Grid item container direction="column" spacing={2}>
          <Grid item>
            <Field
              label="12 Physics Batch"
              control={
                <Checkbox
                  checked={checked[0] && checked[1]}
                  indeterminate={checked[0] !== checked[1]}
                  onChange={handleChange1}
                />
              }
              disablePayField
            />
          </Grid>
          <Grid item container direction="column" spacing={2} sx={{ ml: 3 }}>
            <Grid item>
              <Field
                label="January-2022"
                control={
                  <Checkbox checked={checked[0]} onChange={handleChange2} />
                }
                amount={1200}
              />
            </Grid>
            <Grid item>
              <Field
                label="February-2022"
                control={
                  <Checkbox checked={checked[1]} onChange={handleChange3} />
                }
                amount={1200}
              />
            </Grid>
          </Grid>
        </Grid> */}

        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5">Total pay : 2730 TK</Typography>
          <Typography variant="h5">Due Remain : 2450 TK</Typography>
        </Grid>
      </Grid>
    </Admin>
  );
}
