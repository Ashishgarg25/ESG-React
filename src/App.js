import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./UI/Containers/Dashboard/Dashboard";
import ForgotPassword from "./UI/Containers/ForgotPassword/ForgotPassword";
import Login from "./UI/Containers/Login/Login";
import Otp from "./UI/Containers/Otp/Otp";
import ResetPassword from "./UI/Containers/ResetPassword/ResetPassword";
import CompanyInfo from "./UI/Containers/CompanyInfo/CompanyInfo";
import FinancialData from "./UI/Containers/FinancialData/FinancialData";
import ProductServices from "./UI/Component/SebiForm/SectionA/ProductServices/ProductServices";
import Sidebar from "./UI/Component/themeOuter/sidebar";
import "./App.css";
// DRAWER IMPORTS
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
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

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

import logo from "./assets/favicon.ico";
import myyTakeLogo from "./assets/myytake-logo.png";
import { HiMenuAlt1, HiUserCircle } from "react-icons/hi";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
// import DashboardContent from "./UI/Component/SebiForm/DashboardContent/DashboardContent";
import Operations from "./UI/Component/SebiForm/SectionA/Operations/Operations";
// import EmployeeDetails from "./UI/Component/SebiForm/EmployeesDetails/EmployeeDetails";
import Employees from "./UI/Component/SebiForm/SectionA/Employees/Employees";
import Holdings from "./UI/Component/SebiForm/SectionA/Holdings/Holdings";
import TransparencyComp from "./UI/Component/SebiForm/SectionA/TransparencyCompliances/TransparencyComp";
import Csr from "./UI/Component/SebiForm/SectionA/csr/Csr";
import MaterialBusiness from "./UI/Component/SebiForm/SectionA/MaterialBusiness/MaterialBusiness";
import ManagementProcess from "./UI/Component/SebiForm/SectionB/ManagementProcess/ManagementProcess";
import BsrReport from "./UI/Containers/Reports/BsrReport";
import { Tooltip } from "@material-ui/core";
import LoadingOverlay from "react-loading-overlay";
import hitAPI from "./api/axios/hitApi";
import GovernanceOversight from "./UI/Component/SebiForm/SectionB/GovernanceOversight/GovernanceOversight";
import Stakeholder from "./UI/Component/SebiForm/SectionB/Stakeholder/Stakeholder";
import Principle1 from "./UI/Component/SebiForm/SectionB/Principles/Principle1";
import Principle2 from "./UI/Component/SebiForm/SectionB/Principles/Principle2";
import Principle3 from "./UI/Component/SebiForm/SectionB/Principles/Principle3";
import Principle4 from "./UI/Component/SebiForm/SectionB/Principles/Principle4";
import Principle5 from "./UI/Component/SebiForm/SectionB/Principles/Principle5";
import Principle6 from "./UI/Component/SebiForm/SectionB/Principles/Principle6";
import Principle7 from "./UI/Component/SebiForm/SectionB/Principles/Principle7";
import Principle8 from "./UI/Component/SebiForm/SectionB/Principles/Principle8";
import Principle9 from "./UI/Component/SebiForm/SectionB/Principles/Principle9";
import CommingSoon from "./UI/Containers/CommingSoon/CommingSoon";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#23272B",
  },
}));

