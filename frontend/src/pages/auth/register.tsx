import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DatePicker } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { MouseEventHandler, useState } from "react";
import AvatarUpload from "../../components/avatar-upload";
import AddressField from "../../components/form-components/address-field";
import BasicInformation from "../../components/form-components/basic-information";
import TextEditor from "../../components/text-editor";
import { blood_group, religion } from "../../data";
import AuthLayout, { ForgotPassword } from "../../layouts/auth-layout";
import { Person } from "../../classes/person-info";
import { Coaching } from "../../classes/coaching";
// import { useHistory } from "react-router-dom";
import SpecialLink from "./../../components/special-link";
import { USER_LINKS } from "../../links";
import { useSnackbar } from "notistack";
import { ADMIN_LINKS } from "./../../links";

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
    if (errorVerify()) {
      enqueueSnackbar("Registration successful", { variant: "success" });
      setState({ ...state, submit: true });
    }
  }
  return (
    <AuthLayout>
      <Grid container direction="column" spacing={1} alignItems="center">
        <Grid item>
          <Avatar /* className={classes.avatar} */>
            <LockOutlinedIcon />
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
