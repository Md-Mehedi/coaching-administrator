import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Popover,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Responsive } from "../tools/Responsive";
import { Dashboard } from "@mui/icons-material";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Link } from "react-router-dom";

export const HEADER_HEIGHT = 80;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#282C34",
      height: HEADER_HEIGHT,
      flexGrow: 1,
      padding: 5,
      "& > *": {
        color: "white",
      },
      "& input": {
        color: "white",
      },
      "& fieldset": {
        border: "2px solid white",
      },
      "& fieldset:focus": {
        border: "2px solid gray",
      },
    },
    logo: {
      width: 50,
      height: 50,
    },
    title: {
      display: "block-inline",
      textAlign: "center",
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down("sm")]: {
        flexGrow: 1,
        padding: 0,
      },
      color: "inherit",
    },
    input: {
      flexGrow: 1,
    },
    inputRoot: {
      flexGrow: 1,
      color: "inherit",
      borderRadius: "35px",
      padding: theme.spacing(0, 2, 0, 3),
      margin: theme.spacing(0, 3),
    },
  })
);

export default function Header() {
  const classes = useStyles();

  function Logo() {
    return (
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <Link to="/home">
            <IconButton>
              <img
                className={classes.logo}
                // src={require("assets/img/CourseOverflowIcon.png").default}
              />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>
          <Responsive displayIn={["Laptop", "Tablet"]}>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              style={{ cursor: "pointer" }}
              // onClick={(event) => history.push("/home")}
            >
              Coaching Administrator
            </Typography>
          </Responsive>
          <Responsive displayIn={["Mobile"]}>
            <Grid
              className={classes.title}
              item
              // onClick={(event) => history.push("/home")}
            >
              <Typography variant="h6" noWrap>
                Coaching
              </Typography>
              <Typography variant="h6" noWrap>
                Administrator
              </Typography>
            </Grid>
          </Responsive>
        </Grid>
      </Grid>
    );
  }
  function IconSet() {
    const [anchorRef, setAnchorRef] = useState<HTMLButtonElement | null>(null);

    return (
      <Grid container direction="row" alignItems="center" spacing={2}>
        {/* {AuthService.isLogin() ? ( */}
        <>
          {/* <Notification /> */}
          {/* {AuthService.getCurrentAccountType() === "Admin" && ( */}
          <Grid item>
            <Tooltip title="Admin Dashboard">
              <IconButton /* onClick={(event) => history.push("/admin")} */>
                <Avatar>
                  <Dashboard style={{ color: "white" }} />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Grid>
          {/* )} */}
          <Grid item style={{ display: "flex" }}>
            <IconButton
              onClick={(event: React.MouseEvent<any>) =>
                setAnchorRef(event.currentTarget)
              }
            >
              <Avatar />
            </IconButton>
            {/* <Popover
                open={Boolean(anchorRef)}
                anchorEl={anchorRef}
                onClose={() => setAnchorRef(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <SideMenuPopUp />
              </Popover> */}
          </Grid>
        </>
        {/* ) : (
          <Responsive displayIn={["Laptop", "Tablet", "Mobile"]}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: 12 }}
              onClick={(event) => {
                history.push("/auth/signin");
              }}
            >
              Sign in
            </Button>
          </Responsive>
        )} */}
        {/* <SideNav>
          <IconButton>
            <MenuIcon fontSize="large" />
          </IconButton>
        </SideNav> */}
      </Grid>
    );
  }

  return (
    <>
      <Grid id="header-root">
        <Toolbar className={classes.root}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item>
              <Logo />
            </Grid>
            {/* <Responsive displayIn={["Laptop", "Tablet"]}>
                <SearchBox />
              </Responsive> */}
            <Grid item>
              <IconSet />
            </Grid>
          </Grid>
          {/* <Responsive displayIn={"Mobile"}>
              <Grid container direction="row">
                <SearchBox />
              </Grid>
            </Responsive> */}
        </Toolbar>
      </Grid>
    </>
  );
}