function App() {
  const classes = useStyles();
  const [GlobeLoad, setGlobeLoad] = useState(true);
  const [InternalLoad, setInternalLoad] = useState(false);
  const [siteData, setSiteData] = useState({});

  const callApi = (url, method, inputData, object, callback) => {
    hitAPI(
      url,
      method,
      inputData,
      object,
      InternalLoad,
      setInternalLoad,
      callback
    );
  };
  // console.log(siteData);

  // useEffect(
  //   () => {
  //     console.log("effect");
  //     setInternalLoad(true);
  //   },
  //   [siteData]
  // )

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/forgotPassword" exact component={ForgotPassword} />
        <Route path="/otp" exact component={Otp} />
        <Route path="/resetPassword" exact component={ResetPassword} />
        <Route path="/commingSoon" exact component={CommingSoon} />
        {/* MUI SIDEBAR */}
        <div className={classes.root}>
          <LoadingOverlay
            styles={{
              wrapper: {
                position: "fixed",
                "z-index": "1205",
                width: "100vw",
                height: "100vh",
                display: GlobeLoad ? "block" : "none",
              },
            }}
            active={GlobeLoad}
            classNamePrefix="MyLoader1_"
            spinner
            text="Please wait"
          >
            <p></p>
          </LoadingOverlay>
          <Sidebar
            loading={setGlobeLoad}
            siteData={{ siteData, setSiteData }}
          />

          {siteData.user && (
            <main className={classes.content}>
              {/* <div className={classes.toolbar} /> */}
              <LoadingOverlay
                styles={{
                  wrapper: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: 0,
                    top: 0,
                    display: InternalLoad ? "block" : "none",
                  },
                }}
                active={true}
                spinner
                text="Please wait"
                classNamePrefix="MyLoader2_"
              >
                <p></p>
              </LoadingOverlay>

              <Route
                path="/dashboard"
                exact
                component={() =>
                  Dashboard({ InternalLoad, setInternalLoad, siteData })
                }
              />
              <Route
                path="/financialData"
                exact
                component={() =>
                  FinancialData({ callApi, siteData, setSiteData })
                }
              />
              <Route
                path="/financialData/companyInfo/:id"
                exact
                component={({ match }) =>
                  CompanyInfo({ match, siteData, setSiteData, callApi })
                }
              />
              <Route
                path="/financialData/Services/:reportId"
                exact
                component={({ match }) => ProductServices({ match })}
              />
              <Route
                path="/financialData/Operations/:reportId"
                exact
                component={({ match }) => Operations({ match })}
              />
              <Route
                path="/financialData/Employees/:reportId"
                exact
                component={({ match }) => Employees({ match })}
              />
              <Route
                path="/financialData/Holdings/:reportId"
                exact
                component={({ match }) => Holdings({ match })}
              />
              <Route
                path="/financialData/Csr/:reportId"
                exact
                component={({ match }) => Csr({ match })}
              />
              <Route
                path="/financialData/TransparencyDisclosuresCompliances/:reportId"
                exact
                component={({ match }) => TransparencyComp({ match })}
              />
              <Route
                path="/financialData/Material/:reportId"
                exact
                component={({ match }) => MaterialBusiness({ match })}
              />

              {/* NEW ROUTE SECTION B */}
              <Route
                path="/policy/principle1"
                exact
                component={Principle1}
              />
              <Route
                path="/policy/principle2"
                exact
                component={Principle2}
              />
              <Route
                path="/policy/principle3"
                exact
                component={Principle3}
              />
              <Route
                path="/policy/principle4"
                exact
                component={Principle4}
              />
              <Route
                path="/policy/principle5"
                exact
                component={Principle5}
              />
              <Route
                path="/policy/principle6"
                exact
                component={Principle6}
              />
              <Route
                path="/policy/principle7"
                exact
                component={Principle7}
              />
              <Route
                path="/policy/principle8"
                exact
                component={Principle8}
              />
              <Route
                path="/policy/principle9"
                exact
                component={Principle9}
              />
              

              {/* OLD ROUTE SECTION B */}
              {/* <Route
                path="/financialData/ManagementProcess"
                exact
                component={ManagementProcess}
              /> */}
              <Route
                path="/financialData/GovernanceOversight"
                exact
                component={GovernanceOversight}
              />
              <Route
                path="/financialData/Stakeholder"
                exact
                component={Stakeholder}
              />

              <Route path="/reports/BSR" exact component={BsrReport} />
            </main>
          )}
        </div>
      </Switch>
    </Router>
  );
}

export default App;
