import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "../../../../../assets/css/styles.css";
// import styles from "./uploadData.module.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import Select from "react-select";

import { YearPicker } from "react-dropdown-date";

import RegEx from "../../../../../utils/RegEx/RegEx";

import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import Toast from "../../../../../utils/Toast/Toast";
import { apiUrl } from "../../../../../config/config";
import { getToken } from "../../../../../utils/LocalStorage/LocalStorage";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function UploadData({ match }) {
  const { id } = useParams();
  const [isChecked, setIsChecked] = useState(false);

  const [year, setYear] = useState("");
  const [companyDetails, setCompanyDetails] = useState({ entityId: id });

  const [cinErr, setCinErr] = useState(false);
  const [companyErr, setCompanyErr] = useState(false);

  const [contactNameErr, setContactNameErr] = useState(false);

  const [emailErr, setEmailErr] = useState(false);
  const [contactEmailErr, setContactEmailErr] = useState(false);

  const [phoneErr, setPhoneErr] = useState(false);
  const [mobileNumber, setMobileNumber] = useState();

  const [contactPhoneErr, setContactPhoneErr] = useState(false);
  const [contactMobileNumber, setContactMobileNumber] = useState();

  const [websiteErr, setWebsiteErr] = useState(false);

  const [pinCodeErr, setPinCodeErr] = useState(false);

  const [corpPincodeErr, setCorpPincodeErr] = useState(false);

  const [regAddressErr, setRegAddressErr] = useState(false);
  const [regCityErr, setRegCityErr] = useState(false);
  const [regStateErr, setRegStateErr] = useState(false);

  const [corpAddressErr, setCorpAddressErr] = useState(false);
  const [corpCityErr, setCorpCityErr] = useState(false);
  const [corpStateErr, setCorpStateErr] = useState(false);

  const [stockExchange, setStockExchange] = useState([]);
  const [capitalErr, setCapitalErr] = useState(false);
  const [authorizedCapitalErr, setAuthorizedCapitalErr] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState({});

  const brsrData = useSelector((state) => state);

  let obj = brsrData.brsr.finencial.response.find((o) => o.entityId == id);
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

  const options = [
    { value: "bse", label: "BSE" },
    { value: "nse", label: "NSE" },
    { value: "other", label: "Other" },
  ];

  const [financialyear, setFinancialYear] = useState();
  const [reportingBoundry, setReportingBoundary] = useState();
  const handleChange = (e) => {
    setFinancialYear(e.target.value);
    setCompanyDetails({
      ...companyDetails,
      financialYear: e.target.value,
    });
  };
  const handleChangeReportBoundry = (e) => {
    setReportingBoundary(e.target.value);
    setCompanyDetails({
      ...companyDetails,
      reportingBoundary: e.target.value,
    });
  };

  const handleInput = (e) => {
    if (e !== "") {
      const { name, value } = e.target;

      setCompanyDetails({
        ...companyDetails,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (isChecked === true) {
      setCompanyDetails({
        ...companyDetails,
        corpAddress: companyDetails.officeAddress,
        corpPincode: companyDetails.officePincode,
        corpCity: companyDetails.officeCity,
        corpState: companyDetails.officeState,
      });
    } else if (isChecked === false) {
      setCompanyDetails({
        ...companyDetails,
        corpAddress: "",
        corpPincode: "",
        corpCity: "",
        corpState: "",
      });
    }
  }, [isChecked]);

  const isEmpty = (obj) => {
    for (var key in obj) {
      if (!obj[key]) return false;
    }
    return true;
  };

  const saveData = () => {
    if (isEmpty(companyDetails)) {
      setErr(true);
      setMsg("All Fields are mandatory!");
      setColor("Red");
    } else {
      setIsLoading(true);
      axios
        .post(
          `${apiUrl}entity/details`,
          { ...companyDetails, corpSameAddress: isChecked ? 1 : 0 },
          config
        )
        .then(() => {
          console.log("success");
          setIsEditable(!isEditable);

          setMsg("Data saved successfully");
          setIsLoading(false);
          setErr(true);
          setColor("Green");
        })
        .catch((e) => {
          setMsg("Failed to save data");
          setIsLoading(false);
          setErr(true);
          setColor("Red");
        });
    }
  };

  useEffect(() => {
    getCompanyInfo();
  }, []);

  const getCompanyInfo = async () => {
    const comanyInfo = await axios.get(
      `${apiUrl}entity/details?entityId=${id}`,
      config
    );
    try {
      if (comanyInfo.data.code === 200) {
        // setCompanyInfo(comanyInfo.data.data);
        setCompanyDetails(comanyInfo.data.data);
        setMobileNumber(comanyInfo.data.data.compPhone);
        setFinancialYear(comanyInfo.data.data.financialYear);
        setContactMobileNumber(comanyInfo.data.data.phone);

        comanyInfo.data.data.data.length > 0
          ? setIsEditable(true)
          : setIsEditable(false);
      }
    } catch (e) {
      console.error({});
    }
  };

  const getLocation = async () => {
    if (companyDetails?.officePincode?.length === 6) {
      const res = await axios.get(
        `${apiUrl}getStateCityByPin?pincode=${companyDetails.officePincode}`,
        config
      );
      try {
        if (res.data.code === 200) {
          setCompanyDetails({
            ...companyDetails,
            officeCity: res.data.data.city,
            officeState: res.data.data.state,
          });
        }
      } catch (e) {
        console.error({});
      }
    }
  };

  const getLocationCorp = async () => {
    // setPinCode1({ [e.target.name]: e.target.value });
    if (companyDetails?.officePincode?.length === 6) {
      const res = await axios.get(
        `${apiUrl}getStateCityByPin?pincode=${companyDetails.corpPincode}`,
        config
      );
      try {
        if (res.data.code === 200) {
          setCompanyDetails({
            ...companyDetails,
            corpCity: res.data.data.city,
            corpState: res.data.data.state,
          });
        }
      } catch (e) {
        console.error({});
      }
    }
  };

  function getInputValue(inputVal, apiVal) {
    if (inputVal || inputVal !== undefined) {
      return inputVal;
    }
    if (apiVal) {
      return apiVal;
    }
  }

  let stocks = companyDetails.stockExchange;
  console.log(stocks);
  // for (let stock of stocks) {
  //   setStockExchange(stock);
  // }

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
        <span className="breadCrumbActive"> Company Information </span>
      </div>

      <div className="float-right" style={{ color: "#f56" }}>
        <span>{data.companyName}</span> - <span>{data.reportingBoundary}</span>{" "}
        - <span>FY {data.financialYear}</span> - <span>(Q{data.quarter})</span>
      </div>

      <h2 className="heading" style={{ color: "#fff" }}>
        I. Details of the listed entity
      </h2>

      <Form className="pt-2">
        <Row form className="formGrid">
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">1. Corporate Identity Number</Label>
              <Input
                className={isEditable ? "input inputColorDisabled" : "input"}
                disabled={isEditable}
                type="text"
                name="cin"
                placeholder="L-12345-AA-1234-AAA-123456"
                defaultValue={getInputValue(
                  companyDetails?.corpId,
                  companyDetails?.corpId
                )}
                onChange={(e) => {
                  if (!RegEx.cin.test(e.target.value)) {
                    setCinErr(true);
                  } else {
                    setCinErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      corpId: e.target.value,
                    });
                  }
                }}
                invalid={cinErr === true}
              />
              <FormFeedback>Please enter valid CIN Number</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">2. Company Name </Label>
              <Input
                disabled
                className="input disabledIpt"
                type="text"
                name="companyName"
                placeholder="Company Name"
                defaultValue={getInputValue(
                  companyDetails.companyName,
                  companyDetails.companyName
                )}
                onChange={(e) => {
                  if (
                    !RegEx.alphaNumericSpace.test(e.target.value) ||
                    e.target.value.length < 2
                  ) {
                    setCompanyErr(true);
                  } else {
                    setCompanyErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      companyName: e.target.value,
                    });
                  }
                }}
                invalid={companyErr === true}
              />
              <FormFeedback>Please enter valid Company Name</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">3. Year of Incorporation </Label>
              <YearPicker
                defaultValue={2021}
                start={1900} // default is 1900
                end={2022} // default is current year
                // reverse                     // default is ASCENDING
                required={true} // default is false
                disabled={isEditable} // default is false
                defaultValue={companyDetails.incorporationYear} // mandatory
                onChange={(year) => {
                  // mandatory
                  setYear(year);
                  setCompanyDetails({
                    ...companyDetails,
                    incorporationYear: year,
                  });
                }}
                id={"year"}
                name={"year"}
                classes="year"
              />
            </FormGroup>
          </Col>
        </Row>

        <Row form className="formGrid">
          <Col xs={12} md={12} lg={12}>
            <FormGroup className="mb-2">
              <Label className="label">4. Registered Office Address </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="text"
                name="registeredAddress"
                placeholder="Registered Office Address"
                defaultValue={companyDetails.officeAddress}
                onChange={(e) => {
                  if (
                    !RegEx.alphaNumericSpace.test(e.target.value) ||
                    e.target.value.length < 10
                  ) {
                    setRegAddressErr(true);
                  } else {
                    setRegAddressErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      officeAddress: e.target.value,
                    });
                  }
                }}
                invalid={regAddressErr === true}
              />
              <FormFeedback>
                Please enter valid registered office address
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row form className="formGrid">
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">Pincode </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="tel"
                maxLength={6}
                name="pin"
                placeholder="Pincode"
                defaultValue={companyDetails?.officePincode}
                onChange={(e) => {
                  if (!RegEx.pinCode.test(e.target.value)) {
                    setPinCodeErr(true);
                  } else {
                    setPinCodeErr(false);
                    setCompanyDetails({
                      ...companyDetails,
                      officePincode: e.target.value,
                    });
                  }
                }}
                onBlur={(e) => {
                  getLocation();
                }}
                invalid={pinCodeErr === true}
              />
              <FormFeedback>Please enter valid pincode</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">City </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="text"
                name="city"
                placeholder="City"
                defaultValue={companyDetails.officeCity}
                onChange={(e) => {
                  if (!RegEx.alphabetSpace.test(e.target.value)) {
                    setRegCityErr(true);
                  } else {
                    setRegCityErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      officeCity: e.target.value,
                    });
                  }
                }}
                invalid={regCityErr === true}
              />
              <FormFeedback>Please enter valid city name</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">State </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="text"
                name="state"
                placeholder="State"
                defaultValue={companyDetails.officeState}
                onChange={(e) => {
                  if (!RegEx.alphabetSpace.test(e.target.value)) {
                    setRegStateErr(true);
                  } else {
                    setRegStateErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      officeState: e.target.value,
                    });
                  }
                }}
                invalid={regStateErr === true}
              />
              <FormFeedback>Please enter valid state name</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row className="formGrid">
          <Col xs={12} md={12} lg={12}>
            <FormGroup className="mb-2" check>
              <Label className="label" check style={{ color: "#fff" }}>
                <Input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                  }}
                />{" "}
                Corporate Address same as Registered Office Address
              </Label>
            </FormGroup>
          </Col>
        </Row>

        <Row form className="formGrid pt-2">
          <Col xs={12} md={12} lg={12}>
            <FormGroup className="mb-2">
              <Label className="label">5. Corporate Address </Label>
              <Input
                className={
                  isChecked || isEditable ? "input inputColorDisabled" : "input"
                }
                type="text"
                disabled={isChecked || isEditable ? true : false}
                name="corporateAddress"
                placeholder="Corporate Address"
                defaultValue={companyDetails.corpAddress}
                onChange={(e) => {
                  if (
                    !RegEx.alphaNumericSpace.test(e.target.value) ||
                    e.target.value.length < 10
                  ) {
                    setCorpAddressErr(true);
                  } else {
                    setCorpAddressErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      corpAddress: e.target.value,
                    });
                  }
                }}
                invalid={corpAddressErr === true}
              />
              <FormFeedback>Please enter valid corporate address</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row form className="formGrid">
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">Pincode </Label>
              <Input
                disabled={isEditable}
                className={
                  isChecked || isEditable ? "input inputColorDisabled" : "input"
                }
                type="number"
                name="corpPin"
                disabled={isChecked || isEditable ? true : false}
                placeholder="Pincode"
                defaultValue={companyDetails.corpPincode}
                onChange={(e) => {
                  if (!RegEx.pinCode.test(e.target.value)) {
                    setCorpPincodeErr(true);
                  } else {
                    setCorpPincodeErr(false);
                    setCompanyDetails({
                      ...companyDetails,
                      corpPincode: e.target.value,
                    });
                  }
                }}
                onBlur={(e) => {
                  getLocationCorp();
                }}
                invalid={corpPincodeErr === true}
              />
              <FormFeedback>Please enter valid pincode</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">City </Label>
              <Input
                className={
                  isChecked || isEditable ? "input inputColorDisabled" : "input"
                }
                type="text"
                name="city"
                disabled={isChecked || isEditable ? true : false}
                placeholder="City"
                defaultValue={companyDetails.corpCity}
                onChange={(e) => {
                  if (!RegEx.alphabetSpace.test(e.target.value)) {
                    setCorpCityErr(true);
                  } else {
                    setCorpCityErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      corpCity: e.target.value,
                    });
                  }
                }}
                invalid={corpCityErr === true}
              />
              <FormFeedback>Please enter valid city name</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">State </Label>
              <Input
                className={
                  isChecked || isEditable ? "input inputColorDisabled" : "input"
                }
                type="text"
                name="state"
                disabled={isChecked || isEditable ? true : false}
                placeholder="State"
                defaultValue={companyDetails.corpState}
                onChange={(e) => {
                  if (!RegEx.alphabetSpace.test(e.target.value)) {
                    setCorpStateErr(true);
                  } else {
                    setCorpStateErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      corpState: e.target.value,
                    });
                  }
                }}
                invalid={corpStateErr === true}
              />
              <FormFeedback>Please enter valid state name</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row form className="formGrid">
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">6. Email </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={companyDetails.compEmail}
                onChange={(e) => {
                  if (!RegEx.email.test(e.target.value)) {
                    setEmailErr(true);
                  } else {
                    setEmailErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      compEmail: e.target.value,
                    });
                  }
                }}
                invalid={emailErr === true}
              />
              <FormFeedback>Please enter valid email address.</FormFeedback>
            </FormGroup>
          </Col>

          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">7. Phone </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="tel"
                maxLength={10}
                defaultValue={mobileNumber}
                name="phone"
                placeholder="Phone"
                onChange={(e) =>
                  setMobileNumber(
                    !isNaN(e.currentTarget.value) ? e.currentTarget.value : ""
                  )
                }
                onBlur={() => {
                  if (!RegEx.phone.test(mobileNumber)) {
                    setPhoneErr(true);
                  } else {
                    setPhoneErr(false);
                    setCompanyDetails({
                      ...companyDetails,
                      compPhone: mobileNumber,
                    });
                  }
                }}
                invalid={phoneErr === true}
              />
              <FormFeedback>Please enter valid phone number.</FormFeedback>
            </FormGroup>
          </Col>

          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">8. Website </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="text"
                name="website"
                placeholder="Website"
                defaultValue={companyDetails.website}
                onChange={(e) => {
                  if (!RegEx.website.test(e.target.value)) {
                    setWebsiteErr(true);
                  } else {
                    setWebsiteErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      website: e.target.value,
                    });
                  }
                }}
                invalid={websiteErr === true}
              />
              <FormFeedback>Please enter valid email URL.</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row form className="formGrid">
          <Col xs={12} md={4} lg={4}>
            <FormGroup>
              <Label className="label">9. Financial Year</Label>
              <select
                disabled
                className="select disabledIpt"
                value={data.financialYear}
                onChange={handleChange}
              >
                <option value={data.financialYear}>
                  FY {data.financialYear}
                </option>
                {/* 
                <option value="2019">FY 2019 - 20</option>
                <option value="2020">FY 2020 - 21</option>
                <option value="2021">FY 2021 - 22</option>
                <option value="2022">FY 2022 - 23</option>
                */}
              </select>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">10. Name of Stock Exchange(s)</Label>

              <Select
                styles={{
                  control: (styles) => ({
                    ...styles,
                    backgroundColor: "#2E3439",
                    border: "none",
                    borderRadius: "none",
                    height: 40,
                  }),
                  option: (styles, { isSelected }) => {
                    return {
                      ...styles,
                      backgroundColor: isSelected ? "#2B8CD6" : "",
                      ":hover": {
                        backgroundColor: "#2B8CD6",
                      },
                    };
                  },
                  multiValue: (styles) => {
                    return {
                      ...styles,
                      backgroundColor: "#2B8CD6",
                      color: "#fff",
                    };
                  },
                  multiValueLabel: (styles) => {
                    return {
                      ...styles,
                      backgroundColor: "#2B8CD6",
                      color: "#fff",
                    };
                  },
                  menu: (styles) => ({
                    ...styles,
                    backgroundColor: "#2E3439",
                    color: "#fff",
                  }),
                }}
                isMulti
                disabled={isEditable}
                name="stockExchanges"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                value={companyDetails?.stockExchange?.map((s) => ({
                  label: s,
                  value: s,
                }))}
                onChange={(e) => {
                  console.log(e.value);
                  setStockExchange(e);
                  setCompanyDetails({
                    ...companyDetails,
                    stockExchange: e.map((e) => e.value),
                  });
                }}
              />
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">
                11. Paid Up Capital{" "}
                <span style={{ fontSize: 12 }}>( in lakhs )</span>{" "}
              </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="number"
                name="paidUpCapital"
                placeholder="Value in Lakhs"
                defaultValue={companyDetails.paidUpCapital}
                onChange={(e) => {
                  if (e.target.value > 0 && e.target.value !== " ") {
                    setCapitalErr(false);
                    handleInput(e);
                  } else {
                    setCapitalErr(true);
                    setCompanyDetails({
                      ...companyDetails,
                      paidUpCapital: e.target.value,
                    });
                  }
                }}
                invalid={capitalErr}
              />
              <FormFeedback>Please enter valid capital in Rs</FormFeedback>
              <p
                className="disabledValue"
                style={{ display: capitalErr && "none" }}
              >
                Lakhs
              </p>
            </FormGroup>
          </Col>
        </Row>
        <Label className="label" style={{ paddingTop: 10 }}>
          12. Person to contact in case of queries in BRSR Report{" "}
        </Label>
        <Row form className="formGrid">
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label"> Name </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="text"
                name="contactName"
                placeholder="Name"
                defaultValue={companyDetails.name}
                onChange={(e) => {
                  if (!RegEx.alphabetSpace.test(e.target.value)) {
                    setContactNameErr(true);
                  } else {
                    setContactNameErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      name: e.target.value,
                    });
                  }
                }}
                invalid={contactNameErr === true}
              />
              <FormFeedback>Please enter valid name.</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">Email </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="email"
                name="contactEmail"
                placeholder="Email"
                defaultValue={companyDetails.email}
                onChange={(e) => {
                  if (!RegEx.email.test(e.target.value)) {
                    setContactEmailErr(true);
                  } else {
                    setContactEmailErr(false);
                    handleInput(e);
                    setCompanyDetails({
                      ...companyDetails,
                      email: e.target.value,
                    });
                  }
                }}
                invalid={contactEmailErr === true}
              />
              <FormFeedback>Please enter valid email address.</FormFeedback>
            </FormGroup>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <FormGroup className="mb-2">
              <Label className="label">Phone </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="tel"
                maxLength={10}
                defaultValue={contactMobileNumber}
                name="contactPhone"
                placeholder="Phone"
                onChange={(e) =>
                  setContactMobileNumber(
                    !isNaN(e.currentTarget.value) ? e.currentTarget.value : ""
                  )
                }
                onBlur={() => {
                  if (!RegEx.phone.test(contactMobileNumber)) {
                    setContactPhoneErr(true);
                  } else {
                    setContactPhoneErr(false);
                    setCompanyDetails({
                      ...companyDetails,
                      phone: contactMobileNumber,
                    });
                  }
                }}
                invalid={contactPhoneErr === true}
              />
              <FormFeedback> Please enter valid phone number. </FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <Row form className="formGrid">
          <Col xs={12} md={6} lg={6}>
            <FormGroup>
              <Label className="label">13. Reporting Boundary </Label>
              <select
                disabled
                className="select disabledIpt"
                value={data.reportingBoundary}
                onChange={handleChangeReportBoundry}
              >
                <option value="Consolidated">Consolidated</option>
                <option value="Standalone">Standalone</option>
              </select>
            </FormGroup>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <FormGroup className="mb-2">
              <Label className="label">
                {" "}
                <span style={{ color: "#FCDB0A" }}>
                  {" "}
                  11. Authorized Capital{" "}
                  <span style={{ fontSize: 12 }}>( in lakhs )</span>{" "}
                </span>{" "}
              </Label>
              <Input
                disabled={isEditable}
                className={isEditable ? "input inputColorDisabled" : "input"}
                type="number"
                name="authorizedCapital"
                placeholder="Value in Lakhs"
                defaultValue={companyDetails.authorizedCapital}
                onChange={(e) => {
                  if (e.target.value > 0 && e.target.value !== " ") {
                    setAuthorizedCapitalErr(false);
                    handleInput(e);
                  } else {
                    setAuthorizedCapitalErr(true);
                    setCompanyDetails({
                      ...companyDetails,
                      authorizedCapital: e.target.value,
                    });
                  }
                }}
                invalid={authorizedCapitalErr}
              />
              <FormFeedback>Please enter valid capital in Rs</FormFeedback>
              <p
                className="disabledValue"
                style={{ display: authorizedCapitalErr && "none" }}
              >
                Lakhs
              </p>
            </FormGroup>
          </Col>
        </Row>

        <div
          className="mt-3"
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
                id="edit"
                className="mt-4 mb-4"
                color="secondary"
                style={{ width: 100 }}
                onClick={() => setIsEditable(!isEditable)}
              >
                {/* <HiPencil size={24} /> */}
                EDIT
              </Button>
              <TooltipComp message={"edit"} openTooltipN={0} target={"edit"} />
            </>
          )}

          {!isEditable && (
            <>
              <Button
                id="save"
                className="mt-4 mb-4 mr-3"
                color="primary"
                style={{ width: 100 }}
                onClick={() => saveData()}
              >
                {/* <HiOutlineBookmarkAlt size={24}/> */}
                {isLoading ? (
                  <div
                    class="spinner-border spinner-border-sm text-light"
                    role="status"
                  ></div>
                ) : (
                  "SAVE"
                )}
              </Button>
              <TooltipComp message={"save"} openTooltipN={0} target={"save"} />
            </>
          )}

          <Button
            id="next"
            className="mt-4 mb-4"
            color="dark"
            disabled={!isEditable}
            style={{ width: 100 }}
            onClick={() => document.getElementById("sidebar9").click()}
          >
            {/* <HiPencil size={24} /> */}
            {/* <Link to={`/financialData/Services/${id}`}>NEXT</Link> */}
            NEXT
          </Button>
          <TooltipComp message={"next"} openTooltipN={0} target={"next"} />
        </div>
      </Form>

      <Toast error={err} setError={setErr} msg={msg} color={color} />
    </div>
  );
}

export default UploadData;
