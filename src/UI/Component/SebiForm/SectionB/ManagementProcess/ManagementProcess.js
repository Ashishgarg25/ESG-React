import React, { useState } from "react";
import {
  HiPlus,
  HiOutlineTrash,
  HiPencil,
  HiSave,
  HiOutlineDocumentDuplicate,
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

function ManagementProcess() {
  const [inputField, setInputField] = useState([
    {
      id: 1,
      din: "",
      name: "",
      designation: "",
    },
  ]);
  const [directorNo, setDirectorNo] = useState(0);

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
        <span className="breadCrumbActive"> Management & Process </span>
      </div>

      <h2 className="heading" style={{ color: "#fff" }}>
        Policy & Management Process
      </h2>

      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead>
          <tr>
            <th className="tableHeading">S.No.</th>
            <th className="tableHeading">Disclosure Questions</th>
            <th className="tableHeading">P1</th>
            

          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="tableHeading"> 1.</th>
            <th className="tableHeading"> a. Name your company’s policy</th>
            <th className="tableHeading">
              <Input type="text" className="input" name="mainActivityDesc" />
            </th>
            
          </tr>
          <tr>
            <th className="tableHeading"> b.</th>
            <th className="tableHeading">
              {" "}
              Has the policy been approved by the Board?
            </th>
            <th className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-1">
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input type="radio" name="y" value="Yes" />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input type="radio" name="n" value="No" />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </th>
            
          </tr>
          <tr>
            <th className="tableHeading"> c.</th>
            <th className="tableHeading">
              {" "}
              Web Link of the Policies, if available
            </th>
            <th className="tableHeading">
              <Input type="text" className="input" name="mainActivityDesc" />
            </th>
            
          </tr>

          <tr>
          <th className="tableHeading"> 2.</th>
            <th className="tableHeading">
              {" "}
              2. Whether the entity has translated the policy into procedures.
            </th>
            <th className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-1">
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input type="radio" name="y" value="Yes" />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input type="radio" name="n" value="No" />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </th>
            
          </tr>

          <tr>
          <th className="tableHeading"> 3.</th>
            <th className="tableHeading">
              {" "}
              3. Do the enlisted policies extend to your value chain partners?
            </th>
            <th className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-1">
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input type="radio" name="y" value="Yes" />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input type="radio" name="n" value="No" />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </th>
           
          </tr>

          <tr>
          <th className="tableHeading"> 4.</th>
            <th className="tableHeading">
              {" "}
              4. Name of the national and international codes / certifications /
              labels / standards
            </th>
            <th className="tableHeading">
              <Input type="text" className="input" name="mainActivityDesc" />
            </th>
           
          </tr>
          <tr>
          <th className="tableHeading"> 5.</th>
            <th className="tableHeading">
              {" "}
              5. Specific commitments, goals and targets set by the entity
            </th>
            <th className="tableHeading">
              <Input type="text" className="input" name="mainActivityDesc" />
            </th>
            
          </tr>

          <tr>
          <th className="tableHeading"> 6.</th>
            <th className="tableHeading">
              {" "}
              6. Performance of the entity against the specific commitments,
            </th>
            
          </tr>
        </tbody>
      </Table>

      {/* <h4
                    style={{
                        color: "#2B8CD6",
                        fontSize: 20,
                        padding: 16,
                        paddingLeft: 0,
                        paddingTop: 16,
                    }}
                >
                    8. Details of the Director responsible for implementation of the Business Responsibility policy(ies)
                </h4>

                    <Row>
                        <Col md={7} className="d-flex justify-content-start align-items-center">
                            <FormGroup className="w-50">
                                <Label className="label">No. of Directors</Label>
                                <Input className="input" type="number" onChange={(e) => setDirectorNo(e.target.value)}/>
                            </FormGroup>
                            <Button
                                id="add12"
                                className="ml-3"
                                color="primary"
                                style={{ width: 100, marginTop: 32 }}
                                >
                                <HiPlus size={24} />
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
                                <th className="tableHeading">DIN Number</th>
                                <th className="tableHeading">Name</th>
                                <th className="tableHeading">Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inputField.map((item, idx) => (
                                    <tr key={item.id}>
                                        <th className="tableHeading">
                                            <Input
                                                type="number"
                                                className="input"
                                                name="number"
                                            />
                                        </th>
                                        <th className="tableHeading">
                                            <Input
                                                type="text"
                                                className="input"
                                                name="name"
                                            />
                                        </th>
                                        <th className="tableHeading">
                                            <Input
                                                type="text"
                                                className="input"
                                                name="designation"
                                            />
                                        </th>
                                    </tr>
                                )) 
                            }
                        </tbody>
                    </Table>

                    <h4
                    style={{
                        color: "#2B8CD6",
                        fontSize: 20,
                        padding: 16,
                        paddingLeft: 0,
                        paddingTop: 16,
                    }}
                >
                    9. Does the company have a specified committee of the Board/ Directors/ Officials to oversee the implementation of the policy?
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
                                <Input type="radio" name="type" value="No"/>
                                No
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7} className="d-flex justify-content-start align-items-center">
                            <FormGroup className="w-50">
                                <Label className="label">No. of Directors</Label>
                                <Input className="input" type="number" onChange={(e) => setDirectorNo(e.target.value)}/>
                            </FormGroup>
                            <Button
                                id="add12"
                                className="ml-3"
                                color="primary"
                                style={{ width: 100, marginTop: 32 }}
                                >
                                <HiPlus size={24} />
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
                                <th className="tableHeading">DIN Number</th>
                                <th className="tableHeading">Name</th>
                                <th className="tableHeading">Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inputField.map((item, idx) => (
                                    <tr key={item.id}>
                                        <th className="tableHeading">
                                            <Input
                                                type="number"
                                                className="input"
                                                name="number"
                                            />
                                        </th>
                                        <th className="tableHeading">
                                            <Input
                                                type="text"
                                                className="input"
                                                name="name"
                                            />
                                        </th>
                                        <th className="tableHeading">
                                            <Input
                                                type="text"
                                                className="input"
                                                name="designation"
                                            />
                                        </th>
                                    </tr>
                                )) 
                            }
                        </tbody>
                    </Table>

                    <Row>
                        <Col md={7} className="d-flex justify-content-start align-items-center">
                            <FormGroup className="w-50">
                                <Label className="label">No. of Employees</Label>
                                <Input className="input" type="number"/>
                            </FormGroup>
                            <Button
                                id="add13"
                                className="ml-3"
                                color="primary"
                                style={{ width: 100, marginTop: 32 }}
                                >
                                <HiPlus size={24} />
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
                                <th className="tableHeading">Employee Id</th>
                                <th className="tableHeading">Name</th>
                                <th className="tableHeading">Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inputField.map((item, idx) => (
                                    <tr key={item.id}>
                                        <th className="tableHeading">
                                            <Input
                                                type="number"
                                                className="input"
                                                name="number"
                                            />
                                        </th>
                                        <th className="tableHeading">
                                            <Input
                                                type="text"
                                                className="input"
                                                name="name"
                                            />
                                        </th>
                                        <th className="tableHeading">
                                            <Input
                                                type="text"
                                                className="input"
                                                name="designation"
                                            />
                                        </th>
                                    </tr>
                                )) 
                            }
                        </tbody>
                    </Table>


                    <h4
                    style={{
                        color: "#2B8CD6",
                        fontSize: 20,
                        padding: 16,
                        paddingLeft: 0,
                        paddingTop: 16,
                    }}
                >
                    10. Details of Review of NGRBCs by the Company:
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
                                <th className="tableHeading" style={{ width: 550 }}>Subject for Review</th>
                                <th className="tableHeading">Review undertaken by</th>
                                <th className="tableHeading">Frequency</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="tableHeading1 text-left" rowSpan={2}>
                                    Performance against above policies and follow up action
                                </th>
                                <th className="tableHeading">
                                    Board Committee
                                </th>
                                <th className="tableHeading">
                                    <select className="select">
                                        <option>Annually</option>
                                        <option>Half Yearly</option>
                                        <option>Quarterly</option>
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <th className="tableHeading">
                                    Any other Committee
                                </th>
                                <th className="tableHeading">
                                    <select className="select">
                                        <option>Annually</option>
                                        <option>Half Yearly</option>
                                        <option>Quarterly</option>
                                    </select>
                                </th>
                            </tr>

                            <tr>
                                <th className="tableHeading1 text-left" rowSpan={2}>
                                Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances
                                </th>
                                <th className="tableHeading">
                                    Board Committee
                                </th>
                                <th className="tableHeading">
                                    <select className="select">
                                        <option>Annually</option>
                                        <option>Half Yearly</option>
                                        <option>Quarterly</option>
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <th className="tableHeading">
                                    Any other Committee
                                </th>
                                <th className="tableHeading">
                                    <select className="select">
                                        <option>Annually</option>
                                        <option>Half Yearly</option>
                                        <option>Quarterly</option>
                                    </select>
                                </th>
                            </tr>
                        </tbody>
                    </Table>
                    

                    <h4
                    style={{
                        color: "#2B8CD6",
                        fontSize: 20,
                        padding: 16,
                        paddingLeft: 0,
                        paddingTop: 16,
                    }}
                >
                    11. Has the company carried out independent assessment/ evaluation of the working of this policy by an internal or external agency?
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
                                <Input type="radio" name="type" value="No"/>
                                No
                                </Label>
                            </FormGroup>
                        </Col>
                    </Row>


                <h4
                    style={{
                        color: "#2B8CD6",
                        fontSize: 20,
                        padding: 16,
                        paddingLeft: 0,
                        paddingTop: 16,
                    }}
                >
                    Stakeholder Engagement
                </h4>

                <Row className="">
                    <Col xs={12} md={12}>
                        <FormGroup className="mt-1">
                            <Label className="label">Describe the process of identifying key stakeholder groups of the company</Label>
                            <Input type="textarea" rows={3} className="input" />
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col xs={6} md={6}>
                        <FormGroup className="mt-1">
                            <Label className="label">Mention the channels to communicate to stakeholders, features of your policies, procedures, decisions and performance that impact them.</Label>
                            <select className="select">
                                <option>Email</option>
                                <option>SMS</option>
                                <option>Newspaper</option>
                                <option>Phamplets</option>
                                <option>Advertisement</option>
                                <option>Community Meetings</option>
                                <option>Notice Board</option>
                                <option>Website</option>
                                <option>Others</option>
                            </select>
                            
                        </FormGroup>
                    </Col>
                    <Col xs={6} md={6}>
                        <FormGroup check className="mt-1">
                            <Label className="label">What are the channels through which stakeholders can access information about the company on issues relevant to them?</Label>
                            <select className="select">
                                <option>Email</option>
                                <option>SMS</option>
                                <option>Newspaper</option>
                                <option>Phamplets</option>
                                <option>Advertisement</option>
                                <option>Community Meetings</option>
                                <option>Notice Board</option>
                                <option>Website</option>
                                <option>Others</option>
                            </select>
                            
                        </FormGroup>
                    </Col>
                </Row> */}
    </div>
  );
}

export default ManagementProcess;
