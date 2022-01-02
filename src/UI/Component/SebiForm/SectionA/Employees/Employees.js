import React, { useEffect, useState } from "react";
import "@pathofdev/react-tag-input/build/index.css";
// import styles from "./employees.module.css";
import "../../../../../assets/css/styles.css";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { Button } from "reactstrap";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import { getToken } from "../../../../../utils/LocalStorage/LocalStorage";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Toast from "../../../../../utils/Toast/Toast";
import { useSelector } from "react-redux";
import Employees18 from "./Employees18";
import WomenRepresentation19 from "./WomenRepresentation19";
import TurnoverRate20 from "./TurnoverRate20";
import Participation20 from "./Participation20";
import Workmen from "./Workmen";

function Employees() {
  // EDIT & TOAST STATES
  const [isEditable, setIsEditable] = useState(true);
  const [isEditable1, setIsEditable1] = useState(true);
  const [isEditable2, setIsEditable2] = useState(true);
  const [isEditable3, setIsEditable3] = useState(true);
  const [isEditable4, setIsEditable4] = useState(true);
  const [isEditable5, setIsEditable5] = useState(true);
  const [isEditable6, setIsEditable6] = useState(true);
  const [isEditable7, setIsEditable7] = useState(true);
  const [isEditable8, setIsEditable8] = useState(true);
  const [isEditable9, setIsEditable9] = useState(true);

  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  const { reportId } = useParams();
  const [data, setData] = useState({});
  const brsrData = useSelector((state) => state);

  let obj = brsrData.brsr.finencial.response.find(
    (o) => o.entityId == reportId
  );
  useEffect(() => {
    setData(obj);
  }, []);
  const token = getToken() || "";
  const config = {
    headers: {
      token: token,
      "Content-type": "application/json",
    },
  };

  return (
    <div className="wrapperContent">
      <div className="breadCrumb">
        <span className="breadCrumbItem">
          Data Management &nbsp;/&nbsp;&nbsp;{" "}
        </span>
        <span className="breadCrumbItem"> BRSR &nbsp;/&nbsp;&nbsp; </span>
        <span className="breadCrumbItem">
          {" "}
          FY {data.financialYear} (Q{data.quarter}) &nbsp;/&nbsp;&nbsp;{" "}
        </span>
        <span className="breadCrumbItem"> Section A &nbsp;/&nbsp;&nbsp; </span>
        <span className="breadCrumbActive"> Employees </span>
      </div>
      <div className="float-right" style={{ color: "#f56" }}>
        <span>{data.companyName}</span> - <span>{data.reportingBoundary}</span>{" "}
        - <span>FY {data.financialYear}</span> - <span>(Q{data.quarter})</span>
      </div>
      <h2 className="heading" style={{ color: "#fff" }}>
        IV Employees
      </h2>

      <h4 className="subHeading">
        18. Employees{" "}
        <span id="cat8" style={{ color: "green" }}>
          {" "}
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={"Details at the end of Financial Year"}
          openTooltipN={0}
          target="cat8"
        />
      </h4>
      <h4 className="label">
        {" "}
        a. Total Employees (including differently abled)
      </h4>
      <Employees18
        empData={{
          reportingId: reportId,
          ewParticular: "Employee",
          ewIsDifferentlyAbled: 0,
        }}
      />

      <h4 className="label"> b. Differently abled Employees</h4>
      <Employees18
        empData={{
          reportingId: reportId,
          ewParticular: "Employee",
          ewIsDifferentlyAbled: 1,
        }}
      />

      <h4 className="subHeading">
        18. Workers{" "}
        <span id="cat8" style={{ color: "green" }}>
          {" "}
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={"Details at the end of Financial Year"}
          openTooltipN={0}
          target="cat8"
        />
      </h4>
      <h4 className="label"> a. Total Workers (including differently abled)</h4>
      <Employees18
        empData={{
          reportingId: reportId,
          ewParticular: "Worker",
          ewIsDifferentlyAbled: 0,
        }}
      />

      <h4 className="label"> b. Differently abled Workers</h4>
      <Employees18
        empData={{
          reportingId: reportId,
          ewParticular: "Worker",
          ewIsDifferentlyAbled: 1,
        }}
      />

      {/* <TabPane tabId="3"> */}
      <h4 className="subHeading">19. Women Representation</h4>
      <h4 className="label">
        {" "}
        Participation/Inclusion/Representation of women
      </h4>
      <WomenRepresentation19
        data={{
          reportingId: reportId,
          config: config,
        }}
      />

      <h4 className="subHeading">
        20. Turnover rate for permanent employees and workers
        <span id="cat9" style={{ color: "green" }}>
          {" "}
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={"Disclose trends for the past 3 years"}
          openTooltipN={0}
          target="cat9"
        />
      </h4>
      <TurnoverRate20
        data={{
          reportingId: reportId,
          config: config,
        }}
      />
      <h4 className="subHeading">
        {" "}
        <span style={{ color: "#fcdb0a" }}>
          20. Participation/Inclusion/Representation of women (including
          differently abled)
        </span>{" "}
      </h4>
      <Participation20
        data={{
          reportingId: reportId,
          config: config,
        }}
      />

      {/* WORKMEN */}
      <h4 className="subHeading">
        <span style={{ color: "#fcdb0a" }}> Workmen </span>
      </h4>
      <h4 className="label" style={{ color: "#fcdb0a" }}>
        {" "}
        Total Workmen (including differently abled)
      </h4>
      <Workmen
        data={{
          reportingId: reportId,
          config: config,
          ewIsDifferentlyAbled: 0,
        }}
      />
      <h4 className="label" style={{ color: "#fcdb0a" }}>
        {" "}
        Differently abled Workmen
      </h4>
      <Workmen
        data={{
          reportingId: reportId,
          config: config,
          ewIsDifferentlyAbled: 1,
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
        }}
      >
        <Button
          id="next"
          className="mt-4 mb-4"
          color="dark"
          style={{ width: 100 }}
          disabled={
            isEditable ||
            isEditable1 ||
            isEditable2 ||
            isEditable3 ||
            isEditable4 ||
            isEditable5 ||
            isEditable6 ||
            isEditable7 ||
            isEditable8
          }
          onClick={() => {document.getElementById("sidebar12").click()}}
        >
          NEXT
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"next"} openTooltipN={0} target={"next"} />
      </div>

      <Toast error={err} setError={setErr} msg={msg} color={color} />
    </div>
  );
}

export default Employees;
