import { Grid } from "@mui/material";

export default function Admin({ children }) {
  return (
    <Grid
      container
      alignContent="center"
      justifyContent="center"
      direction="column"
      style={{ width: "100%", padding: 20 }}
    >
      <Grid item style={{ width: "80%" }}>
        {children}
      </Grid>
    </Grid>
  );
}
