import React, { useState, useEffect } from "react";
import "../../../../../assets/css/styles.css";
import {
  HiOutlineTrash,
  HiPencil,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { YearPicker } from "react-dropdown-date";
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
import Toast from "../../../../../utils/Toast/Toast";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import RegEx from "../../../../../utils/RegEx/RegEx";
import axios from "axios";
import { apiUrl } from "../../../../../config/config";
import { getToken } from "../../../../../utils/LocalStorage/LocalStorage";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Csr() {
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
      csraId: "",
      csr_project: "",
      project_sector: "",
      project_state: "",
      project_district: "",
      amount: "",
      amount_spent: "",
      admin_spent: "",
      spent_mode: "",
    },
  ]);

  const [inputDetailsList, setInputDetailsList] = useState([
    {
      id: 1,
      csraId: "",
      projectName: "",
      projectLoc: "",
      agencyName: "",
      agencyAddress: "",
      agencyPhone: "",
      agencyEmail: "",
    },
  ]);

  const [count, setCount] = useState(1);
  const [detailsCount, setDetailsCount] = useState(1);

  const [netProfitFY1, setNetProfitFY1] = useState(0);
  const [netProfitFY2, setNetProfitFY2] = useState(0);
  const [netProfitFY3, setNetProfitFY3] = useState(0);

  const [profitFY1, setProfitFY1] = useState(0);
  const [profitFY2, setProfitFY2] = useState(0);
  const [profitFY3, setProfitFY3] = useState(0);

  const [FY1, setFY1] = useState(null);
  const [FY2, setFY2] = useState(null);
  const [FY3, setFY3] = useState(null);

  const [netAvgProfitFY, setNetProfitAvgFY] = useState(0);
  const [csrExpd, setCsrExpd] = useState(0);

  const [csrTotalAmt, setCsrTotalAmt] = useState(0);
  const [csrLocalAmt, setCsrLocalAmt] = useState(0);

  const [csrAmountSpent, setCsrAmountSpent] = useState();
  const [impAgency, setImpAgency] = useState();
  const [invalidList, setInvalidList] = useState([]);

  const [isApplicable, setIsApplicable] = useState("");
  const [turnover, setTurnover] = useState(0);
  const [networth, setNetworth] = useState(0);

  const [reportingId, setReportingId] = useState(1);
  const [csrLink, setCsrLink] = useState("");
  const [isCSRInc, setIsCSRInc] = useState("");

  const [isEditable1, setIsEditable1] = useState(false);
  const [isEditable2, setIsEditable2] = useState(false);
  const [isEditable3, setIsEditable3] = useState(false);
  const [isEditable4, setIsEditable4] = useState(false);
  const [isEditable5, setIsEditable5] = useState(true);

  const [CsrAmtTotal, setCsrAmtTotal] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  const [ stateList, setStateList ] = useState();
  const [ districtList, setDistrictList ] = useState();

  const [ uniqueList, setUniqueList ] = useState([]);

  const [data, setData] = useState({});
  const brsrData = useSelector((state) => state);

  let obj = brsrData.brsr.finencial.response.find(
    (o) => o.entityId == reportId
  );
  useEffect(() => {
    setData(obj);
  }, []);

  useEffect(() => {
    getStateList();
  },[])

    // Get indian State List
    const getStateList = async () => {
      const response = await axios.get(
        `${apiUrl}getStateCityByName?country=India`,
        config
      );
      console.log(response);
      try {
        if (response.data.code === 200) {
          setStateList(response.data.data);
        }
      } catch (e) {
        console.error({});
      }
    };
  
    // Get District List By State
    const getDistrictList = async (state) => {
      const response = await axios.get(
        `${apiUrl}getStateCityByName?state=${state}`,
        config
      );
      try {
        if (response.data.code === 200) {
          setDistrictList(response.data.data);
        }
      } catch (e) {
        console.error({});
      }
    };

  const addField = () => {
    setInputList([
      ...inputList,
      {
        id: count + 1,
        csraId: "",
        csr_project: "",
        project_sector: "",
        project_state: "",
        project_district: "",
        amount: "",
        amount_spent: "",
        admin_spent: "",
        spent_mode: "",
      },
    ]);

    setCount(count + 1);
  };

  const editField = (idx) => {
    console.log("edit=====", idx);
  };

  const removeField = async (csraId, id) => {
    console.log(id);

    const list = inputList.filter((item) => item.id !== id);

    // const list = [...inputList];
    // list.splice(id, 1);
    setInputList(list);

    if (csraId !== "") {
      // const body = JSON.stringify({
      //   reportingId: reportId,
      //   miId: miId,
      // });

      const amountSpentDeleteData = await axios({
        method: "DELETE",
        url: `${apiUrl}entity/csr-amount`,
        data: {
          reportingId: reportId,
          csraId: csraId,
        },
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });

      try {
        if (amountSpentDeleteData.data.code === 200) {
          setMsg(amountSpentDeleteData.data.message);
          setErr(true);
          setColor("Green");
          console.log(
            "DELETE=================",
            amountSpentDeleteData.data.data
          );
          getAmountSpentCsr();
        }
      } catch (e) {
        setErr(true);
        setColor("Red");
        setMsg(e.response.data.message);
      }
    }
  };

  const addDetailsField = () => {
    setInputDetailsList([
      ...inputDetailsList,
      {
        id: detailsCount + 1,
        csraId: "",
        projectName: "",
        projectLoc: "",
        agencyName: "",
        agencyAddress: "",
        agencyPhone: "",
        agencyEmail: "",
      },
    ]);

    setDetailsCount(detailsCount + 1);
  };

  const editDetailsField = (idx) => {
    console.log("edit=====", idx);
  };

  const removeDetailsField = async (csraId, id) => {
    console.log(id);

    const list = inputDetailsList.filter((item) => item.id !== id);

    // const list = [...inputList];
    // list.splice(id, 1);
    setInputDetailsList(list);

    if (csraId !== "") {
      // const body = JSON.stringify({
      //   reportingId: reportId,
      //   miId: miId,
      // });

      const agencyDeleteData = await axios({
        method: "DELETE",
        url: `${apiUrl}entity/implement-details`,
        data: {
          reportingId: reportId,
          csraId: csraId,
        },
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });

      try {
        if (agencyDeleteData.data.code === 200) {
          setMsg(agencyDeleteData.data.message);
          setErr(true);
          setColor("Green");
          console.log("DELETE=================", agencyDeleteData.data.data);
          getAgencyDetails();
        }
      } catch (e) {
        setErr(true);
        setColor("Red");
        setMsg(e.response.data.message);
      }
    }
  };

  // ================ HANDLE CHANGE =================

  const handleChange = (e, idx) => {
    const { name, value } = e.target;

    if (name === "projectName") {
      inputDetailsList[idx].projectName = value;
    } else if (name === "projectLoc") {
      inputDetailsList[idx].projectLoc = value;
    } else if (name === "agencyName") {
      inputDetailsList[idx].agencyName = value;
    } else if (name === "agencyAddress") {
      inputDetailsList[idx].agencyAddress = value;
    } else if (name === "agencyPhone") {
      inputDetailsList[idx].agencyPhone = value;
    } else {
      inputDetailsList[idx].agencyEmail = value;
    }

    setCsrAmountSpent({
      ...csrAmountSpent,
      inputDetailsList,
    });
  };

  const handleChangev1 = (e, idx) => {
    const { name, value } = e.target;

    if (name === "csr_project") {
      inputList[idx].csr_project = value;
    } else if (name === "project_sector") {
      inputList[idx].project_sector = value;
    } else if (name === "project_state") {
      inputList[idx].project_state = value;
    } else if (name === "project_district") {
      inputList[idx].project_district = value;
    } else if (name === "amount") {
      inputList[idx].amount = value;
    } else if (name === "amount_spent") {
      inputList[idx].amount_spent = value;
    } else if (name === "admin_spent") {
      inputList[idx].admin_spent = value;
    } else {
      inputList[idx].spent_mode = value;
    }

    setImpAgency({
      ...impAgency,
      inputList,
    });
  };

  useEffect(() => {
    getApplicableCsr();
    getCsrPolicyLink();
    getNetProfitData();
    getAgencyDetails();
    getAmountSpentCsr();
  }, []);

  const getAmountSpentCsr = async () => {
    const amtSpentCsr = await axios.get(
      `${apiUrl}entity/csr-amount?reportingId=${reportId}`,
      config
    );
    console.log("Amount Spent on CSR", amtSpentCsr);
    try {
      if (amtSpentCsr.data.code === 200) {
        console.log(amtSpentCsr.data.message);
        console.log(amtSpentCsr.data.data);

        setCsrTotalAmt(amtSpentCsr.data.data.mca_total_csr_spent);
        setCsrLocalAmt(amtSpentCsr.data.data.mca_local_csr_spent);

        setCsrAmtTotal(amtSpentCsr.data.data.dataTotal);

        amtSpentCsr.data.data.data.length > 0 &&
          setInputList(amtSpentCsr.data.data.data);

        // setIsEditable1(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveAmountSpentCsr = async () => {
    setIsLoading(true);

    const body = JSON.stringify({
      reportingId: reportId,
      mca_total_csr_spent: csrTotalAmt,
      mca_local_csr_spent: csrLocalAmt,
      data: inputList,
    });

    const amtSpentData = await axios.post(
      `${apiUrl}entity/csr-amount`,
      body,
      config
    );
    try {
      if (amtSpentData.data.code === 200) {
        console.log(amtSpentData.data.message);
        console.log(amtSpentData.data.data);

        setMsg("Data saved successfully");

        amtSpentData.data.data.data.forEach((element, idx) => {
          inputList[idx].csraId = element.csraId;
        });

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

  const getApplicableCsr = async () => {
    const applicableCsr = await axios.get(
      `${apiUrl}entity/csr?reportingId=${reportId}`,
      config
    );
    try {
      if (applicableCsr.data.code === 200) {
        console.log(applicableCsr.data.message);
        console.log(applicableCsr.data.data);

        setIsApplicable(applicableCsr.data.data.isCSRApplicable);
        setNetworth(applicableCsr.data.data.networth);
        setTurnover(applicableCsr.data.data.turnover);

        // setIsEditable1(true);
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const saveApplicableCsr = async () => {
    setIsLoading1(true);

    const body = JSON.stringify({
      reportingId: reportId,
      isCSRApplicable: isApplicable,
      turnover: parseInt(turnover),
      networth: parseInt(networth),
    });

    console.log(body);

    

    // const applicableCsrData = await axios({
    //   method: 'DELETE',
    //   url: 'https://anyDomanin.cloud/Inventory/products/',
    //   data: {
    //   name_group: product.name_group,
    //   UMB: product.UMB
    //   }
    // })

    try {

      const applicableCsrData = await axios.post(
        `${apiUrl}entity/csr`,
        body,
        config
      );

      if (applicableCsrData.data.code === 200) {
        console.log(applicableCsrData.data.message);
        console.log(applicableCsrData.data.data);
        setIsEditable1(!isEditable1);
        setIsLoading1(false);
        setErr(true);
        setColor("Green");
        setMsg("Data saved successfully");
      }
    } catch (e) {
      console.log(e.response.data.message);
      setIsLoading1(false);
      setErr(true);
      setColor("Red");
      setMsg("Failed to save data");
    }
  };

  const getCsrPolicyLink = async () => {
    const csrLink = await axios.get(
      `${apiUrl}entity/csr-27-28?reportingId=${reportId}`,
      config
    );
    try {
      if (csrLink.data.code === 200) {
        console.log(csrLink.data.message);
        console.log(csrLink.data.data);

        setCsrLink(csrLink.data.data.csrPolicyURL);
        setIsCSRInc(csrLink.data.data.isCSRInc);

        // setIsEditable2(true);
      }
    } catch (e) {
      console.log(e.response.data.message);
    }
  };

  const saveCsrLink = async () => {
    setIsLoading2(true);

    const body = JSON.stringify({
      reportingId: reportId,
      csrPolicyURL: csrLink,
      isCSRInc: isCSRInc,
    });

    console.log(body);

    const saveCsr = await axios.post(`${apiUrl}entity/csr-27-28`, body, config);
    try {
      if (saveCsr.data.code === 200) {
        console.log(saveCsr.data.message);
        console.log(saveCsr.data.data);

        setIsEditable2(!isEditable2);

        setIsLoading2(false);
        setErr(true);
        setColor("Green");
        setMsg("Data saved successfully");
      }
    } catch (e) {
      console.log(e.response.data.message);
      setIsLoading2(false);
      setErr(true);
      setColor("Red");
      setMsg("Failed to save data");
    }
  };

  const getNetProfitData = async () => {
    const NetProfitFinancial = await axios.get(
      `${apiUrl}entity/csr-net-profit?reportingId=${reportId}`,
      config
    );

    try {
      if (NetProfitFinancial.data.code === 200) {
        console.log(NetProfitFinancial.data.message);
        console.log(NetProfitFinancial.data.data);

        setFY1(NetProfitFinancial.data.data.fY1);
        setFY2(NetProfitFinancial.data.data.fY2);
        setFY3(NetProfitFinancial.data.data.fY3);
        setProfitFY1(NetProfitFinancial.data.data.fY1_profit_adjusted);
        setProfitFY2(NetProfitFinancial.data.data.fY2_profit_adjusted);
        setProfitFY3(NetProfitFinancial.data.data.fY3_profit_adjusted);
        setNetProfitFY1(NetProfitFinancial.data.data.fY1_profit_withtax);
        setNetProfitFY2(NetProfitFinancial.data.data.fY2_profit_withtax);
        setNetProfitFY3(NetProfitFinancial.data.data.fY3_profit_withtax);
        setNetProfitAvgFY(NetProfitFinancial.data.data.avg_profit);
        setCsrExpd(NetProfitFinancial.data.data.csr_desc);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveNetProfitData = async () => {
    // console.log(netProfitData)

    setIsLoading3(true);

    const AllNetProfit = (
      (Number(netProfitFY1) + Number(netProfitFY2) + Number(netProfitFY3)) /
      3
    ).toFixed(1);
    const csrExpenditure = (
      Number(
        ((Number(netProfitFY1) + Number(netProfitFY2) + Number(netProfitFY3)) /
          3) *
          2
      ) / 100
    ).toFixed(1);

    console.log(reportId);
    console.log(FY1);

    const body = JSON.stringify({
      reportingId: reportId,
      fY1: parseInt(FY1),
      fY2: parseInt(FY2),
      fY3: parseInt(FY3),
      fY1_profit_withtax: parseInt(profitFY1),
      fY2_profit_withtax: parseInt(profitFY2),
      fY3_profit_withtax: parseInt(profitFY3),
      fY1_profit_adjusted: parseInt(netProfitFY1),
      fY2_profit_adjusted: parseInt(netProfitFY2),
      fY3_profit_adjusted: parseInt(netProfitFY3),
      avg_profit: parseInt(AllNetProfit),
      csr_desc: parseInt(csrExpenditure),
    });

    console.log(body);

    const NetProfitFinancialData = await axios.post(
      `${apiUrl}entity/csr-net-profit`,
      body,
      config
    );

    try {
      if (NetProfitFinancialData.data.code === 200) {
        console.log(NetProfitFinancialData.data.message);
        console.log(NetProfitFinancialData.data.data);

        setIsEditable3(!isEditable3);

        setIsLoading3(false);
        setErr(true);
        setColor("Green");
        setMsg("Data saved successfully");
      }
    } catch (e) {
      console.log(e);
      setIsLoading3(false);
      setErr(true);
      setColor("Red");
      setMsg("Failed to save data");
    }
  };

  const getAgencyDetails = async () => {
    const agencyDetails = await axios.get(
      `${apiUrl}entity/implement-details?reportingId=${reportId}`,
      config
    );

    console.log("Agency", agencyDetails);

    try {
      if (agencyDetails.data.code === 200) {
        console.log(agencyDetails.data.message);
        console.log(agencyDetails.data.data);
        agencyDetails.data.data.data.length > 0 &&
          setInputDetailsList(agencyDetails.data.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveAgencyDetails = async () => {
    setIsLoading4(true);

    const body = JSON.stringify({
      reportingId: reportId,
      data: inputDetailsList,
    });

    const details = await axios.post(
      `${apiUrl}entity/implement-details`,
      body,
      config
    );

    try {
      if (details.data.code === 200) {
        console.log(details.data.message);
        console.log(details.data.data);

        setIsEditable4(!isEditable4);

        setMsg("Data saved successfully");

        details.data.data.data.forEach((element, idx) => {
          inputDetailsList[idx].csraId = element.csraId;
        });

        setIsLoading4(false);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.log(e);
      setIsLoading4(false);
      setErr(true);
      setColor("Red");
      setMsg("Failed to save data");
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
        <span className="breadCrumbActive"> CSR Details </span>
      </div>
      <div className="float-right" style={{ color: "#f56" }}>
        <span>{data.companyName}</span> - <span>{data.reportingBoundary}</span>{" "}
        - <span>FY {data.financialYear}</span> - <span>(Q{data.quarter})</span>
      </div>
      <h2 className="heading" style={{ color: "#fff" }}>
        VI CSR Details
      </h2>

      <h4 className="subHeading">22. Applicable CSR</h4>
      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading">
              Whether CSR is applicable as per section 135 of Companies Act,
              2013
            </th>
            <th className="tableHeading">Turnover (in Rs)</th>

            <th className="tableHeading">Net Worth (in Rs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input
                        disabled={isEditable1}
                        type="radio"
                        name="type"
                        value="Yes"
                        checked={isApplicable === "Yes"}
                        onChange={(e) => setIsApplicable(e.target.value)}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input
                        disabled={isEditable1}
                        value="No"
                        type="radio"
                        name="type"
                        checked={isApplicable === "No"}
                        onChange={(e) => setIsApplicable(e.target.value)}
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
                  disabled={isEditable1}
                  className={isEditable1 ? "input inputWithoutBg" : "input"}
                  type="number"
                  value={turnover}
                  name="turnover"
                  placeholder="Ex. 1,00,000"
                  onChange={(e) => setTurnover(e.target.value)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={isEditable1}
                  className={isEditable1 ? "input inputWithoutBg" : "input"}
                  type="number"
                  value={networth}
                  name="netWorth"
                  placeholder="Ex. 1,00,000"
                  onChange={(e) => setNetworth(e.target.value)}
                />
              </FormGroup>
            </td>
          </tr>
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
              id="edit3"
              className="mt-4 mb-4"
              color="secondary"
              style={{ width: 100 }}
              onClick={() => setIsEditable1(!isEditable1)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
          </>
        )}

        {!isEditable1 && (
          <>
            <Button
              id="save10"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveApplicableCsr()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save10"} />
          </>
        )}
      </div>

      {/* </TabPane> */}

      {/* <TabPane tabId="2"> */}
      <h4 className="subHeading">
        {" "}
        <span style={{ color: "#fcdb0a" }}>
          22. (b) Net Profits for last three financial years
        </span>
      </h4>
      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading">Financial year ended</th>
            <th className="tableHeading">Profit before tax (in Rs.)</th>

            <th className="tableHeading">
              Net Profit computed u/s 198 adjusted as per rule 2(1)(f) of the
              Companies (CSR Policy) Rules, 2014 (in Rs.)
            </th>
          </tr>
        </thead>
        <tbody>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <tr>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <input 
                    className="input inputWithoutBg"
                    disabled
                    value={data.financialYear - 2}
                  />
                  {/* <YearPicker
                    defaultValue={"Select Year"}
                    start={1900} // default is 1900
                    end={2022} // default is current year
                    // reverse                     // default is ASCENDING
                    required={true} // default is false
                    disabled={isEditable3 ? true : false} // default is false
                    value={FY1} // mandatory
                    onChange={(year) => {
                      // mandatory
                      setFY1(year);
                    }}
                    id={"year"}
                    name={"year"}
                    classes={isEditable3 ? "year inputWithoutBg" : "year"}
                  /> */}
                  
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    className={isEditable3 ? "input inputWithoutBg" : "input"}
                    type="number"
                    disabled={isEditable3}
                    name="profit"
                    placeholder="Ex. 1,00,000"
                    onChange={(e) => setProfitFY1(e.target.value)}
                    value={profitFY1}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    className={isEditable3 ? "input inputWithoutBg" : "input"}
                    type="number"
                    disabled={isEditable3}
                    name="netProfit"
                    placeholder="Ex. 1,00,000"
                    onChange={(e) => setNetProfitFY1(e.target.value)}
                    value={netProfitFY1}
                  />
                </FormGroup>
              </td>
            </tr>

            <tr>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <input 
                    className="input inputWithoutBg"
                    disabled
                    value={data.financialYear - 1}
                  />
                  {/* <YearPicker
                    defaultValue={"Select Year"}
                    start={1900} // default is 1900
                    end={2022} // default is current year
                    // reverse                     // default is ASCENDING
                    required={true} // default is false
                    disabled={isEditable3 ? true : false} // default is false
                    value={FY2} // mandatory
                    onChange={(year) => {
                      // mandatory
                      setFY2(year);
                    }}
                    id={"year"}
                    name={"year"}
                    classes={isEditable3 ? "year inputWithoutBg" : "year"}
                  /> */}

                  {/* <DatePicker
                    style={{
                      color: "#fff",
                      paddingLeft: "10px",
                      marginTop: "5px",
                    }}
                    className="select"
                    variant="dialog"
                    openTo="year"
                    views={["year"]}
                    value={FY2}
                    onChange={(val) => setFY2(val)}
                  /> */}
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    className={isEditable3 ? "input inputWithoutBg" : "input"}
                    type="number"
                    disabled={isEditable3}
                    name="profit"
                    placeholder="Ex. 1,00,000"
                    onChange={(e) => setProfitFY2(e.target.value)}
                    value={profitFY2}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    className={isEditable3 ? "input inputWithoutBg" : "input"}
                    type="number"
                    disabled={isEditable3}
                    name="netProfit"
                    placeholder="Ex. 1,00,000"
                    onChange={(e) => setNetProfitFY2(e.target.value)}
                    value={netProfitFY2}
                  />
                </FormGroup>
              </td>
            </tr>

            <tr>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <input 
                    className="input inputWithoutBg"
                    disabled
                    value={data.financialYear}
                  />
                  {/* <YearPicker
                    defaultValue={"Select Year"}
                    start={1900} // default is 1900
                    end={2022} // default is current year
                    // reverse                    // default is ASCENDING
                    required={true} // default is false
                    disabled={isEditable3 ? true : false} // default is false
                    value={FY3} // mandatory
                    onChange={(year) => {
                      // mandatory
                      setFY3(year);
                    }}
                    id={"year"}
                    name={"year"}
                    classes={isEditable3 ? "year inputWithoutBg" : "year"}
                  /> */}
                  {/* <DatePicker
                    style={{
                      color: "#fff",
                      paddingLeft: "10px",
                      marginTop: "5px",
                    }}
                    className="select"
                    variant="dialog"
                    openTo="year"
                    views={["year"]}
                    value={FY3}
                    onChange={(val) => setFY3(val)}
                  /> */}
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    className={isEditable3 ? "input inputWithoutBg" : "input"}
                    type="number"
                    disabled={isEditable3}
                    name="profit"
                    placeholder="Ex. 1,00,000"
                    onChange={(e) => setProfitFY3(e.target.value)}
                    value={profitFY3}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    className={isEditable3 ? "input inputWithoutBg" : "input"}
                    type="number"
                    disabled={isEditable3}
                    name="netProfit"
                    placeholder="Ex. 1,00,000"
                    onChange={(e) => setNetProfitFY3(e.target.value)}
                    value={netProfitFY3}
                  />
                </FormGroup>
              </td>
            </tr>
          </MuiPickersUtilsProvider>
        </tbody>
      </Table>

      <Table
        dark
        size="sm"
        className="text-center mt-3 mb-3"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading" style={{ color: "#fcdb0a" }}>
              23. Average net profit of the company for last three financial
              years{" "}
              <span id="cat9" style={{ color: "green" }}>
                {" "}
                <HiOutlineInformationCircle size={20} color="#fff" />
              </span>
              <TooltipComp
                message={
                  "Average net profit of the company for last three financial years (as defined in explanation to sub-section (5) section 135 of the Act (in Rs.)"
                }
                openTooltipN={0}
                target="cat9"
              />
            </th>
            <th className="tableHeading" style={{ color: "#fcdb0a" }}>
              24. Prescribed CSR Expenditure{" "}
              <span id="cat10" style={{ color: "green" }}>
                {" "}
                <HiOutlineInformationCircle size={20} color="#fff" />
              </span>
              <TooltipComp
                message={
                  "Prescribed CSR Expenditure (two per cent. of the amount as in item 23 above)"
                }
                openTooltipN={0}
                target="cat10"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Input
                type="number"
                className="input inputWithoutBg"
                placeholder="Avg net profit"
                value={
                  netAvgProfitFY !== null
                    ? netAvgProfitFY
                    : (
                        (Number(netProfitFY1) +
                          Number(netProfitFY2) +
                          Number(netProfitFY3)) /
                        3
                      ).toFixed(1)
                }
              />
            </td>
            <td>
              <Input
                type="number"
                className="input inputWithoutBg"
                placeholder="Prescribed CSR expenditure"
                value={(
                  Number(
                    ((Number(netProfitFY1) +
                      Number(netProfitFY2) +
                      Number(netProfitFY3)) /
                      3) *
                      2
                  ) / 100
                ).toFixed(1)}
              />
            </td>
          </tr>
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
        {isEditable3 && (
          <>
            <Button
              id="edit3"
              className="mt-4 mb-4"
              color="secondary"
              style={{ width: 100 }}
              onClick={() => setIsEditable3(!isEditable3)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
          </>
        )}

        {!isEditable3 && (
          <>
            <Button
              id="save25"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveNetProfitData()}
            >
              {isLoading3 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save25"} />
          </>
        )}
      </div>

      {/* </TabPane> */}

      {/* <TabPane tabId="3"> */}
      <h4 className="subHeading">
        {" "}
        <span style={{ color: "#fcdb0a" }}>25. Amount spent on CSR</span>
      </h4>
      <Row className="mb-2">
        <Col md={12} className="mb-2">
          <FormGroup>
            <Label className="label">
              {" "}
              (a) Total amount spent on CSR for the financial year (in Rs.)
            </Label>
            <Input
              type="number"
              value={csrTotalAmt}
              className={isEditable5 ? "input inputWithoutBg" : "input"}
              disabled={isEditable5}
              placeholder="Total amount spent"
              onChange={(e) => setCsrTotalAmt(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col md={12} className="mb-2">
          <FormGroup>
            <Label className="label">
              {" "}
              (b) Amount spent in local area (in Rs.)
            </Label>
            <Input
              type="number"
              value={csrLocalAmt}
              className={isEditable5 ? "input inputWithoutBg" : "input"}
              disabled={isEditable5}
              placeholder="Amount spent in local area"
              onChange={(e) => setCsrLocalAmt(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      <h4 className="label">
        (c) Manner in which the amount spent during the financial year
      </h4>

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
            <th className="tableHeading">CSR project or activity identified</th>
            <th className="tableHeading">
              Sector in which the project is Covered
            </th>
            <th className="tableHeading">
              State/ UnionTerritory where Project / Program was Undertaken
            </th>
            <th className="tableHeading">
              Specify the district where projects / programs were undertaken
            </th>
            <th className="tableHeading">
              Amount outlay (budget) project or programs wise (in Rs.)
            </th>
            <th className="tableHeading">
              Amount spent on the projects / programs(in Rs.)
            </th>
            <th className="tableHeading">
              Expenditure on Administrative overheads (in Rs.)
            </th>
            <th className="tableHeading">Mode of Amount spent</th>
            <th className="tableHeading" colSpan="2"></th>
          </tr>
        </thead>
        <tbody>
          {inputList.map((item, idx) => (
            <tr key={item.id}>
              <td className="tableHeading" className="pt-3">
                {" "}
                {idx + 1}{" "}
              </td>
              <td className="tableHeading">
                <Input
                  type="text"
                  className={isEditable5 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable5}
                  defaultValue={item.csr_project}
                  name="csr_project"
                  placeholder="CSR project"
                  onChange={(e) => {
                    if (e.target.value === "" || e.target.value === " ") {
                      setInvalidList([...invalidList, "csr_project" + idx]);
                    } else {
                      setInvalidList(
                        invalidList?.filter(
                          (item) => item !== "csr_project" + idx
                        )
                      );
                      handleChangev1(e, idx);
                    }
                  }}
                  invalid={invalidList?.includes("csr_project" + idx)}
                />
                <FormFeedback className="text-left">
                  Please enter valid Project Activity
                </FormFeedback>
              </td>
              <td className="tableHeading">
                <Input
                  type="text"
                  className={isEditable5 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable5}
                  defaultValue={item.project_sector}
                  name="project_sector"
                  placeholder="Sector"
                  onChange={(e) => {
                    if (e.target.value === "" || e.target.value === " ") {
                      setInvalidList([...invalidList, "project_sector" + idx]);
                    } else {
                      setInvalidList(
                        invalidList?.filter(
                          (item) => item !== "project_sector" + idx
                        )
                      );
                      handleChangev1(e, idx);
                    }
                  }}
                  invalid={invalidList?.includes("project_sector" + idx)}
                />
                <FormFeedback className="text-left">
                  Please enter valid Sector
                </FormFeedback>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">

                  <select
                    className={isEditable5 ? "select inputWithoutBg" : "select"}
                    disabled={isEditable5}
                    value={item.project_state}
                    name="project_state"
                    onChange={(e) => {

                      if(uniqueList?.includes(e.target.value)){
                        handleChangev1(e, idx);
                        console.log("States included",uniqueList)
                      }else{
                        handleChangev1(e, idx);
                        getDistrictList(e.target.value);
                        setUniqueList([...uniqueList, e.target.value]);
                        console.log("Project State not included")
                      }
                    }}
                  >
                    <option>Select...</option>
                    {stateList?.map((item, index) => {
                      return (
                        <option id={"state"+index} key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                    ;
                  </select>

                  {/* <Input
                    type="text"
                    className={isEditable5 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable5}
                    defaultValue={item.project_state}
                    name="project_state"
                    placeholder="State"
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([...invalidList, "project_state" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "project_state" + idx
                          )
                        );
                        handleChangev1(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("project_state" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid State
                  </FormFeedback> */}
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">

                  <select
                      className={isEditable5 ? "select inputWithoutBg" : "select"}
                      disabled={isEditable5}
                      value={item.project_district}
                      name="project_district"
                      onChange={(e) => {
                        handleChangev1(e, idx);
                      }}
                    >
                      <option>Select...</option>
                      {districtList?.map((item, index) => {
                        return (
                          <option id={"district"+index} key={index} value={item+index}>
                            {item}
                          </option>
                        );
                      })}
                      ;
                    </select>

                  {/* <Input
                    type="text"
                    className={isEditable5 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable5}
                    defaultValue={item.project_district}
                    name="project_district"
                    placeholder="District"
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([
                          ...invalidList,
                          "project_district" + idx,
                        ]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "project_district" + idx
                          )
                        );
                        handleChangev1(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("project_district" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid District
                  </FormFeedback> */}
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    defaultValue={item.amount}
                    className={isEditable5 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable5}
                    name="amount"
                    placeholder="Amount outlay"
                    onChange={(e) => {
                      handleChangev1(e, idx);
                    }}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    defaultValue={item.amount_spent}
                    className={isEditable5 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable5}
                    name="amount_spent"
                    placeholder="Amount spent"
                    onChange={(e) => {
                      handleChangev1(e, idx);
                    }}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    defaultValue={item.admin_spent}
                    className={isEditable5 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable5}
                    name="admin_spent"
                    placeholder="Expenditure"
                    onChange={(e) => {
                      handleChangev1(e, idx);
                    }}
                  />
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="text"
                    defaultValue={item.spent_mode}
                    className={isEditable5 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable5}
                    name="spent_mode"
                    placeholder="Mode"
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([...invalidList, "mode" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter((item) => item !== "mode" + idx)
                        );
                        handleChangev1(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("mode" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid District
                  </FormFeedback>
                </FormGroup>
              </td>

              <td className="tableHeading" className="pt-3">
                <HiOutlineTrash
                  size={22}
                  id={"delete" + idx}
                  color={inputList.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    inputList.length > 1
                      ? removeField(item.csraId, item.id)
                      : ""
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

<tr>
            <th className="tableHeading">Total</th>
            <th className="tableHeading">
              <Input
                type="text"
                className="input inputWithoutBg"
                placeholder="CSR project"
                value={inputList.length}
              />
            </th>
            <th className="tableHeading">
              <Input
                type="text"
                className="input inputWithoutBg"
                placeholder="Sector"
                value={inputList.length}
              />
              <FormFeedback className="text-left">
                Please enter valid description
              </FormFeedback>
            </th>
            <th className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="text"
                  className="input inputWithoutBg"
                  placeholder="State"
                  value={inputList.length}
                />
              </FormGroup>
            </th>
            <th className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="text"
                  className="input inputWithoutBg"
                  placeholder="District"
                  value={inputList.length}
                />
                <FormFeedback className="text-left">
                  Please enter valid description
                </FormFeedback>
              </FormGroup>
            </th>
            <th className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  className="input inputWithoutBg"
                  placeholder="Amount outlay"
                  value={inputList.map(item => item.amount).reduce((prev, next) => Number(prev) + Number(next))}
                />
                <FormFeedback className="text-left">
                  Turnover can not be more that 100%
                </FormFeedback>
              </FormGroup>
            </th>
            <th className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  className="input inputWithoutBg"
                  placeholder="Amount spent"
                  value={inputList.map(item => item.amount_spent).reduce((prev, next) => Number(prev) + Number(next))}
                />
                <FormFeedback className="text-left">
                  Turnover can not be more that 100%
                </FormFeedback>
              </FormGroup>
            </th>
            <th className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  className="input inputWithoutBg"
                  placeholder="Expenditure"
                  value={inputList.map(item => item.admin_spent).reduce((prev, next) => Number(prev) + Number(next))}
                />
                <FormFeedback className="text-left">
                  Turnover can not be more that 100%
                </FormFeedback>
              </FormGroup>
            </th>
            <th className="tableHeading" colSpan={2}>
              <FormGroup className="m-0">
                <Input
                  type="text"
                  className="input inputWithoutBg"
                  placeholder="Mode"
                  value={inputList.length}
                />
                <FormFeedback className="text-left">
                  Turnover can not be more that 100%
                </FormFeedback>
              </FormGroup>
            </th>
          </tr>
        </tbody>
      </Table>

      {/* <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
        }}
      > */}
        {/* {isEditable5 && (
          <>
            <Button
              id="edit2"
              className="mt-4 mb-4 mr-3"
              color="secondary"
              onClick={() => setIsEditable5(!isEditable5)}
              style={{ width: 100 }}
            >
              EDIT
              
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit2"} />
          </>
        )} */}

        {/* {!isEditable5 && (
          <>
            <Button
              id="add4"
              className="mt-4 mb-4"
              color="warning"
              onClick={() => addField()}
              style={{ width: 100 }}
            >
              ADD
             
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"add4"} />
          </>
        )} */}
      {/* </div> */}

      {/* <Table
        dark
        size="sm"
        className="text-center mt-4"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead>
          
        </thead>
      </Table> */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
        }}
      >
        {isEditable5 && (
          <>
          
            <Button
              id="edit2"
              className="mt-4 mb-4"
              color="secondary"
              onClick={() => setIsEditable5(!isEditable5)}
              style={{ width: 100 }}
            >
              EDIT
              {/* <HiPlus size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit2"} />
            
          </>
        )}

        {!isEditable5 && (
          <>
            <Button
              id="add4"
              className="mt-4 mb-4 mr-3"
              color="warning"
              onClick={() => addField()}
              style={{ width: 100 }}
            >
              ADD
              {/* <HiPlus size={24} /> */}
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"add4"} />
            <Button
              id="save15"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveAmountSpentCsr()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save15"} />
          </>
        )}
      </div>

      {/* </TabPane> */}

      {/* <TabPane tabId="4"> */}
      <h4 className="subHeading">
        {" "}
        <span style={{ color: "#fcdb0a" }}>
          26. Details of Implementing Agency(ies)
        </span>
      </h4>
      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading" rowSpan={2}>
              S.No.
            </th>
            <th className="tableHeading" rowSpan={2}>
              Project Name
            </th>
            <th className="tableHeading" rowSpan={2}>
              Project Location
            </th>
            <th colSpan={4} className="tableHeading">
              Details of Implementing Agency
            </th>
            <th colSpan={2} className="tableHeading"></th>
          </tr>
          <tr>
            <th className="tableHeading">Name</th>
            <th className="tableHeading">Address of Registered Office</th>
            <th className="tableHeading">Contact</th>
            <th className="tableHeading">Email</th>
            <th colSpan={2} className="tableHeading"></th>
          </tr>
        </thead>
        <tbody>
          {inputDetailsList.map((item, idx) => (
            <tr key={item.id}>
              <td className="tableHeading" className="pt-3">
                {" "}
                {idx + 1}{" "}
              </td>
              <td className="tableHeading">
                <Input
                  type="text"
                  className={isEditable4 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable4}
                  value={item.projectName}
                  name="projectName"
                  placeholder="Project Name"
                  onChange={(e) => {
                    if (e.target.value === "" || e.target.value === " ") {
                      setInvalidList([...invalidList, "projectName" + idx]);
                    } else {
                      setInvalidList(
                        invalidList?.filter(
                          (item) => item !== "projectName" + idx
                        )
                      );
                      handleChange(e, idx);
                    }
                  }}
                  invalid={invalidList?.includes("projectName" + idx)}
                />
                <FormFeedback className="text-left">
                  Please enter valid Project Name
                </FormFeedback>
              </td>
              <td className="tableHeading">
                <Input
                  type="text"
                  className={isEditable4 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable4}
                  value={item.projectLoc}
                  name="projectLoc"
                  placeholder="Location"
                  onChange={(e) => {
                    if (e.target.value === "" || e.target.value === " ") {
                      setInvalidList([...invalidList, "projectLoc" + idx]);
                    } else {
                      setInvalidList(
                        invalidList?.filter(
                          (item) => item !== "projectLoc" + idx
                        )
                      );
                      handleChange(e, idx);
                    }
                  }}
                  invalid={invalidList?.includes("projectLoc" + idx)}
                />
                <FormFeedback className="text-left">
                  Please enter valid Location
                </FormFeedback>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="text"
                    className={isEditable4 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable4}
                    value={item.agencyName}
                    name="agencyName"
                    placeholder="Name"
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([...invalidList, "agencyName" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "agencyName" + idx
                          )
                        );
                        handleChange(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("agencyName" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid Name
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="text"
                    className={isEditable4 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable4}
                    value={item.agencyAddress}
                    name="agencyAddress"
                    placeholder="Address"
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([...invalidList, "agencyAddress" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "agencyAddress" + idx
                          )
                        );
                        handleChange(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("agencyAddress" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid Address
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="number"
                    defaultValue={item.agencyPhone}
                    className={isEditable4 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable4}
                    name="agencyPhone"
                    placeholder="Contact"
                    onChange={(e) => {
                      if (!RegEx.phone.test(e.target.value)) {
                        setInvalidList([...invalidList, "agencyPhone" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "agencyPhone" + idx
                          )
                        );
                        handleChange(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("agencyPhone" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid contact
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    type="email"
                    className={isEditable4 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable4}
                    defaultValue={item.agencyEmail}
                    name="agencyEmail"
                    placeholder="Email"
                    onChange={(e) => {
                      if (!RegEx.email.test(e.target.value)) {
                        setInvalidList([...invalidList, "agencyEmail" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "agencyEmail" + idx
                          )
                        );
                        handleChange(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("agencyEmail" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid email
                  </FormFeedback>
                </FormGroup>
              </td>

              {/* <td className="tableHeading" className="pt-3">
                <HiPencil
                  size={22}
                  id={"edit" + idx}
                  color="#2B8CD6"
                  onClick={() => editDetailsField(item.id)}
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
                  color={inputDetailsList.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    inputDetailsList.length > 1
                      ? removeDetailsField(item.csraId, item.id)
                      : ""
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
        {isEditable4 && (
          <>
          
            <Button
              id="edit3"
              className="mt-4 mb-4"
              color="secondary"
              onClick={() => setIsEditable4(!isEditable4)}
              style={{ width: 100 }}
            >
              EDIT
              {/* <HiPlus size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
          </>
        )}

        {!isEditable4 && (
          <>
            <Button
              id="add8"
              className="mt-4 mb-4 mr-3"
              color="warning"
              style={{ width: 100 }}
              onClick={() => addDetailsField()}
            >
              ADD
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"add8"} />
            <Button
              id="save18"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveAgencyDetails()}
            >
              {isLoading4 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save18"} />
          </>
        )}
      </div>

      <Label
        className="subHeading"
        style={{ marginTop: 24, color: "#fcdb0a" }}
      >
        {" "}
        27. Whether a responsibility statement of the CSR Committee on the
        implementation and monitoring of CSR Policy is enclosed to the Board’s
        Report
      </Label>
      <Row>
        <Col xs={1} md={1} lg={1}>
          <FormGroup check className="mt-2">
            <Label check className="label">
              <Input
                type="radio"
                disabled={isEditable2}
                name="responsibility"
                checked={isCSRInc === "Yes"}
                onChange={(e) => setIsCSRInc("Yes")}
              />
              Yes
            </Label>
          </FormGroup>
        </Col>

        <Col xs={1} md={1} lg={1}>
          <FormGroup check className="mt-2">
            <Label check className="label">
              <Input
                type="radio"
                disabled={isEditable2}
                name="responsibility"
                checked={isCSRInc === "No"}
                onChange={(e) => setIsCSRInc("No")}
              />
              No
            </Label>
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12}>
          <FormGroup>
            <Label
              className="subHeading"
              style={{ marginTop: 24, width: 800, color: "#fcdb0a" }}
            >
              28. Link to CSR Policy
            </Label>
            <Input
              disabled={isEditable2}
              className={isEditable2 ? "input inputWithoutBg" : "input"}
              type="text"
              name="link"
              defaultValue={csrLink}
              placeholder="Link to CSR Policy on your website."
              onChange={(e) => setCsrLink(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
        }}
      >
        {isEditable2 && (
          <>
            <Button
              id="edit"
              className="mt-4 mb-4"
              color="secondary"
              style={{ width: 100 }}
              onClick={() => setIsEditable2(!isEditable2)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit"} />
          </>
        )}

        {!isEditable2 && (
          <>
            <Button
              id="save26"
              className="mt-4 mb-4 mr-3"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveCsrLink()}
            >
              {isLoading2 ? (
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
          disabled={
            !isEditable1 ||
            !isEditable2 ||
            !isEditable3 ||
            !isEditable4 ||
            !isEditable5
          }
          onClick={() => {document.getElementById("sidebar14").click()}}
        >
    
            NEXT
          
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"next"} openTooltipN={0} target={"next"} />
      </div>
      {/* </TabPane> */}

      {/* </TabContent> */}
      <Toast error={err} setError={setErr} msg={msg} color={color} />
    </div>
  );
}

export default Csr;
