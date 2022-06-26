import {
  Accordion,
  Grid,
  AccordionSummary,
  Collapse,
  Link,
} from "@mui/material";
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
import { ArrowDropDown, ArrowDropUp, InboxOutlined } from "@mui/icons-material";
import CreateBatch from "../pages/batch/create-batch";
import CreateProgram from "./../pages/batch/create-program";
import { Exam } from "../pages/batch/exam";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { createStyles } from "@mui/styles";
import { makeStyles } from "@mui/styles";

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

/******************************************
 * ************ Side Bar Row **************
 * *****************************************/

export type SideBarRowProps = {
  sideBarOpen: boolean;
  page: DrawerLayoutPage;
  onLinkClick: (link: string) => void;
};
export function SideBarRow(props: SideBarRowProps) {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Link
        href={props.page.link}
        underline="hover"
        onClick={(event) => {
          props.onLinkClick(props.page.link);
          event.preventDefault();
        }}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: props.sideBarOpen ? "initial" : "flex-start",
            paddingLeft: 1,
            paddingRight: 0,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: props.sideBarOpen ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            {props.page.icon}
          </ListItemIcon>
          <ListItemText
            hidden={!props.sideBarOpen}
            primary={props.page.title}
            primaryTypographyProps={{
              sx: { whiteSpace: "pre-wrap" },
            }}
          />
          {props.page.children.length > 0 && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                setCollapseOpen(!collapseOpen);
              }}
            >
              {collapseOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          )}
        </ListItemButton>
      </Link>
      {props.page.children.length > 0 && (
        <Collapse in={collapseOpen}>
          {props.page.children.map((item, childIdx) => (
            <Link
              href={item.link}
              underline="hover"
              onClick={(event) => {
                props.onLinkClick(item.link);
                event.preventDefault();
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: props.sideBarOpen ? "initial" : "center",
                  paddingLeft: 0,
                  paddingRight: 0,
                  marginLeft: props.sideBarOpen ? 4 : 0,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: props.sideBarOpen ? 3 : 0,
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  hidden={!props.sideBarOpen}
                  primary={item.title}
                  primaryTypographyProps={{
                    sx: { whiteSpace: "pre-wrap" },
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
        </Collapse>
      )}
    </ListItem>
  );
}

/******************************************
 * *********** Drawer Side Bar ************
 * *****************************************/
export type DrawerSideBarProps = {
  open: boolean;
  pages: DrawerLayoutPage[];
  onLinkClick: (link: string) => void;
};
function DrawerSideBar(props: DrawerSideBarProps) {
  return (
    <List>
      {props.pages.map((page, pageIdx) => (
        <SideBarRow
          key={pageIdx}
          sideBarOpen={props.open}
          page={page}
          onLinkClick={props.onLinkClick}
        />
      ))}
    </List>
  );
}

/******************************************
 * *********** Drawer Layout **************
 * *****************************************/

export type DrawerLayoutPage = {
  icon: JSX.Element;
  title: string;
  page: JSX.Element | JSX.Element[];
  link: string;
  children: {
    icon: JSX.Element;
    title: string;
    page: JSX.Element | JSX.Element[];
    link: string;
  }[];
};

export type DrawerLayoutProps = {
  currentLink: string;
  pages: DrawerLayoutPage[];
};

type DrawerLayoutStates = {
  open: boolean;
  currentPageLink: string;
};

export default function DrawerLayout(props: DrawerLayoutProps) {
  const [states, setStates] = React.useState<DrawerLayoutStates>({
    open: true,
    currentPageLink: "",
  });

  React.useEffect(() => {
    setStates({ ...states, currentPageLink: props.currentLink });
  }, [props.currentLink]);

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
        <DrawerSideBar
          open={states.open}
          pages={props.pages}
          onLinkClick={(link) => {
            window.history.pushState("", "", link);
            setStates({ ...states, currentPageLink: link });
          }}
        />
      </Drawer>
      <Grid
        container
        sx={{ padding: "20px" }}
        justifyContent="center"
        alignItems="center"
      >
        {props.pages.map((item) =>
          item.link == states.currentPageLink
            ? item.page
            : item.children.map((childItem) =>
                childItem.link == states.currentPageLink ? (
                  childItem.page
                ) : (
                  <></>
                )
              )
        )}
      </Grid>
    </Box>
  );
}
