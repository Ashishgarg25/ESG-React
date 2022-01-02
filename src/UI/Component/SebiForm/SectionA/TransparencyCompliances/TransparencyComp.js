import React, { useState, useEffect } from "react";
import "@pathofdev/react-tag-input/build/index.css";
// import styles from "./transparencyComp.module.css";
import "../../../../../assets/css/styles.css";
import {
  HiPlus,
  HiOutlineTrash,
  HiSave,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import {
  Table,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import Toast from "../../../../../utils/Toast/Toast";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import axios from "axios";
import { apiUrl } from "../../../../../config/config";
import { getToken } from "../../../../../utils/LocalStorage/LocalStorage";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function TransparencyComp() {
  const { reportId } = useParams();
  const token = getToken() || "";
  const config = {
    headers: {
      token: token,
      "Content-type": "application/json",
    },
  };

  const [fy1Group, setFy1Group] = useState([]);
  const [fy2Group, setFy2Group] = useState([]);

  const [otherText1, setOtherText1] = useState("");
  const [otherText2, setOtherText2] = useState("");

  const [comnt1, setComnt1] = useState([]);
  const [invsr1, setInvsr1] = useState([]);
  const [shrhldr1, setShrhldr1] = useState([]);
  const [empAndWorker1, setEmpAndWorker1] = useState([]);
  const [custmr1, setCustmr1] = useState([]);
  const [vcp1, setVcp1] = useState([]);
  const [other1, setOther1] = useState([]);

  const [comnt2, setComnt2] = useState([]);
  const [invsr2, setInvsr2] = useState([]);
  const [shrhldr2, setShrhldr2] = useState([]);
  const [empAndWorker2, setEmpAndWorker2] = useState([]);
  const [custmr2, setCustmr2] = useState([]);
  const [vcp2, setVcp2] = useState([]);
  const [other2, setOther2] = useState([]);

  const [newGroup, setNewGroup] = useState();
  const [newGroup1, setNewGroup1] = useState();

  const [isEditable, setIsEditable] = useState(false);
  const [isEditable1, setIsEditable1] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  const [data, setData] = useState({});
  const brsrData = useSelector((state) => state);

  let obj = brsrData.brsr.finencial.response.find(
    (o) => o.entityId == reportId
  );
  useEffect(() => {
    setData(obj);
  }, []);

  useEffect(() => {
    getFYData();
  }, []);

  const getFYData = async () => {
    const currentFYData = await axios.get(
      `${apiUrl}entity/transparency-desclosure?reportingId=${reportId}&fy=1`,
      config
    );

    console.log(currentFYData);

    try {
      if (currentFYData.data.code === 200) {
        console.log("DATA IS", currentFYData.data.data.groups);
        currentFYData.data.data.groups.length > 0 &&
          setFy1Group(currentFYData.data.data.groups);
      }
    } catch (e) {
      console.log(e);
    }

    const previousFYData = await axios.get(
      `${apiUrl}entity/transparency-desclosure?reportingId=${reportId}&fy=2`,
      config
    );
    try {
      if (previousFYData.data.code === 200) {
        console.log(previousFYData.data.data);
        previousFYData.data.data.groups.length > 0 &&
          setFy2Group(previousFYData.data.data.groups);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveCurrentFYData = async () => {
    setIsLoading(true);

    const body = JSON.stringify({
      reportingId: reportId,
      fy: 1,
      comnt:
        Object.keys(fy1Group[0]).length != 0
          ? fy1Group[0]
          : Object.assign({}, comnt1),
      invsr:
        Object.keys(fy1Group[1]).length != 0
          ? fy1Group[1]
          : Object.assign({}, invsr1),
      shrhldr:
        Object.keys(fy1Group[2]).length != 0
          ? fy1Group[2]
          : Object.assign({}, shrhldr1),
      empAndWorker:
        Object.keys(fy1Group[3]).length != 0
          ? fy1Group[3]
          : Object.assign({}, empAndWorker1),
      custmr:
        Object.keys(fy1Group[4]).length != 0
          ? fy1Group[4]
          : Object.assign({}, custmr1),
      vcp:
        Object.keys(fy1Group[5]).length != 0
          ? fy1Group[5]
          : Object.assign({}, vcp1),
      other:
        Object.keys(fy1Group[6]).length != 0
          ? fy1Group[6]
          : Object.assign({}, other1),
    });

    try {

      const currentFYDataVal = await axios.post(
        `${apiUrl}entity/transparency-desclosure`,
        body,
        config
      );

      if (currentFYDataVal.data.code === 200) {

        setIsEditable(!isEditable);

        setIsLoading(false);
        setErr(true);
        setColor("Green");
        setMsg("Current FY data saved successfully");
        // setFy1Group(currentFYDataVal.data.data.groups)
      }
    } catch (e) {
      console.log("Error",e);
      setIsLoading(false);
      setErr(true);
      setColor("Red");
      setMsg("Failed to save data");
    }
  };

  const savePreviousFYData = async () => {
    setIsLoading1(true);

    const body = JSON.stringify({
      reportingId: reportId,
      fy: 2,
      comnt:
        Object.keys(fy2Group[0]).length != 0
          ? fy2Group[0]
          : Object.assign({}, comnt2),
      invsr:
        Object.keys(fy2Group[1]).length != 0
          ? fy2Group[1]
          : Object.assign({}, invsr2),
      shrhldr:
        Object.keys(fy2Group[2]).length != 0
          ? fy2Group[2]
          : Object.assign({}, shrhldr2),
      empAndWorker:
        Object.keys(fy2Group[3]).length != 0
          ? fy2Group[3]
          : Object.assign({}, empAndWorker2),
      custmr:
        Object.keys(fy2Group[4]).length != 0
          ? fy2Group[4]
          : Object.assign({}, custmr2),
      vcp:
        Object.keys(fy2Group[5]).length != 0
          ? fy2Group[5]
          : Object.assign({}, vcp2),
      other:
        Object.keys(fy2Group[6]).length != 0
          ? fy2Group[6]
          : Object.assign({}, other2),
    });

    console.log(body);

    
    try {

      const previousFYDataVal = await axios.post(
        `${apiUrl}entity/transparency-desclosure`,
        body,
        config
      );

      if (previousFYDataVal.data.code === 200) {
        console.log(previousFYDataVal.data.data);

        setIsEditable1(!isEditable1);

        setIsLoading1(false);
        setErr(true);
        setColor("Green");
        setMsg("Previous FY data saved successfully");
        // setFy2Group(previousFYDataVal.data.data.groups)
      }else{
        setIsLoading1(false);
        setErr(true);
        setColor("Red");
        setMsg("All fields are mandatory!");
      }
    } catch (e) {
      console.log("Error",e);
      setIsLoading1(false);
      setErr(true);
      setColor("Red");
      setMsg("Failed to save data");
    }
  };

  const handleChange = (e, sholder) => {
    console.log(comnt1);

    const { name, value } = e.target;

    if (sholder === "Communities") {
      if (Object.keys(fy1Group[0]).length != 0) {
        if (name === "isGMinPlace0") {
          fy1Group[0].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy1Group[0].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy1Group[0].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy1Group[0].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy1Group[0].compPendingYE = value;
        } else {
          fy1Group[0].remarks = value;
        }
      } else {
        setComnt1({
          ...comnt1,
          [name === "isGMinPlace0" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Investors") {
      if (Object.keys(fy1Group[1]).length != 0) {
        if (name === "isGMinPlace1") {
          fy1Group[1].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy1Group[1].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy1Group[1].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy1Group[1].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy1Group[1].compPendingYE = value;
        } else {
          fy1Group[1].remarks = value;
        }
      } else {
        setInvsr1({
          ...invsr1,
          [name === "isGMinPlace1" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Shareholders") {
      if (Object.keys(fy1Group[2]).length != 0) {
        if (name === "isGMinPlace2") {
          fy1Group[2].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy1Group[2].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy1Group[2].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy1Group[2].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy1Group[2].compPendingYE = value;
        } else {
          fy1Group[2].remarks = value;
        }
      } else {
        setShrhldr1({
          ...shrhldr1,
          [name === "isGMinPlace2" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Employees & Workers") {
      if (Object.keys(fy1Group[3]).length != 0) {
        if (name === "isGMinPlace3") {
          fy1Group[3].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy1Group[3].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy1Group[3].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy1Group[3].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy1Group[3].compPendingYE = value;
        } else {
          fy1Group[3].remarks = value;
        }
      } else {
        setEmpAndWorker1({
          ...empAndWorker1,
          [name === "isGMinPlace3" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Customers") {
      if (Object.keys(fy1Group[4]).length != 0) {
        if (name === "isGMinPlace4") {
          fy1Group[4].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy1Group[4].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy1Group[4].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy1Group[4].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy1Group[4].compPendingYE = value;
        } else {
          fy1Group[4].remarks = value;
        }
      } else {
        setCustmr1({
          ...custmr1,
          [name === "isGMinPlace4" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Value Chain Partners") {
      if (Object.keys(fy1Group[5]).length != 0) {
        if (name === "isGMinPlace5") {
          fy1Group[5].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy1Group[5].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy1Group[5].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy1Group[5].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy1Group[5].compPendingYE = value;
        } else {
          fy1Group[5].remarks = value;
        }
      } else {
        setVcp1({
          ...vcp1,
          [name === "isGMinPlace5" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else {
      if (Object.keys(fy1Group[6]).length != 0) {
        if (name === "isGMinPlace6") {
          fy1Group[6].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy1Group[6].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy1Group[6].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy1Group[6].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy1Group[6].compPendingYE = value;
        } else {
          fy1Group[6].remarks = value;
        }
      } else {
        setOther1({
          ...other1,
          [name === "isGMinPlace6" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
          stakeholderOtherText: otherText1,
        });
      }
    }

    setNewGroup({
      ...newGroup,
      fy1Group,
    });
  };

  const handleChange1 = (e, sholder) => {
    const { name, value } = e.target;

    if (sholder === "Communities") {
      if (Object.keys(fy2Group[0]).length != 0) {
        if (name === "isGMinPlace0") {
          fy2Group[0].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy2Group[0].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy2Group[0].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy2Group[0].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy2Group[0].compPendingYE = value;
        } else {
          fy2Group[0].remarks = value;
        }
      } else {
        setComnt2({
          ...comnt2,
          [name === "isGMinPlace0" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Investors") {
      if (Object.keys(fy2Group[1]).length != 0) {
        if (name === "isGMinPlace1") {
          fy2Group[1].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy2Group[1].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy2Group[1].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy2Group[1].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy2Group[1].compPendingYE = value;
        } else {
          fy2Group[1].remarks = value;
        }
      } else {
        setInvsr2({
          ...invsr2,
          [name === "isGMinPlace1" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Shareholders") {
      if (Object.keys(fy2Group[2]).length != 0) {
        if (name === "isGMinPlace2") {
          fy2Group[2].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy2Group[2].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy2Group[2].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy2Group[2].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy2Group[2].compPendingYE = value;
        } else {
          fy2Group[2].remarks = value;
        }
      } else {
        setShrhldr2({
          ...shrhldr2,
          [name === "isGMinPlace2" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Employees & Workers") {
      if (Object.keys(fy2Group[3]).length != 0) {
        if (name === "isGMinPlace3") {
          fy2Group[3].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy2Group[3].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy2Group[3].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy2Group[3].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy2Group[3].compPendingYE = value;
        } else {
          fy2Group[3].remarks = value;
        }
      } else {
        setEmpAndWorker2({
          ...empAndWorker2,
          [name === "isGMinPlace3" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Customers") {
      if (Object.keys(fy2Group[4]).length != 0) {
        if (name === "isGMinPlace4") {
          fy2Group[4].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy2Group[4].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy2Group[4].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy2Group[4].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy2Group[4].compPendingYE = value;
        } else {
          fy2Group[4].remarks = value;
        }
      } else {
        setCustmr2({
          ...custmr2,
          [name === "isGMinPlace4" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else if (sholder === "Value Chain Partners") {
      if (Object.keys(fy2Group[5]).length != 0) {
        if (name === "isGMinPlace5") {
          fy2Group[5].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy2Group[5].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy2Group[5].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy2Group[5].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy2Group[5].compPendingYE = value;
        } else {
          fy2Group[5].remarks = value;
        }
      } else {
        setVcp2({
          ...vcp2,
          [name === "isGMinPlace5" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
        });
      }
    } else {
      if (Object.keys(fy2Group[6]).length != 0) {
        if (name === "isGMinPlace6") {
          fy2Group[6].isGMinPlace = value;
        } else if (name === "mca_compFiledBY") {
          fy2Group[6].mca_compFiledBY = value;
        } else if (name === "compFiledDY") {
          fy2Group[6].compFiledDY = value;
        } else if (name === "compPendingYE") {
          fy2Group[6].compPendingYE = value;
        } else if (name === "compPendingYE") {
          fy2Group[6].compPendingYE = value;
        } else {
          fy2Group[6].remarks = value;
        }
      } else {
        setOther2({
          ...other2,
          [name === "isGMinPlace6" ? "isGMinPlace" : name]:
            name === "mca_compFiledBY" ||
            name === "compFiledDY" ||
            name === "compPendingYE"
              ? Number(value)
              : value,
          stakeholderOtherText: otherText2,
        });
      }
    }

    setNewGroup1({
      ...newGroup1,
      fy2Group,
    });
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
          FY {data?.financialYear} (Q{data?.quarter}) &nbsp;/&nbsp;&nbsp;{" "}
        </span>
        <span className="breadCrumbItem"> Section A &nbsp;/&nbsp;&nbsp; </span>
        <span className="breadCrumbActive">
          {" "}
          Transparency and Disclosures Compliances{" "}
        </span>
      </div>
      <div className="float-right" style={{ color: "#f56" }}>
        <span>{data?.companyName}</span> - <span>{data?.reportingBoundary}</span>{" "}
        - <span>FY {data?.financialYear}</span> - <span>(Q{data?.quarter})</span>
      </div>
      <h2 className="heading" style={{ color: "#fff", paddingTop: 24 }}>
        VII 23. Transparency and Disclosures Compliances
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ color: "#2B8CD6", fontSize: 20, padding: 16 }}>
          Current Fiscal Year{" "}
          <span id="cat9" style={{ color: "green" }}>
            {" "}
            <HiOutlineInformationCircle size={20} color="#fff" />
          </span>
          <TooltipComp
            message={
              "Complaints/Grievances on any of the principles (Principles 1 to 9) under the National Guidelines on Responsible Business Conduct"
            }
            openTooltipN={0}
            target="cat9"
          />
        </h4>
      </div>

      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead>
          <tr>
            <th className="tableHeading" style={{ width: 250 }}>
              Stakeholder group from whom complaint is received{" "}
            </th>
            <th className="tableHeading">
              Grievance Redressal Mechanism in Place{" "}
            </th>
            <th className="tableHeading">
              <span style={{ color: "#fcdb0a" }}>
                Number of No. of Complaints at beginning of the year{" "}
              </span>{" "}
            </th>
            <th className="tableHeading">
              Number of No. of Complaints during the year{" "}
            </th>
            <th className="tableHeading">
              Number of complaints pending resolution at close of the year{" "}
            </th>
            <th className="tableHeading" style={{ width: 350 }}>
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {fy1Group.map((item, idx) => (
            <tr key={idx}>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  {item.stakeholderGroup !== "Other" ? (
                    <Input
                      type="text"
                      disabled
                      className="input inputWithoutBg"
                      name="text"
                      defaultValue={item.stakeholderGroup}
                    />
                  ) : (
                    <Input
                      type="text"
                      disabled={isEditable}
                      className={isEditable ? "input inputWithoutBg" : "input"}
                      name="text"
                      defaultValue={item.stakeholderOtherText}
                      placeholder="Others ( Please Specify )"
                      onChange={(e) => setOtherText1(e.target.value)}
                    />
                  )}
                </FormGroup>
              </td>
              <td className="tableHeading">
                <Row>
                  <Col xs={5} md={5} className="ml-3">
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input
                          type="radio"
                          disabled={isEditable}
                          name={"isGMinPlace" + idx}
                          value="Yes"
                          onChange={(e) =>
                            handleChange(e, item.stakeholderGroup)
                          }
                          defaultChecked={item.isGMinPlace === "Yes"}
                        />
                        Yes
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs={5} md={5}>
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input
                          type="radio"
                          disabled={isEditable}
                          name={"isGMinPlace" + idx}
                          value="No"
                          onChange={(e) =>
                            handleChange(e, item.stakeholderGroup)
                          }
                          defaultChecked={item.isGMinPlace === "No"}
                        />
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    disabled={isEditable}
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    name="mca_compFiledBY"
                    placeholder="No. of Complaints"
                    defaultValue={item.mca_compFiledBY}
                    onChange={(e) => handleChange(e, item.stakeholderGroup)}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    disabled={isEditable}
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    name="compFiledDY"
                    placeholder="No. of Complaints"
                    defaultValue={item.compFiledDY}
                    onChange={(e) => handleChange(e, item.stakeholderGroup)}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    disabled={isEditable}
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    name="compPendingYE"
                    placeholder="No. of Complaints"
                    defaultValue={item.compPendingYE}
                    onChange={(e) => handleChange(e, item.stakeholderGroup)}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="textarea"
                    disabled={isEditable}
                    rows={1}
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    name="remarks"
                    placeholder="Remarks"
                    defaultValue={item.remarks}
                    onChange={(e) => handleChange(e, item.stakeholderGroup)}
                  />
                </FormGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
        }}
      >
        {isEditable && (
          <>
            <Button
              id="edit0"
              className="mt-4 mb-4"
              color="secondary"
              style={{ width: 100 }}
              onClick={() => setIsEditable(!isEditable)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit0"} />
          </>
        )}

        {!isEditable && (
          <>
            <Button
              id="save13"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveCurrentFYData()}
            >
              {isLoading ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiSave size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save13"} />
          </>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4
          style={{ color: "#2B8CD6", fontSize: 20, padding: 16, paddingTop: 0 }}
        >
          Previous Fiscal Year{" "}
          <span id="cat9" style={{ color: "green" }}>
            {" "}
            <HiOutlineInformationCircle size={20} color="#fff" />
          </span>
          <TooltipComp
            message={
              "Complaints/Grievances on any of the principles (Principles 1 to 9) under the National Guidelines on Responsible Business Conduct"
            }
            openTooltipN={0}
            target="cat9"
          />
        </h4>
      </div>

      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead>
          <tr>
            <th className="tableHeading" style={{ width: 250 }}>
              Stakeholder group from whom complaint is received{" "}
            </th>
            <th className="tableHeading">
              Grievance Redressal Mechanism in Place{" "}
            </th>
            <th className="tableHeading">
              {" "}
              <span style={{ color: "#fcdb0a" }}>
                Number of No. of Complaints at beginning of the year{" "}
              </span>{" "}
            </th>
            <th className="tableHeading">
              Number of No. of Complaints during the year{" "}
            </th>
            <th className="tableHeading">
              Number of complaints pending resolution at close of the year{" "}
            </th>
            <th className="tableHeading" style={{ width: 350 }}>
              Remarks
            </th>
          </tr>
        </thead>
        <tbody>
          {fy2Group.map((item, idx) => (
            <tr key={idx}>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  {item.stakeholderGroup !== "Other" ? (
                    <Input
                      type="text"
                      disabled
                      className="input inputWithoutBg"
                      name="text"
                      defaultValue={item.stakeholderGroup}
                    />
                  ) : (
                    <Input
                      type="text"
                      disabled={isEditable1}
                      className={isEditable1 ? "input inputWithoutBg" : "input"}
                      name="text"
                      defaultValue={item.stakeholderOtherText}
                      placeholder="Others ( Please Specify )"
                      onChange={(e) => setOtherText2(e.target.value)}
                    />
                  )}
                </FormGroup>
              </td>
              <td className="tableHeading">
                <Row>
                  <Col xs={5} md={5} className="ml-3">
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input
                          type="radio"
                          disabled={isEditable1}
                          name={"isGMinPlace" + idx}
                          value="Yes"
                          onChange={(e) =>
                            handleChange1(e, item.stakeholderGroup)
                          }
                          defaultChecked={item.isGMinPlace === "Yes"}
                        />
                        Yes
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs={5} md={5}>
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input
                          type="radio"
                          disabled={isEditable1}
                          name={"isGMinPlace" + idx}
                          value="No"
                          onChange={(e) =>
                            handleChange1(e, item.stakeholderGroup)
                          }
                          defaultChecked={item.isGMinPlace === "No"}
                        />
                        No
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    disabled={isEditable1}
                    className={isEditable1 ? "input inputWithoutBg" : "input"}
                    name="mca_compFiledBY"
                    placeholder="No. of Complaints"
                    defaultValue={item.mca_compFiledBY}
                    onChange={(e) => handleChange1(e, item.stakeholderGroup)}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    disabled={isEditable1}
                    className={isEditable1 ? "input inputWithoutBg" : "input"}
                    name="compFiledDY"
                    placeholder="No. of Complaints"
                    defaultValue={item.compFiledDY}
                    onChange={(e) => handleChange1(e, item.stakeholderGroup)}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    disabled={isEditable1}
                    className={isEditable1 ? "input inputWithoutBg" : "input"}
                    name="compPendingYE"
                    placeholder="No. of Complaints"
                    defaultValue={item.compPendingYE}
                    onChange={(e) => handleChange1(e, item.stakeholderGroup)}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="textarea"
                    disabled={isEditable1}
                    rows={1}
                    className={isEditable1 ? "input inputWithoutBg" : "input"}
                    name="remarks"
                    placeholder="Remarks"
                    defaultValue={item.remarks}
                    onChange={(e) => handleChange1(e, item.stakeholderGroup)}
                  />
                </FormGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
        }}
      >
        {isEditable1 && (
          <>
            <Button
              id="edit"
              className="mt-4 mb-4"
              color="secondary"
              style={{ width: 100 }}
              onClick={() => setIsEditable1(!isEditable1)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit"} />
          </>
        )}

        {!isEditable1 && (
          <>
            <Button
              id="save26"
              className="mt-4 mb-4 mr-3"
              color="primary"
              style={{ width: 100 }}
              onClick={() => savePreviousFYData()}
            >
              {isLoading1 ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save26"} />
          </>
        )}
        <Button
          id="next"
          className="mt-4 mb-4"
          color="dark"
          style={{ width: 100 }}
          disabled={!isEditable || !isEditable1}
          onClick={() => {document.getElementById("sidebar15").click()}}
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

export default TransparencyComp;
