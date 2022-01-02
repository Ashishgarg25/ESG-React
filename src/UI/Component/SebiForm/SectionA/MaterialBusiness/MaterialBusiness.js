import React, { useState, useEffect } from "react";
import "@pathofdev/react-tag-input/build/index.css";
// import styles from "./materialBusiness.module.css";
import "../../../../../assets/css/styles.css";
import {
  HiPlus,
  HiOutlineTrash,
  HiPencil,
  HiOutlineBookmarkAlt,
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

function MaterialBusiness() {
  const { reportId } = useParams();
  const token = getToken() || "";

  const config = {
    headers: {
      token: token,
      "Content-type": "application/json",
    },
  };

  const [inputList, setInputList] = useState([
    {
      id: 1,
      miId: "",
      materialIssue: "",
      isRO: "",
      rationaleForRO: "",
      rishApproach: "",
      financialImpact: 0,
    },
  ]);

  const [count, setCount] = useState(1);
  const [materialBusiness, setMaterialBusiness] = useState();
  const [invalidList, setInvalidList] = useState([]);

  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const addField = () => {
    setInputList([
      ...inputList,
      {
        id: count + 1,
        miId: "",
        materialIssue: "",
        isRO: "",
        rationaleForRO: "",
        rishApproach: "",
        financialImpact: 0,
      },
    ]);

    setCount(count + 1);
  };

  // const editField = (idx) => {
  //   setIsEditable(!isEditable);
  //   console.log("edit=====", idx);
  // };

  const removeField = async (miId, id) => {
    //UI (REMOVE AFTER BACKEND WORKS)
    const list = inputList.filter((item) => item.id !== id);
    setInputList(list);

    if (miId !== "") {
      // const body = JSON.stringify({
      //   reportingId: reportId,
      //   miId: miId,
      // });

      const materialData = await axios({
        method: "DELETE",
        url: `${apiUrl}entity/material-issues`,
        data: {
          reportingId: reportId,
          miId: miId,
        },
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });

      try {
        if (materialData.data.code === 200) {
          setMsg(materialData.data.message);
          setErr(true);
          setColor("Green");
          console.log("DELETE=================", materialData.data.data);
          getMaterialIssueData();
        }
      } catch (e) {
        setErr(true);
        setColor("Red");
        setMsg(e.response.data.message);
      }
    }
  };

  useEffect(() => {
    getMaterialIssueData();
  }, []);

  const getMaterialIssueData = async () => {
    const materialIssueData = await axios.get(
      `${apiUrl}entity/material-issues?reportingId=${reportId}`,
      config
    );

    try {
      if (materialIssueData.data.code === 200) {
        console.log("MATERIAL DATA", materialIssueData.data.data.data);

        if (materialIssueData.data.data.data !== undefined) {
          materialIssueData.data.data.data.length > 0
            ? setIsEditable(true)
            : setIsEditable(false);
          setInputList(materialIssueData.data.data.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // ================ HANDLE CHANGE =================

  const handleChange = (e, idx) => {

    const { name, value } = e.target;

    if (name === "materialIssue") {
      inputList[idx].materialIssue = value;
    } else if (name === "isRO") {
      inputList[idx].isRO = value;
    } else if (name === "rationaleForRO") {
      inputList[idx].rationaleForRO = value;
    } else if (name === "rishApproach") {
      inputList[idx].rishApproach = value;
    } else {
      inputList[idx].financialImpact = parseInt(value);
    }

    setMaterialBusiness({
      ...materialBusiness,
      inputList,
    });
  };

  const saveMaterialIssue = async () => {
    console.log(inputList);

    setIsLoading(true);

    const body = JSON.stringify({
      reportingId: reportId,
      data: inputList,
    });

    console.log(body);

    try {
      const materialIssueResponse = await axios.post(
        `${apiUrl}entity/material-issues`,
        body,
        config
      );
      if (materialIssueResponse.data.code === 200) {
        setMsg("Successfully saved data");

        console.log("==========Material", materialIssueResponse.data.data);

        materialIssueResponse.data.data.data.forEach((element, idx) => {
          inputList[idx].miId = element.miId;
        });

        setIsEditable(!isEditable);

        setIsLoading(false);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      setErr(true);
      setMsg("Failed to save data");
      setColor("Red");
    }
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
        <span className="breadCrumbActive"> Material Business </span>
      </div>
      <div className="float-right" style={{ color: "#f56" }}>
        <span>{data.companyName}</span> - <span>{data.reportingBoundary}</span>{" "}
        - <span>FY {data.financialYear}</span> - <span>(Q{data.quarter})</span>
      </div>
      <h2 className="heading" style={{ color: "#fff" }}>
        VII Material Business
      </h2>

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
          24. Overview of the entity’s material responsible business conduct
          issues{" "}
          <span id="cat9" style={{ color: "green" }}>
            {" "}
            <HiOutlineInformationCircle size={20} color="#fff" />
          </span>
          <TooltipComp
            message={
              "Please indicate material responsible business conduct and sustainability issues pertaining to environmental and social matters that present a risk or an opportunity to your business, rationaleForRO for identifying the same, rishApproach to adapt or mitigate the risk along-with its financial financialImpact, as per the following format"
            }
            openTooltipN={0}
            target="cat9"
          />
        </h4>
      </div>

      <Table
        dark
        size="sm"
        className="text-center mt-4"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading">S.No.</th>
            <th className="tableHeading">
              High Priority / Material Issue identified
            </th>
            <th className="tableHeading">
              Indicate whether risk or opportunity (R/O)
            </th>
            <th className="tableHeading">
              Rationale for identifying the risk / opportunity{" "}
            </th>
            <th className="tableHeading">
              In case of risk, Approach to adapt or mitigate{" "}
            </th>
            <th className="tableHeading">
              Financial Impact of the risk or opportunity{" "}
              <span id="cat4" style={{ color: "green" }}>
                {" "}
                <HiOutlineInformationCircle size={20} color="#fff" />
              </span>
              <TooltipComp
                message={
                  "Including both manufactured and traded & accounting for more than 90% of entity's turnover"
                }
                openTooltipN={0}
                target="cat4"
              />{" "}
            </th>
            <th className="tableHeading" colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {inputList.map((item, idx) => (
            <tr key={item.miId}>
              <td className="tableHeading" className="pt-3">
                {" "}
                {idx + 1}{" "}
              </td>
              <td className="tableHeading">
                <Input
                  type="text"
                  className={isEditable ? "input inputWithoutBg" : "input"}
                  disabled={isEditable}
                  name="materialIssue"
                  placeholder="Material Issue"
                  value={item.materialIssue}
                  onChange={(e) => {
                    if (e.target.value === "" || e.target.value === " ") {
                      setInvalidList([...invalidList, "materialIssue" + idx]);
                    } else {
                      setInvalidList(
                        invalidList?.filter(
                          (item) => item !== "materialIssue" + idx
                        )
                      );
                      handleChange(e, idx);
                    }
                  }}
                  invalid={invalidList?.includes("materialIssue" + idx)}
                />
                <FormFeedback className="text-left">
                  Please enter valid Material Issue
                </FormFeedback>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <select
                    className={isEditable ? "select inputWithoutBg" : "select"}
                    disabled={isEditable}
                    name="isRO"
                    value={item.isRO}
                    onChange={(e) => handleChange(e, idx)}
                    defaultValue="Risk"
                  >
                    <option value="none" selected>Select...</option>
                    <option value="Risk">Risk</option>
                    <option value="Opportunity">Opportunity</option>
                  </select>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="text"
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    disabled={isEditable}
                    name="rationaleForRO"
                    value={item.rationaleForRO}
                    placeholder="Rationale for Identifying"
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([
                          ...invalidList,
                          "rationaleForRO" + idx,
                        ]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "rationaleForRO" + idx
                          )
                        );
                        handleChange(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("rationaleForRO" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid Material rationale
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="text"
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    disabled={isEditable}
                    name="rishApproach"
                    placeholder="Approach"
                    value={item.rishApproach}
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([...invalidList, "rishApproach" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "rishApproach" + idx
                          )
                        );
                        handleChange(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("rishApproach" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid Material rish or Approach
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    disabled={isEditable}
                    name="financialImpact"
                    placeholder="%age of Financial Implications"
                    value={item.financialImpact}
                    onChange={(e) => {
                      handleChange(e, idx);
                    }}
                    invalid={invalidList?.includes("financialImpact" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid Material financial impact
                  </FormFeedback>
                </FormGroup>
              </td>

              {/* <td className="tableHeading" className="pt-3">
                <HiPencil
                  size={22}
                  color="#2B8CD6"
                  id={"edit" + idx}
                  onClick={() => editField(item.miId)}
                />
                <TooltipComp
                  message={"edit"}
                  openTooltipN={0}
                  target={"edit" + idx}
                />
              </td> */}
              <td className="tableHeading" className="pt-3">
                <HiOutlineTrash
                  size={22}
                  id={"delete" + idx}
                  color={inputList.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    inputList.length > 1 ? removeField(item.miId, item.id) : ""
                  }
                />
                <TooltipComp
                  message={"delete"}
                  openTooltipN={0}
                  target={"delete" + idx}
                />
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
              id="edit2"
              className="mt-4 mb-4"
              color="secondary"
              onClick={() => setIsEditable(!isEditable)}
              style={{ width: 100 }}
            >
              EDIT
              {/* <HiPlus size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit2"} />
          </>
        )}

        {!isEditable && (
          <>
            <Button
              id="add2"
              className="mt-4 mb-4 mr-3"
              color="warning"
              onClick={() => addField()}
              style={{ width: 100 }}
            >
              ADD
              {/* <HiPlus size={24} /> */}
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"add2"} />
            <Button
              id="save14"
              className="mt-4 mb-4 mr-3"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveMaterialIssue()}
            >
              {isLoading ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save14"} />
          </>
        )}

        {/* {inputList.length <= 2 ? (
          <Button
            id="add2"
            className="mt-4 mb-4 mr-3"
            color="warning"
            onClick={() => addField()}
            style={{ width: 100 }}
          >
            ADD
            <HiPlus size={24} />
          </Button>
        ) : null} */}

        <Button
          id="next"
          className="mt-4 mb-4"
          color="dark"
          style={{ width: 100 }}
          disabled={!isEditable}
          onClick={() => {document.getElementById("sidebar16").click()}}
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

export default MaterialBusiness;
