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
import { useState } from "react";
import AvatarUpload from "../../components/avatar-upload";
import AddressField from "../../components/form-components/address-field";
import BasicInformation from "../../components/form-components/basic-information";
import TextEditor from "../../components/text-editor";
import { blood_group, religion } from "../../data";
import AuthLayout from "../../layouts/auth-layout";
// import { useHistory } from "react-router-dom";

const useStyles: any = makeStyles((theme: Theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    //https://st4.depositphotos.com/21087722/22869/i/1600/depositphotos_228693110-stock-photo-amazing-succulents-welcome-handwriting-monogram.jpg
    backgroundImage: "url()",
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Register() {
  const classes = useStyles();
  // const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordAgain: "",
    admin: {
      image: "",
      fullName: "",
      nickname: "",
      gender: "M",
      dob: null,
      bloodGroup: "O+",
    },
    coaching: {
      image: "",
      name: "",
      description: "",
      whatsAppNo: "",
      facebook: "",
      youtube: "",
      email: "",
      address: null,
    },
  });

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

  function AdminInformation() {
    return (
      <Grid container spacing={2}>
        <Grid item container alignItems="center">
          <AvatarUpload />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Full name" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Nickname" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              value={state.admin.gender}
              label="Gender"
              onChange={
                (event) => {}
                // setState({ ...state, gender: event.target.value })
              }
            >
              <MenuItem value={"M"}>Male</MenuItem>
              <MenuItem value={"F"}>Female</MenuItem>
              <MenuItem value={"O"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DatePicker
            label="Date of birth"
            value={state.admin.dob}
            onChange={(newValue) => {
              setState({
                ...state,
                // dob: newValue,
              });
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Blood group</InputLabel>
            <Select
              value={state.admin.bloodGroup}
              label="Blood group"
              onChange={
                (event) => {}
                // setState({ ...state, bloodGroup: event.target.value })
              }
            >
              {blood_group.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
  function CoachingInformation() {
    return (
      <Grid container spacing={2}>
        <Grid item container alignItems="center">
          <AvatarUpload />
        </Grid>
        <Grid item container>
          <TextField fullWidth variant="outlined" label="Coaching name" />
        </Grid>
        <Grid item container>
          <TextEditor />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Whatsapp no" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Facebook" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Youtube" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField fullWidth variant="outlined" label="Email" />
        </Grid>
        <Grid item container>
          <AddressField title="Address" />
        </Grid>
      </Grid>
    );
  }
  return (
    <AuthLayout>
      <Grid container justifyContent="flex-end" spacing={2} padding={8}>
        <Grid
          item
          xs={12}
          sm={8}
          lg={5}
          component={Paper}
          elevation={6}
          square
          style={{ padding: 5 }}
        >
          {
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
                  Register
                </Typography>
                <Grid
                  container
                  sx={{ marginTop: 2 }}
                  className={classes.form}
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
                    </Grid>
                    <Grid item>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onBlur={(event: {
                          target: { value: React.SetStateAction<string> };
                        }) => {
                          setPassword(event.target.value);
                        }}
                        onChange={(event: {
                          target: { value: React.SetStateAction<string> };
                        }) => setPassword(event.target.value)}
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
                        onBlur={(event: {
                          target: { value: React.SetStateAction<string> };
                        }) => {
                          setPassword(event.target.value);
                        }}
                        onChange={(event: {
                          target: { value: React.SetStateAction<string> };
                        }) => setPassword(event.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Admin Information</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <AdminInformation />
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">
                          Coaching Information
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <CoachingInformation />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item container>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.submit}
                    >
                      Sign In
                    </Button>
                  </Grid>
                  <Grid item container>
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
                </Grid>
              </div>
            </>
          }
        </Grid>
      </Grid>
    </AuthLayout>
  );
}
