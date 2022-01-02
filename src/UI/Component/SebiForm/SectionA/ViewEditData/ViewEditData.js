import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "../../../../../assets/css/styles.css";
import {
  HiCurrencyDollar,
  HiDotsHorizontal,
  HiOutlineBookmarkAlt,
  HiOutlineDocument,
  HiOutlineTrash,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import {
  Row,
  Col,
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import RegEx from "../../../../../utils/RegEx/RegEx";
import Toast from "../../../../../utils/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import types from "../../../../../Redux/BRSR/type";
import { useHistory } from 'react-router-dom';

function ViewEditData({ siteDataObj }) {

  const history = useHistory();

  const { siteData, setSiteData } = siteDataObj;
  console.log({ siteData });
  const financialList = Array(new Date().getFullYear() - 1900 + 1)
    .fill(1900)
    .map((year, index) => year + index);
  const quarterList = [
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [4, "4th"],
  ];
  const allQuarterList = [...quarterList, [5, "Yearly"]];
  const repBoundList = ["Consolidated", "Standalone"];
  const initialBRSR = {
    entityId: "",
    formType: "",
    companyName: "",
    nameOfHSAJ: [],
    financialYear: "",
    quarter: "",
    reportingBoundary: "",
  };

  const [FormType, setFormType] = useState();
  const [CopmpanyName, setCopmpanyName] = useState();
  const [tags, setTags] = React.useState([]);
  const [ReprBound, setReprBound] = useState(repBoundList[0]);
  const [FinencialSelecter, setFinencialSelecter] = useState(false);
  const [QuarterSelecter, setQuarterSelecter] = useState(false);
  const [UpdateId, setUpdateId] = useState(false);

  const [companyNameErr, setCompanyNameErr] = useState(false);
  const [holdingNameErr, setHoldingNameErr] = useState(false);

  const [ isEditable, setIsEditable ] = useState(false);

  const [ clickable, setClickable ] = useState(false);

  // console.log(siteData.finencial.response[0].reportingId);
  const [BRSRform, setBRSRform] = useState(initialBRSR);

  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch();
  const [holdingsArr, setHoldingsArr] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [ reportId, setReportId ] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // setBRSRform(prev => {
    //   prev[name] = value;
    //   return prev;
    // });

    // BRSRform[name] = value;

    setBRSRform({
      ...BRSRform,
      [name]: value,
    });
    console.log(BRSRform);
  };
  dispatch({
    type: types.GET_ALL,
    payload: siteData,
  });

  const handleSave = () => {

    !UpdateId && setIsEditable(false)

    if (FormType && FinencialSelecter && QuarterSelecter && ReprBound) {
      siteData.finencial.brsr = {
        input: {
          entityId: UpdateId,
          formType: FormType,
          companyName: CopmpanyName,
          nameOfHSAJ: tags,
          financialYear: FinencialSelecter,
          quarter: QuarterSelecter,
          reportingBoundary: ReprBound,
        },
        operation: "POST",
      };

      console.log(siteData.finencial.brsr);
      setSiteData({ ...siteData });
    } else {
      setErr(true);
      setMsg(
        "Form Type, Financial Year, Quarter and Reporting Boundary are required."
      );
    }
  };

  const handleDelete = (data) => {
    if (window.confirm("Are you sure wants to delete Entity ?")) {
      siteData.finencial.brsr = {
        input: { entityId: data.entityId },
        operation: "DELETE",
      };
      setSiteData({ ...siteData });
    }
  };

  const handleEdit = (data) => {

    setIsEditable(true)

    setFormType(data.formType);
    setCopmpanyName(data.companyName);
    setTags(data.nameOfHSAJ);
    setReprBound(data.reportingBoundary);
    setFinencialSelecter(data.financialYear);
    setQuarterSelecter(data.quarter);
    setUpdateId(data.entityId);
  };

  const handleReset = () => {
    setFormType("");
    setCopmpanyName("");
    setTags([]);
    setReprBound("");
    setFinencialSelecter("");
    setQuarterSelecter("");
    setUpdateId(false);
    setIsEditable(false)
  };

  const BRSR = siteData.finencial.response;
  const availableQuarter = BRSR.filter(
    (fl1) => fl1.financialYear == FinencialSelecter && fl1.entityId != UpdateId
  );
  

  return (
    <div className="wrapperContent">
      <div className="breadCrumb">
        <span className="breadCrumbItem">
          Data Management &nbsp;/&nbsp;&nbsp;{" "}
        </span>
        <span className="breadCrumbActive"> BRSR </span>
      </div>
      {/* <div className="float-right" style={{ color: "#f56" }}>
        <span>Company Name</span> - <span>Reporting</span> - <span>Financial Year</span> - <span>Quarter</span>
      </div> */}
      <h2 className="heading" style={{ color: "#fff" }}>
        BRSR
      </h2>

      <Row form>
        <Label className="label mr-5 pl-2">Select Form Type</Label>
        <Col xs={2} md={2}>
          <FormGroup check className="mt-1">
            <Label className="label" check>
              <Input
                disabled={isEditable}
                type="radio"
                name="formType"
                checked={FormType == 1}
                value="1"
                onChange={(e) => setFormType(e.target.value)}
              />{" "}
              SEBI
            </Label>
          </FormGroup>
        </Col>
        <Col xs={3} md={3}>
          <FormGroup check className="mt-1">
            <Label className="label" check>
              <Input
                disabled={isEditable}
                type="radio"
                name="formType"
                checked={FormType == 2}
                value="2"
                onChange={(e) => setFormType(e.target.value)}
              />{" "}
              SEBI & MCA Combined
            </Label>
          </FormGroup>
        </Col>
      </Row>

      <Row form className="mt-3">
        <Col xs={12} md={6} lg={6}>
          <FormGroup className="mb-2" autoComplete="on">
            <Label className="label"> Company Name </Label>
            <Input
              disabled={isEditable}
              className={ isEditable ? "input disabledIpt" : "input" }
              autoComplete="on"
              type="text"
              name="companyName"
              placeholder="Name"
              value={CopmpanyName}
              onChange={(e) => {
                if (!RegEx.companyName.test(e.target.value)) {
                  setCompanyNameErr(true);
                } else {
                  setCompanyNameErr(false);
                }
                setCopmpanyName(e.target.value);
              }}
              invalid={companyNameErr === true}
            />
            <FormFeedback>Please enter valid Company Name</FormFeedback>
          </FormGroup>
        </Col>
        <Col xs={12} md={6} lg={6}>
          <FormGroup className="mb-2">
            <Label className="label">
              {" "}
              Names of holding / subsidiary / associate companies / joint
              ventures{" "}
            </Label>
            <ReactTagInput
              className="input mb-3"
              tags={tags}
              placeholder="Type and press enter"
              editable={true}
              readOnly={false}
              removeOnBackspace={true}
              onChange={(newTags) => {
                setTags(newTags);
              }}
              validator={(val) => (val.trim() !== "" ? true : false)}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col xs={12} md={4} lg={4}>
          <FormGroup>
            <Label className="label">Financial Year</Label>
            <select
              name="financialYear"
              className="select"
              onChange={(th) => {
                setFinencialSelecter(th.target.value);
              }}
              value={FinencialSelecter}
            >
              <option value="">Select..</option>
              {financialList
                .filter(
                  (fl1) =>
                    BRSR.findIndex(
                      (fi1) =>
                        fi1.financialYear == fl1 &&
                        fi1.quarter == 5 &&
                        fi1.entityId != UpdateId
                    ) < 0 &&
                    BRSR.filter(
                      (fl2) =>
                        fl2.financialYear == fl1 && fl2.entityId != UpdateId
                    ).length < 4
                )
                .map((fYear) => (
                  <option value={fYear}>
                    {"FY " + fYear + " - " + (fYear + 1)}
                  </option>
                ))}
            </select>
          </FormGroup>
        </Col>
        <Col xs={12} md={4} lg={4}>
          <FormGroup>
            <Label className="label ">Quarter</Label>
            <select
              name="quarter"
              className="select"
              onChange={(th) => setQuarterSelecter(th.target.value)}
              value={QuarterSelecter}
            >
              <option value="">Select..</option>
              {allQuarterList
                .filter(
                  (fl1) =>
                    !(
                      (availableQuarter.length && fl1[0] == 5) ||
                      availableQuarter.findIndex(
                        (fi1) => fi1.quarter == fl1[0] || fi1.quarter == 5
                      ) >= 0
                    )
                )
                .map((fQuarter) => (
                  <option value={fQuarter[0]}>{fQuarter[1]}</option>
                ))}
            </select>
          </FormGroup>
        </Col>
        <Col xs={12} md={4} lg={4}>
          <FormGroup>
            <Label className="label">Reporting Boundary </Label>
            <select
              name="reportingBoundary"
              className="select"
              onChange={(th) => {
                setReprBound(th.target.value);
              }}
              value={ReprBound}
            >
              <option value="">Select..</option>
              {repBoundList.map((el) => (
                <option value={el}>{el}</option>
              ))}
            </select>
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
        {/* <Button id="edit" className="mt-4 mb-4 mr-3" color="warning" style={{ width: 100 }} > */}
        {/* <HiPencil size={24} /> */}
        {/* EDIT */}
        {/* </Button> */}
        {/* <TooltipComp message={"edit"} openTooltipN={0} target={"edit"}  /> */}
        <Button
          id="save"
          className="mt-4 mb-4 mr-3"
          color="secondary"
          onClick={handleReset}
          style={{ width: 100, display: UpdateId ? "block" : "none" }}
        >
          {/* <HiOutlineBookmarkAlt size={24}/> */}
          CANCEL
        </Button>
        <TooltipComp message={"save"} openTooltipN={0} target={"save"} />

        <Button
          id="save"
          className="mt-4 mb-4 mr-3"
          color="primary"
          onClick={handleSave}
          style={{ width: 100 }}
        >
          {/* <HiOutlineBookmarkAlt size={24}/> */}
          {UpdateId ? "SAVE" : "CREATE"}
        </Button>
        <TooltipComp message={UpdateId ? "save" : "create"} openTooltipN={0} target={"save"} />
        
        {/* {
          BRSR.length <= 0 ?
            <>
              <Button
                id="save"
                className="mt-4 mb-4 mr-3"
                color="primary"
                onClick={handleSave}
                style={{ width: 100 }}
              >
                <HiOutlineBookmarkAlt size={24}/> 
                {UpdateId ? "SAVE" : "CREATE"}
              </Button>
              <TooltipComp message={UpdateId ? "save" : "create"} openTooltipN={0} target={"save"} />
            </>
          :
          <>
            <Button
              id="save"
              className="mt-4 mb-4 mr-3"
              color="primary"
              // onClick={handleSave}
              style={{ width: 100 }}
            >
              // <HiOutlineBookmarkAlt size={24}/>
              ADD
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"save"} />
          </>
        } */}

        <Button
          id="next"
          className="mt-4 mb-4"
          color="dark"
          style={{ width: 100 }}
          disabled={!clickable}
          onClick={() => { history.push("/financialData/companyInfo/"+reportId) }}
        >
          {/* <HiPencil size={24} /> */}
          NEXT
        </Button>
        <TooltipComp message={"next"} openTooltipN={0} target={"next"} />
      </div>

      {BRSR.length > 0 ? (
        <Table dark className="mt-5">
          <thead>
            <tr>
              <th
                className="tableHeading"
                style={{ fontWeight: "bold", width: 300 }}
              >
                Company Name
              </th>
              <th className="tableHeading" style={{ fontWeight: "bold" }}>
                Financial Year
              </th>
              <th className="tableHeading" style={{ fontWeight: "bold" }}>
                Quarter
              </th>
              <th className="tableHeading" style={{ fontWeight: "bold" }}>
                Reporting Boundary
              </th>
              <th className="tableHeading" style={{ fontWeight: "bold" }}>
                Holdings
              </th>
              <th
                className="tableHeading"
                style={{ fontWeight: "bold", width: 240 }}
              >
                Actions
              </th>
              {/* <th className="tableHeading" style={{ fontWeight: "bold" }}>Reporting Boundary</th> */}
            </tr>
          </thead>
          <tbody>
            {BRSR.map((brsrDetails) => (
              <tr>
                {/* <td className="tableHeading py-2">
                  <FormGroup check style={{ paddingBottom: 24 }}>
                    <Label check>
                      <Input
                        type="radio"
                        name="type"
                        value="check"
                        onChange={() => {
                          dispatch({
                            type: types.SET_REPORTING_ID,
                            payload: brsrDetails.reportingId,
                          });
                        }}
                      />
                    </Label>
                  </FormGroup>
                </td> */}
                <td className="tableHeading py-2">{brsrDetails.companyName}</td>
                <td className="tableHeading py-2">
                  {"FY " +
                    parseInt(brsrDetails.financialYear) +
                    " - " +
                    (parseInt(brsrDetails.financialYear) + 1)}
                </td>
                <td className="tableHeading py-2">
                  {
                    allQuarterList.filter(
                      (el) => el[0] == brsrDetails.quarter
                    )[0][1]
                  }
                </td>
                <td className="tableHeading py-2">
                  {brsrDetails.reportingBoundary}
                </td>
                <td className="tableHeading">
                  <HiCurrencyDollar
                    size={24}
                    color={"#fcdb0a"}
                    id="holding"
                    onClick={() => {
                      setModalVisible(true);
                      setHoldingsArr(brsrDetails.nameOfHSAJ);
                    }}
                  />
                  <TooltipComp
                    message={"Click to View Holdings"}
                    openTooltipN={0}
                    target={"holding"}
                  />
                </td>
                <td className="tableHeading py-2">
                  <Button
                    id={"edit" + brsrDetails.entityId}
                    className="mr-3 btn-sm"
                    color="warning"
                    style={{ width: 100 }}
                    onClick={() => handleEdit({ ...brsrDetails })}
                  >
                    {" "}
                    EDIT{" "}
                  </Button>
                  <Button
                    id={"view" + brsrDetails.entityId}
                    className="mr-3 btn-sm"
                    color="success"
                    style={{ width: 100 }}
                    onClick={() => {
                      setReportId(brsrDetails.reportingId)
                      dispatch({
                        type: types.SET_REPORTING_ID,
                        payload: brsrDetails.reportingId,
                      });
                      setClickable(true)
                    }}
                  >
                    {" "}
                    VIEW{" "}
                  </Button>
                  <TooltipComp
                    message={"Edit"}
                    openTooltipN={0}
                    target={"edit" + brsrDetails.entityId}
                  />
                  <TooltipComp
                    message={"view"}
                    openTooltipN={0}
                    target={"view" + brsrDetails.entityId}
                  />
                </td>
                {/* <td className="tableHeading py-2">Consolidated</td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}

      <Modal
        backdrop="static"
        isOpen={modalVisible}
        toggle={() => setModalVisible(!modalVisible)}
        className="modalContainer"
      >
        <ModalHeader
          toggle={() => setModalVisible(!modalVisible)}
          className="modalHead"
        >
          Holdings
        </ModalHeader>
        <ModalBody className="modalBody">
          <Table
            dark
            size="sm"
            className="text-center  mt-3"
            bordered
            style={{ borderColor: "#2E3439" }}
          >
            <thead className="tableHead">
              <tr>
                <th className="tableHeading">S.No.</th>
                <th className="tableHeading">Holdings</th>
                <th className="tableHeading">Actions</th>
              </tr>
            </thead>

            <tbody>
              {holdingsArr.map((item, idx) => (
                <tr key={item.id}>
                  <td className="tableHeading" className="pt-3">
                    {" "}
                    {idx + 1}{" "}
                  </td>
                  <td className="tableHeading">
                    <FormGroup className="m-0">
                      <Label>{item}</Label>
                    </FormGroup>
                  </td>
                  <td className="tableHeading py-2">
                  <Button
                    id={"edit"}
                    className="mr-3 btn-sm"
                    color="warning"
                    style={{ width: 100 }}
                   
                  >
                    {" "}
                    EDIT{" "}
                  </Button>
                  <Button
                    id={"view"}
                    className="mr-3 btn-sm"
                    color="success"
                    style={{ width: 100 }}
                   
                  >
                    {" "}
                    VIEW{" "}
                  </Button>
                  <TooltipComp
                    message={"Edit"}
                    openTooltipN={0}
                    target={"edit"}
                  />
                  <TooltipComp
                    message={"view"}
                    openTooltipN={0}
                    target={"view"}
                  />
                </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>

      <Toast error={err} setError={setErr} msg={msg} />
    </div>
  );
}

export default ViewEditData;
