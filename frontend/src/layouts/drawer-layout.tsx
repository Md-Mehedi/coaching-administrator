import { Grid } from "@mui/material";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Header, { HEADER_HEIGHT } from "../components/header";
import { InboxOutlined } from "@mui/icons-material";
import CreateBatch from "../pages/batch/create-batch";
import CreateProgram from "./../pages/batch/create-program";
import { Exam } from "../pages/batch/exam";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type DrawerLayoutPage = {
  icon: JSX.Element;
  title: string;
  page: JSX.Element | JSX.Element[];
};

type DrawerLayoutProps = {
  pages: DrawerLayoutPage[];
};

type DrawerLayoutStates = {
  open: boolean;
  currentPageIndex: number;
};

export default function DrawerLayout(props: DrawerLayoutProps) {
  const [states, setStates] = React.useState<DrawerLayoutStates>({
    open: true,
    currentPageIndex: 0,
  });

  const handleDrawerOpen = () => {
    setStates({ ...states, open: true });
  };

  const handleDrawerClose = () => {
    setStates({ ...states, open: false });
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "yellow" }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        open={states.open}
        PaperProps={{
          sx: { top: HEADER_HEIGHT },
        }}
      >
        <DrawerHeader>
          {states.open ? (
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleDrawerOpen}>
              <ChevronRightIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List>
          {props.pages.map((page, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={(event) =>
                setStates({ ...states, currentPageIndex: index })
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: states.open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: states.open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {page.icon}
                </ListItemIcon>
                <ListItemText
                  primary={page.title}
                  sx={{ opacity: states.open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Grid container justifyContent="center" alignItems="center">
        {props.pages[states.currentPageIndex].page}
      </Grid>
    </Box>
  );
}

export function DrawerLayoutTest() {
  return (
    <>
      <Header />
      <DrawerLayout pages={custom_pages} />;
    </>
  );
}

const custom_pages: DrawerLayoutPage[] = [
  { icon: <InboxOutlined />, title: "Batch", page: <CreateBatch /> },
  { icon: <InboxOutlined />, title: "Batch", page: <CreateProgram /> },
  { icon: <InboxOutlined />, title: "Batch", page: <Exam /> },
  { icon: <InboxOutlined />, title: "Batch", page: <CreateBatch /> },
  { icon: <InboxOutlined />, title: "Batch", page: <CreateBatch /> },
];
