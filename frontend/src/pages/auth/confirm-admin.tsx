import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthLayout from "../../layouts/auth-layout";
import { LoginBox } from "./login";
import { useSearchParams } from "react-router-dom";
import { API } from "./../../api";
import { useSnackbar } from "notistack";
import { generateVariant, showSnackbar } from "./../../tools/helper-functions";

export default function ConfirmAdmin() {
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [verified, setVerified] = useState(false);
  useEffect(() => {
    console.log("Confirmation checking");
    token &&
      API.auth.confirmAdmin(token).then((response) => {
        if (response.status == 200) {
          showSnackbar(enqueueSnackbar, response.data, () => {
            setVerified(true);
          });
        }
      });
  }, [token]);

  return (
    <AuthLayout>
      <Grid container direction="column" spacing={2}>
        {verified ? (
          <>
            <Grid item>
              <Typography variant="h6" align="center">
                Your email is verified successfully.
                <br /> Please log in!!!
              </Typography>
            </Grid>
            <Grid item>
              <LoginBox signOut />
            </Grid>
          </>
        ) : (
          <Grid item>
            <Typography variant="h6" align="center">
              You email is verifying. Pleas wait.
            </Typography>
          </Grid>
        )}
      </Grid>
    </AuthLayout>
  );
}
