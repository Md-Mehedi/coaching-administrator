import { LockOutlined } from "@mui/icons-material";
import { Grid, Typography, Button, Avatar, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../../api";
import SpecialLink from "../../components/special-link";
import AuthLayout, { ForgotPassword } from "../../layouts/auth-layout";
import { ADMIN_LINKS, USER_LINKS } from "../../links";

function RegistrationConfirm() {
  return (
    <Grid container direction="column" spacing={2} sx={{ mt: 10 }}>
      <Grid item>
        <Typography>
          Your registration is successfully done. Please check your inbox to
          verify your email
        </Typography>
      </Grid>
      <Grid item>
        <SpecialLink href={ADMIN_LINKS.settings.path}>
          <Button fullWidth variant="contained">
            Go to home
          </Button>
        </SpecialLink>
      </Grid>
    </Grid>
  );
}

export function Register() {
  const { enqueueSnackbar } = useSnackbar();
  // const [state, setState] = useState({
  //   email: "66.mehedi@gmail.com",
  //   password: "",
  //   passwordAgain: "",
  //   admin: {
  //     image: "",
  //     fullName: "",
  //     nickname: "",
  //     gender: "M",
  //     dob: null,
  //     bloodGroup: "O+",
  //   },
  //   coaching: {
  //     image: "",
  //     name: "",
  //     description: "",
  //     whatsAppNo: "",
  //     facebook: "",
  //     youtube: "",
  //     email: "",
  //     address: null,
  //   },
  // });

  // function handleSubmitClick(event: { preventDefault: () => void }) {
  //   event.preventDefault();
  //   console.log(username);
  //   if (username == "") {
  //     setMessage("Username is empty");
  //     setOpen(true);
  //     return;
  //   }
  //   if (password == "") {
  //     setMessage("password is empty");
  //     setOpen(true);
  //     return;
  //   }
  //   AuthService.signIn(username, password).then(
  //     (response: {
  //       data: {
  //         stringValue: React.SetStateAction<string>;
  //         token: any;
  //         accountType: string;
  //       };
  //     }) => {
  //       if (response.data.stringValue) {
  //         setMessage(response.data.stringValue);
  //         setOpen(true);
  //         console.log("don't match");
  //       } else if (response.data.token) {
  //         console.log(username);
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //         console.log(AuthService.getCurrentUser());
  //         if (response.data.accountType === "Admin") {
  //           history.push({ pathname: "/admin" });
  //         } else {
  //           history.push({ pathname: "/home" });
  //         }
  //       }
  //     }
  //   );
  // }
  // function handleSnackbarClose(event?: React.SyntheticEvent, reason?: string) {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // }
  const [state, setState] = useState({
    email: "",
    password: "",
    againPassword: "",
    submit: false,
  });

  function errorVerify() {
    if (!state.email || !state.password || !state.againPassword) {
      enqueueSnackbar("Please fill up all field properly", {
        variant: "error",
      });
      return false;
    }
    if (state.password != state.againPassword) {
      enqueueSnackbar("Password mismatch", { variant: "error" });
      return false;
    }
    return true;
  }
  function handleRegisterClick(event) {
    console.log(state);
    if (errorVerify()) {
      API.auth
        .register(state.email, state.password)
        .then((response) => {
          enqueueSnackbar(response.data.message, {
            variant: response.data.success ? "success" : "error",
          });
          response.data.success && setState({ ...state, submit: true });
        })
        .catch((onRejected) => {
          console.log(onRejected);
          // alert("no internet connection");
        });
    }
  }
  return (
    <AuthLayout>
      <Grid container direction="column" spacing={1} alignItems="center">
        <Grid item>
          <Avatar /* className={classes.avatar} */>
            <LockOutlined />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
        </Grid>
        {state.submit ? (
          <RegistrationConfirm />
        ) : (
          <Grid
            item
            container
            sx={{ marginTop: 2 }}
            // className={classes.form}
            spacing={2}
          >
            <Grid item container spacing={2} direction="column">
              <Grid item>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onBlur={(event) => {
                    setState({ ...state, email: event.target.value });
                  }}
                  onChange={(event) =>
                    setState({ ...state, email: event.target.value })
                  }
                  // pattern="letters-digits-no-space"
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  onBlur={(event) => {
                    setState({ ...state, password: event.target.value });
                  }}
                  onChange={(event) =>
                    setState({ ...state, password: event.target.value })
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="again-password"
                  label="Password (Again)"
                  type="password"
                  onBlur={(event) => {
                    setState({ ...state, againPassword: event.target.value });
                  }}
                  onChange={(event) =>
                    setState({ ...state, againPassword: event.target.value })
                  }
                />
              </Grid>
            </Grid>

            <Grid item container>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleRegisterClick}
              >
                Register
              </Button>
            </Grid>
            <Grid item container justifyContent="space-between">
              <Grid item>
                <ForgotPassword />
              </Grid>
              <Grid item>
                <SpecialLink
                  href={USER_LINKS.login.path}
                  // href={
                  //   history.location.pathname
                  //     .split("/")
                  //     .slice(0, -1)
                  // .join("/") + "/signup"
                  // }
                >
                  Already have an account? Log in
                </SpecialLink>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </AuthLayout>
  );
}
