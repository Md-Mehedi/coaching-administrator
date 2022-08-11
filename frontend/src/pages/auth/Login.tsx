import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Alert,
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";
import { useState } from "react";
import AuthLayout, { ForgotPassword } from "../../layouts/auth-layout";
import { USER_LINKS } from "../../links";
// import { useHistory } from "react-router-dom";
import SpecialLink from "../../components/special-link";
import { useSnackbar } from "notistack";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { ADMIN_LINKS } from "../../links";
import { showSnackbar } from "../../tools/helper-functions";
import { LoadingButton } from "@mui/lab";
import { apiCatch } from "./../../tools/helper-functions";
import AuthService from "../../services/auth-service";

// const useStyles: any = makeStyles((theme: Theme) => ({
//   root: {
//     height: "100vh",
//   },
//   image: {
//     //https://st4.depositphotos.com/21087722/22869/i/1600/depositphotos_228693110-stock-photo-amazing-succulents-welcome-handwriting-monogram.jpg
//     backgroundImage:
//       "url(https://st4.depositphotos.com/21087722/22869/i/1600/depositphotos_228693110-stock-photo-amazing-succulents-welcome-handwriting-monogram.jpg)",
//     backgroundRepeat: "no-repeat",
//     backgroundColor:
//       theme.palette.type === "light"
//         ? theme.palette.grey[50]
//         : theme.palette.grey[900],
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

export function LoginBox({ signOut }: { signOut: boolean }) {
  // const classes = useStyles();

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
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
  });
  function errorVerify() {
    if (!state.email || !state.password) {
      enqueueSnackbar("Please fill up all field properly", {
        variant: "error",
      });
      return false;
    }
    return true;
  }
  function handleLoginClick(event) {
    if (errorVerify()) {
      setState({ ...state, loading: true });
      API.auth
        .login(state.email, state.password)
        .then((response) => {
          if (response.status == 200) {
            showSnackbar(enqueueSnackbar, response.data, () => {
              setState({ ...state, loading: false });
              if (response.data.success) {
                AuthService.login(response.data.token, response.data.admin);
                navigate(ADMIN_LINKS.settings.path);
              }
            });
          }
        })
        .catch((r) => apiCatch(enqueueSnackbar, r));
    }
  }
  return (
    <Grid
      container
      direction="column"
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="column" spacing={1}>
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
              setState({
                ...state,
                email: event.target.value,
              });
            }}
            onChange={(event) => {
              setState({
                ...state,
                email: event.target.value,
              });
            }}
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
            autoComplete="password"
            onBlur={(event) => {
              setState({
                ...state,
                password: event.target.value,
              });
            }}
            onChange={(event) => {
              setState({
                ...state,
                password: event.target.value,
              });
            }}
          />
        </Grid>
        <Grid item>
          <LoadingButton
            loading={state.loading}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLoginClick}
          >
            Log In
          </LoadingButton>
        </Grid>
      </Grid>
      <Grid item container>
        <Grid item xs>
          <ForgotPassword />
        </Grid>
        <Grid item>
          <SpecialLink
            href={USER_LINKS.register.path}
            // href={
            //   history.location.pathname
            //     .split("/")
            //     .slice(0, -1)
            // .join("/") + "/signup"
            // }
          >
            {"Don't have an account? Register"}
          </SpecialLink>
        </Grid>
      </Grid>
    </Grid>
  );
}

export function Login() {
  return (
    <AuthLayout>
      <LoginBox signOut={true} />
    </AuthLayout>
  );
}
