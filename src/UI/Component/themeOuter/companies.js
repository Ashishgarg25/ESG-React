import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
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
  HiScale,
  HiLibrary,
  HiUser,
  HiUsers,
  HiOutlineInformationCircle,
} from "react-icons/hi";

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
  fyMenu: {
    paddingLeft: 16
  }
}));

function CompaniesSideMenu({ id, reportingId, data, selectedIdd }) {
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
  const [dropDownVisible, setDropdownVisible] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const history = useHistory();
  const { comapnySelected, setComapnySelected } = selectedIdd;
  // console.log(data);
  // useEffect(() => {
  //     Get({
  //         method: "GET",
  //         url: "user/verify"
  //     }).then((data=>{
  //         if(data.data.code != 200)
  //             Exit()
  //         else{
  //             props.data.user = data.data.data;
  //             props.loading(data.data.data ? false : true);
  //         }
  //     })).catch(error=>{
  //         Exit();
  //     })
  // },[]);

  // function Exit(){
  //     console.log(getToken());
  //     setToken("");
  //     history.push({ pathname: "/" });
  // }

  const principles = [
    {
      name: "Principle 1",
      url: "/policy/principle1",
      pSelect: 7
    },
    {
      name: "Principle 2",
      url: "/policy/principle2",
      pSelect: 8
    },
    {
      name: "Principle 3",
      url: "/policy/principle3",
      pSelect: 9
    },
    {
      name: "Principle 4",
      url: "/policy/principle4",
      pSelect: 10
    },
    {
      name: "Principle 5",
      url: "/policy/principle5",
      pSelect: 11
    },
    {
      name: "Principle 6",
      url: "/policy/principle6",
      pSelect: 12
    },
    {
      name: "Principle 7",
      url: "/policy/principle7",
      pSelect: 13
    },
    {
      name: "Principle 8",
      url: "/policy/principle8",
      pSelect: 14
    },
    {
      name: "Principle 9",
      url: "/policy/principle9",
      pSelect: 15
    },
  ]

  console.log("SIDEBAR DATA",data)

  return (
    <>
      <List component="div" disablePadding>

        <ListItem
            button
            className={classes.nested}
            disableGutters={true}
            selected={selected === 21}
            onClick={() => {
              setSubMenuOpen1(!subMenuOpen1)
              setSelected(21);
            }}
          >
            <ListItemIcon className={open && classes.directMenuIcons}>
              <HiOutlineOfficeBuilding color="#2B8CD6" size={20} />
            </ListItemIcon>
            <ListItemText
              primary={data.companyName}
            />
            {subMenuOpen2 ? (
              <HiChevronUp className={classes.listItemSvg} />
            ) : (
              <HiChevronDown className={classes.listItemSvg} />
            )}
          </ListItem>

        <Collapse in={subMenuOpen1} timeout="auto" unmountOnExit  className={classes.fyMenu}>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              disableGutters={true}
              selected={selected === 5}
              onClick={() => {
                setComapnySelected(id == comapnySelected ? 0 : id);
                setSelected(5);
              }}
            >
              <ListItemIcon className={open && classes.directMenuIcons}>
                <HiCalendar color="#2B8CD6" size={20} />
              </ListItemIcon>
              <ListItemText
                primary={
                  "FY " +
                  data.financialYear +
                  " - " +
                  String(data.financialYear + 1).slice(2, 4) +
                  " (" +
                  (data.quarter == 5 ? "Yearly" : "Q" + data.quarter) +
                  ")"
                }
              />
              {subMenuOpen2 ? (
                <HiChevronUp className={classes.listItemSvg} />
              ) : (
                <HiChevronDown className={classes.listItemSvg} />
              )}
            </ListItem>
          </List>

          <Collapse in={comapnySelected == id} timeout="auto" unmountOnExit>

            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                disableGutters={true}
                selected={selected === 6}
                onClick={() => {
                  setSubMenuOpen3(!subMenuOpen3);
                  setSelected(6);
                  setSubMenuOpen4(false);
                }}
              >
                <ListItemIcon className={open && classes.directSubMenuIcons}>
                  <HiViewGrid color="#2B8CD6" size={20} />
                </ListItemIcon>
                <Tooltip title="General Disclosures" arrow placement="top">
                  <ListItemText primary="Section A" />
                </Tooltip>
                {subMenuOpen3 ? (
                  <HiChevronUp className={classes.listItemSvg} />
                ) : (
                  <HiChevronDown className={classes.listItemSvg} />
                )}
              </ListItem>

              <Collapse in={subMenuOpen3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    id="sidebar3"
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 3}
                    style={{ color: selected === 3 && "#2B8CD6" }}
                    onClick={() => setSelected(3)}
                    component={Link}
                    to={"/financialData/companyInfo/" + id}
                  >
                    <ListItemIcon className={open && classes.subMenuIcons}>
                      <HiOutlineInformationCircle color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Company Information" />
                  </ListItem>
                  <ListItem
                    id="sidebar9"
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 9}
                    style={{ color: selected === 9 && "#2B8CD6" }}
                    onClick={() => {
                      setSelected(9);
                    }}
                    component={Link}
                    to={"/financialData/Services/" + reportingId}
                  >
                    <ListItemIcon className={open && classes.subMenuIcons}>
                      <HiCube color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Product & Services" />
                  </ListItem>
                  <ListItem
                    id="sidebar10"
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 10}
                    style={{ color: selected === 10 && "#2B8CD6" }}
                    onClick={() => {
                      setSelected(10);
                    }}
                    component={Link}
                    to={"/financialData/Operations/" + reportingId}
                  >
                    <ListItemIcon className={open && classes.subMenuIcons}>
                      <HiCog color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Operations" />
                  </ListItem>
                  <ListItem
                    id="sidebar11"
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 11}
                    style={{ color: selected === 11 && "#2B8CD6" }}
                    onClick={() => {
                      setSelected(11);
                    }}
                    component={Link}
                    to={"/financialData/Employees/" + reportingId}
                  >
                    <ListItemIcon className={open && classes.subMenuIcons}>
                      <HiUserGroup color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Employees" />
                  </ListItem>
                  <ListItem
                    id="sidebar12"
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 12}
                    style={{ color: selected === 12 && "#2B8CD6" }}
                    onClick={() => {
                      setSelected(12);
                    }}
                    component={Link}
                    to={"/financialData/Holdings/" + reportingId}
                  >
                    <ListItemIcon className={open && classes.subMenuIcons}>
                      <HiCurrencyRupee color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Holdings" />
                  </ListItem>
                  <ListItem
                    id="sidebar13"
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 13}
                    style={{ color: selected === 13 && "#2B8CD6" }}
                    onClick={() => {
                      setSelected(13);
                    }}
                    component={Link}
                    to={"/financialData/Csr/" + reportingId}
                  >
                    <ListItemIcon className={open && classes.subMenuIcons}>
                      <HiTrendingUp color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="CSR Details" />
                  </ListItem>
                  <ListItem
                    id="sidebar14"
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 14}
                    style={{ color: selected === 14 && "#2B8CD6" }}
                    onClick={() => {
                      setSelected(14);
                    }}
                    component={Link}
                    to={
                      "/financialData/TransparencyDisclosuresCompliances/" +
                      reportingId
                    }
                  >
                    <ListItemIcon className={open && classes.subMenuIcons}>
                      <HiDocumentSearch color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Transparency & Disclosures" />
                  </ListItem>
                  <ListItem
                    id="sidebar15"
                    button
                    className={classes.nested}
                    disableGutters={true}
                    selected={selected === 15}
                    style={{ color: selected === 15 && "#2B8CD6" }}
                    onClick={() => {
                      setSelected(15);
                    }}
                    component={Link}
                    to={"/financialData/Material/" + reportingId}
                  >
                    <ListItemIcon className={open && classes.subMenuIcons}>
                      <HiTemplate color="#2B8CD6" size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Material Business" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button className={classes.nested} disableGutters={true} selected={selected === 16} onClick={() => { setSubMenuOpen4(!subMenuOpen4); setSelected(16); setSubMenuOpen3(false); }} >
                  <ListItemIcon className={open && classes.directSubMenuIcons}>
                      <HiViewGrid color="#2B8CD6" size={20} />
                  </ListItemIcon>
                  <Tooltip title="Management & Process Disclosures" arrow placement="top">
                      <ListItemText primary="Section B"/>
                  </Tooltip>
                  {subMenuOpen4 ? <HiChevronUp className={classes.listItemSvg}/> : <HiChevronDown className={classes.listItemSvg}/>}
              </ListItem>
              <Collapse in={subMenuOpen4} timeout="auto" unmountOnExit>
                {/* NEW PRINCIPLE's ROUTE */}
                {
                  principles.map(p => (
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested} disableGutters={true} selected={selected === p.pSelect} style={{ color: selected === p.pSelect && "#2B8CD6" }} onClick={() => { setSelected(p.pSelect); }} component={Link} to={p.url} >
                          <ListItemIcon className={open && classes.subMenuIcons}>
                              <HiScale color="#2B8CD6" size={20} />
                          </ListItemIcon>
                          <ListItemText primary={p.name} />
                      </ListItem>
                    </List>
                  ))
                }
                      
                {/* PREVIOUS SECTION B ROUTE */}
                {/* <List component="div" disablePadding>
                  <ListItem button className={classes.nested} disableGutters={true} selected={selected === 4} style={{ color: selected === 4 && "#2B8CD6" }} onClick={() => { setSelected(4); }} component={Link} to="/financialData/ManagementProcess" >
                      <ListItemIcon className={open && classes.subMenuIcons}>
                          <HiOutlineUpload color="#2B8CD6" size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Management Process" />
                  </ListItem>
                </List> */}

                <List component="div" disablePadding>
                  <ListItem button className={classes.nested} disableGutters={true} selected={selected === 5} style={{ color: selected === 5 && "#2B8CD6" }} onClick={() => { setSelected(5); }} component={Link} to="/financialData/GovernanceOversight" >
                      <ListItemIcon className={open && classes.subMenuIcons}>
                          <HiLibrary color="#2B8CD6" size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Governance & Oversight" />
                  </ListItem>
                </List>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested} disableGutters={true} selected={selected === 6} style={{ color: selected === 6 && "#2B8CD6" }} onClick={() => { setSelected(6); }} component={Link} to="/financialData/Stakeholder" >
                      <ListItemIcon className={open && classes.subMenuIcons}>
                          <HiUsers color="#2B8CD6" size={20} />
                      </ListItemIcon>
                      <ListItemText primary="Stakeholder Engagement" />
                  </ListItem>
                </List>
              </Collapse>
          
              <ListItem
                button
                className={classes.nested}
                disableGutters={true}
                selected={selected === 8}
                onClick={() => {
                  setSubMenuOpen5(!subMenuOpen5);
                  setSelected(8);
                }}
              >
                <ListItemIcon className={open && classes.directSubMenuIcons}>
                  <HiViewGrid color="#2B8CD6" size={20} />
                </ListItemIcon>
                <Tooltip
                  title="Principle Wise Performance Disclosure"
                  arrow
                  placement="top"
                >
                  <ListItemText primary="Section C" />
                </Tooltip>
              </ListItem>
            </List>
          </Collapse>

        </Collapse>
      </List>
    </>
  );
}

export default CompaniesSideMenu;
