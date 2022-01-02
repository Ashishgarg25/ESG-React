import React, { useState, useEffect } from "react";
import "../../../../../assets/css/styles.css";
// import styles from "./holdings.module.css";
import { HiPlus, HiOutlineTrash } from "react-icons/hi";
import {
  Table,
  FormGroup,
  Input,
  FormFeedback,
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import Toast from "../../../../../utils/Toast/Toast";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import RegEx from "../../../../../utils/RegEx/RegEx";
import axios from "axios";
import { apiUrl } from "../../../../../config/config";
import { getToken } from "../../../../../utils/LocalStorage/LocalStorage";
import { useParams } from "react-router";
import { eachDayOfInterval } from "date-fns";
import { useSelector } from "react-redux";

function Holdings() {
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
      ecId: "",
      ecName: "",
      ecType: "",
      entityShare: "",
      isBRI: "",
      mca_cin_frns: "",
    },
    {
      id: 2,
      ecId: "",
      ecName: "",
      ecType: "",
      entityShare: "",
      isBRI: "",
      mca_cin_frns: "",
    },
    {
      id: 3,
      ecId: "",
      ecName: "",
      ecType: "",
      entityShare: "",
      isBRI: "",
      mca_cin_frns: "",
    },
  ]);

  const [count, setCount] = useState(1);

  const [holdingErr, setHoldingErr] = useState(false);
  const [shareErr, setShareErr] = useState(false);

  const [holdings, setHoldings] = useState();
  const [invalidList, setInvalidList] = useState([]);

  const [indication, setIndication] = useState();

  const [isEditable, setIsEditable] = useState(false);
  const [isEditable1, setIsEditable1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  const [msg1, setMsg1] = useState("");

  const [ checked, setChecked ] = useState(false)
  // const [activeTab, setActiveTab] = useState("1");

  // const toggle = (tab) => {
  //     if (activeTab !== tab) setActiveTab(tab);
  // };

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
        ecId: "",
        ecName: "",
        ecType: "",
        entityShare: "",
        isBRI: "",
        mca_cin_frns: "",
      },
    ]);

    setCount(count + 1);
  };

  const editField = (idx) => {
    setIsEditable(!isEditable);

    console.log("edit=====", idx);
  };

  const removeField = async (ecId, id) => {
    const list = inputList.filter((item) => item.id !== id);
    setInputList(list);

    if (ecId !== "") {
      const holdingData = await axios({
        method: "DELETE",
        url: `${apiUrl}entity/entity-company`,
        data: {
          reportingId: reportId,
          ecId: ecId,
        },
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });

      try {
        if (holdingData.data.code === 200) {
          console.log(holdingData.data.message);
          console.log(holdingData.data.data);
          getHoldingsData();
        }
      } catch (e) {
        console.log(e.response.data.message);
      }
    }
  };

  // ================ HANDLE CHANGE =================

  const handleChange = (e, idx) => {
    const { name, value } = e.target;

    if (name === "ecName") {
      inputList[idx].ecName = value;
    } else if (name === "ecType") {
      inputList[idx].ecType = value;
    } else if (name === "entityShare") {
      inputList[idx].entityShare = parseInt(value);
    } else if (name === "mca_cin_frns") {
      setMsg1("");
      const found = inputList.some((item) => item.mca_cin_frns === value);
      if (!found) {
        inputList[idx].mca_cin_frns = value;
      } else {
        setInvalidList([...invalidList, "mca_cin_frns" + idx]);
        setMsg1("CIN/FCRN Number can not be same");
      }
    } else {
      inputList[idx].isBRI = value;
    }

    setHoldings({
      ...holdings,
      inputList,
    });
  };

  useEffect(() => {
    getHoldingsData();
    getHoldingsMcaData();
  }, []);

  const getHoldingsData = async () => {
    const holdingRetrievedData = await axios.get(
      `${apiUrl}entity/entity-company?reportingId=${reportId}`,
      config
    );
    console.log(holdingRetrievedData);
    try {
      if (holdingRetrievedData.data.code === 200) {
        console.log("MSG", holdingRetrievedData.data.message);
        console.log("===============DATA", holdingRetrievedData.data.data);
        console.log(
          "===============DATA112232",
          holdingRetrievedData.data.data.data
        );
        holdingRetrievedData.data.data.data.length > 0 &&
          setInputList(holdingRetrievedData.data.data.data);

        setIsEditable(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveHoldings = async () => {
    setIsLoading(true);

    const body = JSON.stringify({
      reportingId: reportId,
      data: inputList,
    });

    
    try {

      const holdingsData = await axios.post(
        `${apiUrl}entity/entity-company`,
        body,
        config
      );

      if (holdingsData.data.code === 200) {
        console.log(holdingsData.data.message);
        console.log(holdingsData.data.data);

        setMsg("Data saved successfully");

        holdingsData.data.data.data.forEach((element, idx) => {
          inputList[idx].ecId = element.ecId;
        });

        setIsEditable(!isEditable);

        setIsLoading(false);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.log(e.response.data.message);
      setIsLoading(false);
      setErr(true);
      setColor("Red");
      setMsg("Failed to save data");
    }
  };

  const getHoldingsMcaData = async () => {
    const holdingsMca = await axios.get(
      `${apiUrl}entity/mca-21a-21b?reportingId=${reportId}`,
      config
    );
    try {
      if (holdingsMca.data.code === 200) {
        console.log(holdingsMca.data.message);

        setIndication(holdingsMca.data.data.mca_21_b);
        console.log("MCA DATA", holdingsMca.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveMcaHoldings = async () => {
    setIsLoading1(true);

    const body = JSON.stringify({
      reportingId: reportId,
      mca_no_of_subsi: inputList.length,
      mca_21_b: indication,
    });

    
    try {

      const mcaHoldingData = await axios.post(
        `${apiUrl}entity/mca-21a-21b`,
        body,
        config
      );

      
      if (mcaHoldingData.data.code === 200) {
        console.log(mcaHoldingData.data.message);
        console.log(mcaHoldingData.data.data);

        setIsEditable1(!isEditable1);

        setIsLoading1(false);
        setErr(true);
        setColor("Green");
        setMsg("data saved successfully");
      }
    } catch (e) {
      console.log(e);
      setIsLoading1(false);
      setErr(true);
      setColor("Red");
      setMsg("Failed to save data");
    }
  };

  console.log("data",data?.nameOfHSAJ?.length)

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
        <span className="breadCrumbActive"> Holdings </span>
      </div>
      <div className="float-right" style={{ color: "#f56" }}>
        <span>{data.companyName}</span> - <span>{data.reportingBoundary}</span>{" "}
        - <span>FY {data.financialYear}</span> - <span>(Q{data.quarter})</span>
      </div>
      <h2 className="heading" style={{ color: "#fff" }}>
        V Holdings
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 className="subHeading">
          {" "}
          21. (a) Names of subsidiary / associate companies ( including Joint
          Ventures ){" "}
        </h4>
      </div>

      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading">S.No.</th>
            <th className="tableHeading">
              Name of Holdings / Subsidiary / Associates / Companies / Joint
              Ventures
            </th>
            <th className="tableHeading">
              Indicate whether holding/ Subsidiary/ Associate/ Joint Venture
            </th>
            <th className="tableHeading">% of shares held by listed entity </th>
            <th className="tableHeading">
              Does the entity participate in the Business Responsibility
              initiatives of the listed entity?
            </th>
            <th className="tableHeading" style={{ width: 250 }}>
              <span style={{ color: "#fcdb0a" }}> CIN / FCRN </span>
            </th>
            {/* <th className="tableHeading" colSpan={3}></th> */}
          </tr>
        </thead>
        <tbody>
          { data?.nameOfHSAJ?.length > 0 && inputList.map((item, idx) => (
            <tr key={item.id}>
              <td className="tableHeading" className="pt-3">
                {" "}
                {idx + 1}{" "}
              </td>
              <td className="tableHeading">
                <Input
                  type="text"
                  // className={isEditable ? "input inputWithoutBg" : "input"}
                  // disabled={isEditable}
                  className="input inputWithoutBg"
                  // value={item.ecName}
                  value={data?.nameOfHSAJ[idx]}
                  name="ecName"
                  // placeholder="Name of Holdings"
                  // onChange={(e) => {
                  //   if (e.target.value === "" || e.target.value === " ") {
                  //     setInvalidList([...invalidList, "ecName" + idx]);
                  //   } else {
                  //     setInvalidList(
                  //       invalidList?.filter((item) => item !== "ecName" + idx)
                  //     );
                  //     handleChange(e, idx);
                  //   }
                  // }}
                  // invalid={invalidList?.includes("ecName" + idx)}
                />
                <FormFeedback className="text-left">
                  Please enter valid holding Name
                </FormFeedback>
              </td>

              <td className="tableHeading">
                <FormGroup className="m-0">
                  <select
                    className={isEditable ? "select inputWithoutBg" : "select"}
                    disabled={isEditable}
                    value={item.ecType}
                    name="ecType"
                    onChange={(e) => {
                      handleChange(e, idx);
                    }}
                  >
                    <option selected value="undefined">
                      Select...
                    </option>
                    <option value="Holding">Holding</option>
                    <option value="Subsidiary">Subsidiary</option>
                    <option value="Associates">Associates</option>
                    <option value="Joint Ventures">Joint Ventures</option>
                  </select>
                </FormGroup>
              </td>

              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    disabled={isEditable}
                    value={item.entityShare}
                    name="entityShare"
                    placeholder="Shares held in %"
                    onChange={(e) => {
                      if (e.target.value.length > 0 && e.target.value <= 100) {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "entityShare" + idx
                          )
                        );
                        handleChange(e, idx);
                      } else {
                        setInvalidList([...invalidList, "entityShare" + idx]);
                      }
                    }}
                    invalid={invalidList?.includes("entityShare" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Percentage of shares can not be more that 100%
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <Row>
                  <Col xs={5} md={5} className="ml-3">
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input
                          id={idx}
                          value="Yes"
                          disabled={isEditable}
                          type="radio"
                          name={"isBRI" + idx}
                          defaultChecked={item.isBRI === "Yes"}
                          onChange={(e) => handleChange(e, idx)}
                        />
                        Yes
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs={5} md={5}>
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input
                          id={idx}
                          value="No"
                          disabled={isEditable}
                          type="radio"
                          name={"isBRI" + idx}
                          defaultChecked={item.isBRI === "No"}
                          onChange={(e) => handleChange(e, idx)}
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
                    type="text"
                    className={isEditable ? "input inputWithoutBg" : "input"}
                    disabled={isEditable}
                    defaultValue={item.mca_cin_frns}
                    name="mca_cin_frns"
                    placeholder="CIN/FCRN"
                    onChange={(e) => {
                      if (!RegEx.cin.test(e.target.value)) {
                        setInvalidList([...invalidList, "mca_cin_frns" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "mca_cin_frns" + idx
                          )
                        );
                        handleChange(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("mca_cin_frns" + idx)}
                  />
                  <FormFeedback className="text-left">
                    {msg1 !== "" ? msg1 : "Please enter valid CIN/FCRN"}
                  </FormFeedback>
                </FormGroup>
              </td>
              {/* <td className="tableHeading" className="pt-3">
                <HiPencil
                  size={22}
                  color="#2B8CD6"
                  id={"edit" + idx}
                  onClick={() => editField(item.id)}
                />
                <TooltipComp
                  message={"edit"}
                  openTooltipN={0}
                  target={"edit" + idx}
                />
              </td> */}
              {/* <td className="tableHeading" className="pt-3">
                <HiOutlineTrash
                  id={"delete" + idx}
                  size={22}
                  color={inputList.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    inputList.length > 1 ? removeField(item.ecId, item.id) : ""
                  }
                />
                <TooltipComp
                  message={"delete"}
                  openTooltipN={0}
                  target={"delete" + idx}
                />
              </td> */}
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
            {/* <Button
              id="add"
              className="mt-4 mb-4 mr-3"
              color="warning"
              onClick={() => addField()}
              style={{ width: 100 }}
            >
              ADD
              
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"add"} /> */}
            <Button
              id="save11"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveHoldings()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save11"} />
          </>
        )}
      </div>

      <Row className="mt-4 mb-4">
        <Col md={12}>
          <FormGroup>
            <Label className="label">
              {" "}
              <span style={{ color: "#fcdb0a" }}>
                21. (a). No. of subsidiary/associate companies for which
                information is to be given{" "}
              </span>{" "}
            </Label>
            <Input
              disabled
              type="number"
              placeholder="No. of subsidiary/associate companies"
              className="input inputWithoutBg inputWithBorder"
              value={inputList.length}
            />
          </FormGroup>
        </Col>
      </Row>

      <Label className="label" style={{ marginTop: 24 }}>
        {" "}
        <span style={{ color: "#fcdb0a" }}>
          {" "}
          (b). Do any other entity/entities (e.g. suppliers, distributors etc.)
          that the Company does business with, participate in the BR initiatives
          of the Company? If yes, then indicate the percentage of such
          entity/entities?
        </span>{" "}
      </Label>

      <Row>
        <Col xs={1} md={1}>
          <FormGroup check className="mt-1">
            <Label check className="label">
              <Input
                name="initiatives"
                type="radio"
                disabled={isEditable1}
                onChange={() => setChecked(true)}
              />
              Yes
            </Label>
          </FormGroup>
        </Col>
        <Col xs={1} md={1}>
          <FormGroup check className="mt-1">
            <Label check className="label">
              <Input
                name="initiatives"
                type="radio"
                disabled={isEditable1}
                defaultChecked
                onChange={() => setChecked(false)}
              />
              No
            </Label>
          </FormGroup>
        </Col>
      </Row>

      {
        checked &&
        <Row>
          <Col>
            <FormGroup check className="mt-4">
              <Label check className="label">
                <Input
                  type="radio"
                  name="type"
                  disabled={isEditable1}
                  checked={indication === 1}
                  onChange={() => setIndication(1)}
                />
                Less than 30%
              </Label>
            </FormGroup>
            <FormGroup check className="mt-3">
              <Label check className="label">
                <Input
                  type="radio"
                  name="type"
                  disabled={isEditable1}
                  checked={indication === 2}
                  onChange={() => setIndication(2)}
                />
                Between 30% - 60%
              </Label>
            </FormGroup>
            <FormGroup check className="mt-3">
              <Label check className="label">
                <Input
                  type="radio"
                  name="type"
                  disabled={isEditable1}
                  checked={indication === 3}
                  onChange={() => setIndication(3)}
                />
                More than 60%
              </Label>
            </FormGroup>
          </Col>
        </Row>
      }

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
        }}
      >
        {/* <Button
          id="edit"
          className="mt-4 mb-4 mr-3"
          color="warning"
          style={{ width: 100 }}
        >
          EDIT
          <HiOutlineBookmarkAlt size={24} /> 
        </Button>
        <TooltipComp message={"edit"} openTooltipN={0} target={"edit"} /> */}

        {isEditable1 && (
          <>
            <Button
              id="edit3"
              className="mt-4 mb-4"
              color="secondary"
              onClick={() => setIsEditable1(!isEditable1)}
              style={{ width: 100 }}
            >
              EDIT
              {/* <HiPlus size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
          </>
        )}

        {!isEditable1 && (
          <>
            <Button
              id="save26"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveMcaHoldings()}
            >
              {isLoading1 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
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
          onClick={() => {document.getElementById("sidebar13").click()}}
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

export default Holdings;
