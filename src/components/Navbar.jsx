import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import { Button, Grid } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    marginLeft: 5,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: "70px",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { signOut, setActive, children } = props;
  const {
    root,
    appBarShift,
    appBar,
    menuButton,
    hide,
    drawerOpen,
    drawer,
    drawerClose,
    toolbar,
    content,
  } = classes;

  const items = [
    ["Profil", <AccountBoxIcon />],
    ["Retrospective", <RateReviewIcon />],
    ["Paramètres", <SettingsApplicationsIcon />],
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(appBar, {
          [appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(menuButton, {
                [hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap>
              Retro
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Button variant="outlined" color="secondary" onClick={signOut}>
              deconnexion
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(drawer, {
          [drawerOpen]: open,
          [drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [drawerOpen]: open,
            [drawerClose]: !open,
          }),
        }}
      >
        <div className={toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {items.map((obj) => (
            <ListItem
              button
              key={obj}
              button
              onClick={() => {
                setActive(obj[0]);
              }}
            >
              <ListItemIcon>{obj[1]}</ListItemIcon>
              <ListItemText primary={obj[0]} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={content}>{children}</main>
    </div>
  );
}
