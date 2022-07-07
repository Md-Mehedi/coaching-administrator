import { Grid } from "@mui/material";
import Header, { HEADER_HEIGHT } from "../components/header";
import DrawerLayout from "./drawer-layout";

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <Grid
        container
        sx={{ mt: `${HEADER_HEIGHT}px` }}
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Grid>
    </>
  );
}
