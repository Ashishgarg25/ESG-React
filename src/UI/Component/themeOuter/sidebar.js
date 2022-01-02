import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { setToken, getToken } from "../../../utils/LocalStorage/LocalStorage";

import {
  HiMail,
  HiMenu,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiMailOpen,
  HiDatabase,
  HiOutlineUpload,
  HiPencilAlt,
  HiOutlineDocumentReport,
  HiOutlineDocumentDownload,
  HiChartBar,
  HiOutlineEye,
  HiOutlinePresentationChartBar,
  HiChevronUp,
  HiChevronDown,
  HiViewGrid,
  HiCalendar,
  HiOutlineOfficeBuilding,
  HiCube,
  HiCog,
  HiUserGroup,
  HiCurrencyRupee,
  HiDocumentSearch,
  HiTemplate,
  HiTrendingUp,
} from "react-icons/hi";
import types from "../../../Redux/Login/type";

import logo from "./../../../assets/favicon.ico";
import myyTakeLogo from "./../../../assets/myytake-logo.png";
import { HiMenuAlt1, HiUserCircle } from "react-icons/hi";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Tooltip } from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay";

import Get from "../../../api/axios/internalAxiosInstance";
import CompaniesSideMenu from "./companies";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import reportingId from "../../../utils/GloabalVariable/reportId";



const drawerWidth = 300;
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
    backgroundColor: "#1D1D1D",
  },
  appBarShift: {
    marginLeft: drawerWidth - 72,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
    backgroundColor: "#1D1D1D",
    color: "#fff",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#1D1D1D",
    color: "#fff",
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
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#23272B",
  },
  nested: {
    paddingLeft: theme.spacing(4),
    cursor: "pointer",
  },
  dropItem: {
    color: "#fff",

    "&:hover": {
      backgroundColor: "#2B8CD6",
      color: "#fff",
    },
  },
  topBarRight: {
    backgroundColor: "transparent",
    marginTop: 8,
  },
  toggle: {
    border: "none",
    background: "transparent",

    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#2B8CD6",
    },
    "&:focus": {
      boxShadow: "none",
      backgroundColor: "#2B8CD6",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#2B8CD6 !important",
    },
  },

  directMenuIcons: {
    paddingLeft: 8,
  },

  directSubMenuIcons: {
    paddingLeft: 16,
  },
  subMenuIcons: {
    paddingLeft: 24,
  },
  listItemSvg: {
    marginRight: 16,
  },
}));

