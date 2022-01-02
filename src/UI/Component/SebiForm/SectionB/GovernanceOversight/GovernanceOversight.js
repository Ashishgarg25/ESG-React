import React, { useState } from "react";
import {
  HiPlus,
  HiOutlineTrash,
  HiPencil,
  HiSave,
  HiOutlineDocumentDuplicate,
  HiOutlineInformationCircle,
} from "react-icons/hi";

import {
  Table,
  FormGroup,
  Input,
  FormFeedback,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Row,
  Col,
  Label,
} from "reactstrap";

import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import classnames from "classnames";

import "../../../../../assets/css/styles.css";

function GovernanceOversight() {

  const [inputField, setInputField] = useState([
    {
      id: 1,
      din: "",
      name: "",
      designation: "",
    }
  ]);

  const [inputList, setInputList] = useState([
    {
      id: 1,
      din: "",
      name: "",
      designation: "",
    }
  ]);

  const [employeeList, setEmployeeList] = useState([
    {
      id: 1,
      employeeId: "",
      name: "",
      designation: "",
    }
  ]);

  const [directorNo, setDirectorNo] = useState(0);
  const [companyDir, setCompanyDir] = useState(0);
  const [employeeNo, setEmployeeNo] = useState(0);

  const [ statementErr, setStatementErr ] = useState(false);
  const [ statement, setStatement ] = useState("");


  let arr = [];
  let arr1 = [];
  let arr2 = [];

  const addField = () => {
    let num = parseInt(directorNo);

    if(num <= inputField.length){

    }else{
      for(let i = 1; i <= num; i++){
        arr.push([
          ...arr,
          {
            id: i,
            din: "",
            name: "",
            designation: "",
          }
        ])
      }

      setInputField([
        ...arr
      ])
    }

  }

  const addInputList = () => {
    let num = parseInt(companyDir);

    if(num <= inputList.length){

    }else{
      for(let i = 1; i <= num; i++){
        arr1.push([
          ...arr1,
          {
            id: i,
            din: "",
            name: "",
            designation: "",
          }
        ])
      }

      setInputList([
        ...arr1
      ])
    }

  }

  const addEmployeeList = () => {
    let num = parseInt(employeeNo);

    if(num <= employeeList.length){

    }else{
      for(let i = 1; i <= num; i++){
        arr2.push([
          ...arr2,
          {
            id: i,
            din: "",
            name: "",
            designation: "",
          }
        ])
      }

      setEmployeeList([
        ...arr2
      ])
    }

  }

  const removeField = async(id) => {
    const list = inputField.filter((item) => item.id !== id);
    setInputField(list);
  }

  const removeList = async(id) => {
    const list = inputList.filter((item) => item.id !== id);
    setInputList(list);
  }

  const removeEmployee = async(id) => {
    const list = employeeList.filter((item) => item.id !== id);
    setEmployeeList(list);
  }

  return (
    <div className="wrapperContent">
      <div className="breadCrumb">
        <span className="breadCrumbItem">
          Data Management &nbsp;/&nbsp;&nbsp;{" "}
        </span>
        <span className="breadCrumbItem">
          {" "}
          Financial Year &nbsp;/&nbsp;&nbsp;{" "}
        </span>
        <span className="breadCrumbItem">
          {" "}
          FY 2020 - 21 (Q1) &nbsp;/&nbsp;&nbsp;{" "}
        </span>
        <span className="breadCrumbItem"> Section A &nbsp;/&nbsp;&nbsp; </span>
        <span className="breadCrumbActive"> Governance & Oversight </span>
      </div>

      <h2 className="heading" style={{ color: "#fff" }}>
        Governance, leadership and oversight
      </h2>

      <h4 className="subHeading">
        7. Statement by director responsible for the business responsibility
        report, highlighting ESG related challenges, targets and achievements
        <span id="cat10" style={{ color: "green" }}>
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={
            "Listed entity has flexibility regarding the placement of this disclosure"
          }
          openTooltipN={0}
          target="cat10"
        />
      </h4>

      <Input
        type="textarea"
        rows={3}
        className="input"
        placeholder="Statement by director..."
        onChange={(e) => {
          if(e.target.value === "" || e.target.value === " "){
            setStatementErr(true);
          }else{
            setStatementErr(false);
            setStatement(e.target.value)
          }
        }}
        invalid={statementErr}
      />
      <FormFeedback> Please enter valid statement. </FormFeedback>
      
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
          marginTop: 16
        }}
      >
        <Button
          id="edit3"
          className="mt-4 mb-4 mr-3"
          color="secondary"
          style={{ width: 100 }}
        >
          EDIT
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
        <Button
          id="save10"
          className="mt-4 mb-4"
          color="primary"
          style={{ width: 100 }}
        >
          SAVE
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"save"} openTooltipN={0} target={"save10"} />
      </div>

      <h4 className="subHeading mt-5">
        8. <span style={{ color: "#fcdb0a" }}>MCA 5.</span> Details of the Director responsible for implementation of the
        Business Responsibility policy(ies)
      </h4>

      <Row>
        <Col md={7} className="d-flex justify-content-start align-items-center">
          <FormGroup className="w-50">
            <Label className="label">No. of Directors</Label>
            <Input
              className="input"
              type="number"
              onChange={(e) => setDirectorNo(e.target.value)}
              placeholder="No. of Directors"
            />
          </FormGroup>
          <Button
            id="add12"
            className="ml-3"
            color="warning"
            style={{ width: 100, marginTop: 32 }}
            onClick={() => addField()}
          >
            {/* <HiPlus size={24} /> */}
            ADD
          </Button>
          <TooltipComp message={"add"} openTooltipN={0} target={"add12"} />
        </Col>
      </Row>

      <Table
        dark
        size="sm"
        className="text-center mt-4"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead>
          <tr>
          <th className="tableHeading">S.No.</th>
            <th className="tableHeading">DIN Number</th>
            <th className="tableHeading">Name</th>
            <th className="tableHeading">Designation</th>
            <th className="tableHeading">Action</th>
          </tr>
        </thead>
        <tbody>
          {inputField.map((item, idx) => (
            <tr key={item.id}>
              <td className="tableHeading">
                {idx + 1}
              </td>
              <td className="tableHeading">
                <Input type="number" className="input" name="number" placeholder="DIN No." />
              </td>
              <td className="tableHeading">
                <Input type="text" className="input" name="name" placeholder="Name"/>
              </td>
              <td className="tableHeading">
                <Input type="text" className="input" name="designation" placeholder="Designation"/>
              </td>
              <td className="tableHeading" className="pt-3">
                <HiOutlineTrash
                  size={22}
                  id={"delete" + idx}
                  color={inputField.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    inputField.length > 1 ? removeField(item.id) : ""
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
        <Button
          id="edit3"
          className="mt-4 mb-4 mr-3"
          color="secondary"
          style={{ width: 100 }}
        >
          EDIT
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
        <Button
          id="save10"
          className="mt-4 mb-4"
          color="primary"
          style={{ width: 100 }}
        >
          SAVE
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"save"} openTooltipN={0} target={"save10"} />
      </div>

      <h4 className="subHeading mt-5">
        9. <span style={{ color: "#fcdb0a" }}>MCA 6.</span> Does the company have a specified committee of the Board/ Directors/
        Officials to oversee the implementation of the policy?
      </h4>

      <Row className="mb-4">
        <Col xs={1} md={1} className="ml-3">
          <FormGroup check className="mt-1">
            <Label check className="label">
              <Input type="radio" name="type" value="Yes" defaultChecked />
              Yes
            </Label>
          </FormGroup>
        </Col>
        <Col xs={1} md={1}>
          <FormGroup check className="mt-1">
            <Label check className="label">
              <Input type="radio" name="type" value="No" />
              No
            </Label>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={7} className="d-flex justify-content-start align-items-center">
          <FormGroup className="w-50">
            <Label className="label">No. of Directors</Label>
            <Input
              className="input"
              type="number"
              onChange={(e) => setCompanyDir(e.target.value)}
            />
          </FormGroup>
          <Button
            id="add12"
            className="ml-3"
            color="warning"
            style={{ width: 100, marginTop: 32 }}
            onClick={() => addInputList()}
          >
            {/* <HiPlus size={24} /> */}
            ADD
          </Button>
          <TooltipComp message={"add"} openTooltipN={0} target={"add12"} />
        </Col>
      </Row>

      <Table
        dark
        size="sm"
        className="text-center mt-4"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead>
          <tr>
            <th className="tableHeading">S.No.</th>
            <th className="tableHeading">DIN Number</th>
            <th className="tableHeading">Name</th>
            <th className="tableHeading">Designation</th>
            <th className="tableHeading">Action</th>
          </tr>
        </thead>
        <tbody>
          {inputList.map((item, idx) => (
            <tr key={item.id}>
              <td className="tableHeading">
                {idx + 1}
              </td>
              <td className="tableHeading">
                <Input type="number" className="input" name="number" />
              </td>
              <td className="tableHeading">
                <Input type="text" className="input" name="name" />
              </td>
              <td className="tableHeading">
                <Input type="text" className="input" name="designation" />
              </td>
              <td className="tableHeading" className="pt-3">
                <HiOutlineTrash
                  size={22}
                  id={"delete" + idx}
                  color={inputList.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    inputList.length > 1 ? removeList(item.id) : ""
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

      <Row>
        <Col md={7} className="d-flex justify-content-start align-items-center">
          <FormGroup className="w-50">
            <Label className="label">No. of Employees</Label>
            <Input className="input" type="number" onChange={(e) => setEmployeeNo(e.target.value)} />
          </FormGroup>
          <Button
            id="add13"
            className="ml-3"
            color="warning"
            style={{ width: 100, marginTop: 32 }}
            onClick={() => addEmployeeList()}
          >
            {/* <HiPlus size={24} /> */}
            ADD
          </Button>
          <TooltipComp message={"add"} openTooltipN={0} target={"add13"} />
        </Col>
      </Row>

      <Table
        dark
        size="sm"
        className="text-center mt-4"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead>
          <tr>
          <th className="tableHeading">S.No.</th>
            <th className="tableHeading">Employee Id</th>
            <th className="tableHeading">Name</th>
            <th className="tableHeading">Designation</th>
            <th className="tableHeading">Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((item, idx) => (
            <tr key={item.id}>
              <td className="tableHeading">
                {idx + 1}
              </td>
              <td className="tableHeading">
                <Input type="number" className="input" name="number" />
              </td>
              <td className="tableHeading">
                <Input type="text" className="input" name="name" />
              </td>
              <td className="tableHeading">
                <Input type="text" className="input" name="designation" />
              </td>
              <td className="tableHeading" className="pt-3">
                <HiOutlineTrash
                  size={22}
                  id={"delete" + idx}
                  color={employeeList.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    employeeList.length > 1 ? removeEmployee(item.id) : ""
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
        <Button
          id="edit2"
          className="mt-4 mb-4 mr-3"
          color="secondary"
          style={{ width: 100 }}
        >
          EDIT
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"edit"} openTooltipN={0} target={"edit2"} />
        <Button
          id="save9"
          className="mt-4 mb-4"
          color="primary"
          style={{ width: 100 }}
        >
          SAVE
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"save"} openTooltipN={0} target={"save9"} />
      </div>

      <h4 className="subHeading mt-5" style={{ color: "#fcdb0a" }}>
        7 Details of Review of NGRBCs by the Company:
      </h4>

      <Table
        dark
        size="sm"
        className="text-center mt-4"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead>
          <tr>
            <th className="tableHeading" style={{ width: 550 }}>
              Subject for Review
            </th>
            <th className="tableHeading">Review undertaken by</th>
            <th className="tableHeading">Frequency</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="tableHeading1 text-left" rowSpan={2}>
              Performance against above policies and follow up action
            </th>
            <th className="tableHeading">Board Committee</th>
            <th className="tableHeading">
              <select className="select">
                <option>Select...</option>
                <option>Annually</option>
                <option>Half Yearly</option>
                <option>Quarterly</option>
              </select>
            </th>
          </tr>
          <tr>
            <th className="tableHeading">Any other Committee</th>
            <th className="tableHeading">
              <select className="select">
              <option>Select...</option>
                <option>Annually</option>
                <option>Half Yearly</option>
                <option>Quarterly</option>
              </select>
            </th>
          </tr>

          <tr>
            <th className="tableHeading1 text-left" rowSpan={2}>
              Compliance with statutory requirements of relevance to the
              principles, and, rectification of any non-compliances
            </th>
            <th className="tableHeading">Board Committee</th>
            <th className="tableHeading">
              <select className="select">
              <option>Select...</option>
                <option>Annually</option>
                <option>Half Yearly</option>
                <option>Quarterly</option>
              </select>
            </th>
          </tr>
          <tr>
            <th className="tableHeading">Any other Committee</th>
            <th className="tableHeading">
              <select className="select">
              <option>Select...</option>
                <option>Annually</option>
                <option>Half Yearly</option>
                <option>Quarterly</option>
              </select>
            </th>
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
        <Button
          id="edit1"
          className="mt-4 mb-4 mr-3"
          color="secondary"
          style={{ width: 100 }}
        >
          EDIT
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"edit"} openTooltipN={0} target={"edit1"} />
        <Button
          id="save1"
          className="mt-4 mb-4"
          color="primary"
          style={{ width: 100 }}
        >
          SAVE
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"save"} openTooltipN={0} target={"save1"} />
      </div>

      <h4 className="subHeading mt-5" style={{ color: "#fcdb0a" }}>
        8. Has the company carried out independent assessment/ evaluation of
        the working of this policy by an internal or external agency?
      </h4>

      <Row className="mb-4">
        <Col xs={1} md={1} className="ml-3">
          <FormGroup check className="mt-1">
            <Label check className="label">
              <Input type="radio" name="type" value="Yes" defaultChecked />
              Yes
            </Label>
          </FormGroup>
        </Col>
        <Col xs={1} md={1}>
          <FormGroup check className="mt-1">
            <Label check className="label">
              <Input type="radio" name="type" value="No" />
              No
            </Label>
          </FormGroup>
        </Col>
      </Row>

      {/* <Input type="text" className="input" placeholder="Agency Name" /> */}

      <div
      className="mt-4"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          height: 40,
        }}
      >
        <Button
          id="edit1"
          className="mt-4 mb-4 mr-3"
          color="secondary"
          style={{ width: 100 }}
        >
          EDIT
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"edit"} openTooltipN={0} target={"edit1"} />
        <Button
          id="save1"
          className="mt-4 mb-4"
          color="primary"
          style={{ width: 100 }}
        >
          SAVE
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"save"} openTooltipN={0} target={"save1"} />
      </div>

      
    </div>
  );
}

export default GovernanceOversight;
