import { Grid, Typography, TextField } from "@mui/material";

export type AddressFieldProps = {
  title: string;
};
export default function AddressField(props: AddressFieldProps) {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">{props.title}</Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Division" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="District" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Thana" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            label="House no / Road no / Village"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