function ThemeOuter({ loading, siteData }) {

  const { reportId } = useParams();

  const location = useLocation();

  // console.log(props);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [subMenuOpen, setSubMenuOpen] = React.useState(false);
  const [subMenuOpen1, setSubMenuOpen1] = React.useState(false);
  const [subMenuOpen2, setSubMenuOpen2] = React.useState(false);
  const [subMenuOpen3, setSubMenuOpen3] = React.useState(false);
  const [subMenuOpen4, setSubMenuOpen4] = React.useState(false);
  const [subMenuOpen5, setSubMenuOpen5] = React.useState(false);
  const [subMenuOpen6, setSubMenuOpen6] = React.useState(false);
  const [subMenuOpen7, setSubMenuOpen7] = React.useState(false);
  const [subMenuOpen8, setSubMenuOpen8] = React.useState(false);
  const [subMenuOpen9, setSubMenuOpen9] = React.useState(false);
  const [comapnySelected, setComapnySelected] = React.useState(0);
  const [dropDownVisible, setDropdownVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const rId = useSelector((state) => state);
  console.log(rId.reportId.reportingId);

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    loading(true);
    Get({
      method: "GET",
      url: "user/verify",
    })
      .then((data) => {
        if (data.data.code != 200) Exit();
        else {
          siteData.siteData.user = data.data.data;
          loading(data.data.data ? false : true);
        }
      })
      .catch((error) => {
        Exit();
      });
  }, []);

  const token = getToken() || "";
  function Exit() {
    console.log(token);
    setToken("");
    dispatch({
      type: types.LOGGOUT,
    });
    // siteData.setSiteData({});
    history.push({ pathname: "/" });
  }

  const reporttId = rId.reportId.reportingId;

  const companies = (
    (siteData.siteData.finencial && siteData.siteData.finencial.response) ||
    []
  ).map(
    (el) =>
      el.reportingId === reporttId && (
        <CompaniesSideMenu
          id={el.entityId}
          reportingId={el.reportingId}
          data={el}
          selectedIdd={{ comapnySelected, setComapnySelected }}
        />
      )
  );

  return (
    <>
      {siteData.siteData.user && (
        <>
          <AppBar
            position="fixed"
            style={{ left: 72, height: 72 }}
            className={clsx(classes.appBar, { [classes.appBarShift]: open })}
          >
            <Toolbar
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setOpen(!open)}
                  edge="start"
                  className={clsx(classes.menuButton)}
                >
                  <HiMenu />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Logo
                </Typography>
              </div>
              <div
                className={classes.topBarRight}
                style={{ marginRight: open ? 0 : 72 }}
              >
                <Dropdown
                  isOpen={dropDownVisible}
                  toggle={() => setDropdownVisible(!dropDownVisible)}
                >
                  <DropdownToggle className={classes.toggle}>
                    <HiUserCircle color="#fff" size="36" />{" "}
                    {siteData.siteData.user.name || ""}
                  </DropdownToggle>
                  <DropdownMenu
                    style={{ backgroundColor: "#1D1D1D" }}
                    right
                    className="mt-2"
                  >
                    <DropdownItem className={classes.dropItem}>
                      Profile
                    </DropdownItem>
                    <DropdownItem className={classes.dropItem}>
                      Settings
                    </DropdownItem>
                    <DropdownItem
                      divider
                      style={{ borderTopColor: "#494949" }}
                    />
                    <DropdownItem onClick={Exit} className={classes.dropItem}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton>
                <img
                  // src={open ? myyTakeLogo : logo}
                  // src={open ? myyTakeLogo : logo}
                  // alt="logo"
                  // style={{ width: open ? 72 : 48 }}
                  className=""
                />
              </IconButton>
            </div>

            <Divider />
            <List>
              <ListItem
                button
                selected={selected === 1}
                onClick={() => setSelected(1)}
                component={Link}
                to="/dashboard"
                style={{ color: selected === 1 && "#2B8CD6" }}
              >
                <ListItemIcon className="pl-2">
                  <HiOutlinePresentationChartBar color="#2B8CD6" size={24} />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
              <ListItem
                button
                selected={selected === 2}
                onClick={() => {
                  setSubMenuOpen(!subMenuOpen);
                  setSelected(2);
                }}
              >
                <ListItemIcon className="pl-2">
                  <HiDatabase color="#2B8CD6" size={24} />
                </ListItemIcon>
                <ListItemText primary={"Data Management"} />
                {subMenuOpen ? <HiChevronUp /> : <HiChevronDown />}
              </ListItem>

              <Collapse in={subMenuOpen || location.pathname === "/financialData"} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={location.pathname === "/financialData"}
                    style={{ color: location.pathname === "/financialData" && "#2B8CD6" }}
                    onClick={() => {
                      setSubMenuOpen1(!subMenuOpen1);
                      setSelected(4);
                    }}
                    component={Link}
                    to="/financialData"
                    
                  >
                    <ListItemIcon>
                      <HiOutlineDocumentReport color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="BRSR" />
                    {(companies.length ? true : false) &&
                      (subMenuOpen1 ? (
                        <HiChevronUp className={classes.listItemSvg} />
                      ) : (
                        <HiChevronDown className={classes.listItemSvg} />
                      ))}
                  </ListItem>

                  <Collapse in={subMenuOpen1} timeout="auto" unmountOnExit>
                    {companies}
                  </Collapse>
                </List>
              </Collapse>

              <ListItem
                button
                selected={selected === 16}
                onClick={() => {
                  setSelected(16);
                  setSubMenuOpen6(!subMenuOpen6);
                }}
              >
                <ListItemIcon className="pl-2">
                  <HiOutlineDocumentReport color="#2B8CD6" size={24} />
                </ListItemIcon>
                <ListItemText primary={"Reports"} />
              </ListItem>
              <Collapse in={subMenuOpen6} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 17}
                    onClick={() => {
                      setSelected(17);
                    }}
                    component={Link}
                    to="/reports/BSR"
                  >
                    <ListItemIcon>
                      <HiOutlineDocumentDownload color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="BSR Report" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Drawer>{" "}
        </>
      )}
    </>
  );
}

export default ThemeOuter;
