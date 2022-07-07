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
// import { useHistory } from "react-router-dom";

const useStyles: any = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    //https://st4.depositphotos.com/21087722/22869/i/1600/depositphotos_228693110-stock-photo-amazing-succulents-welcome-handwriting-monogram.jpg
    backgroundImage:
      "url(https://st4.depositphotos.com/21087722/22869/i/1600/depositphotos_228693110-stock-photo-amazing-succulents-welcome-handwriting-monogram.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Login({ signOut }: { signOut: boolean }) {
  const classes = useStyles();
  // const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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
  function handleSnackbarClose(event?: React.SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }
  return (
    <Grid
      component={Paper}
      elevation={6}
      square
      style={{ padding: 5, width: "70%" }}
    >
      {signOut && (
        <>
          <Snackbar
            open={open}
            // onClose={handleSnackbarClose}
            autoHideDuration={2000}
          >
            <Alert onClose={handleSnackbarClose} severity="error">
              {message}
            </Alert>
          </Snackbar>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form
              className={classes.form}
              noValidate
              // onSubmit={handleSubmitClick}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                onBlur={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setUsername(event.target.value);
                }}
                onChange={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => setUsername(event.target.value)}
                // pattern="letters-digits-no-space"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="password"
                onBlur={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setPassword(event.target.value);
                }}
                onChange={(event: {
                  target: { value: React.SetStateAction<string> };
                }) => setPassword(event.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                  // href={
                  //   history.location.pathname
                  //     .split("/")
                  //     .slice(0, -1)
                  //     .join("/") + "/forgot-password"
                  // }
                  // variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    // href={
                    //   history.location.pathname
                    //     .split("/")
                    //     .slice(0, -1)
                    // .join("/") + "/signup"
                    // }
                    variant="body2"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </>
      )}
    </Grid>
  );
}
