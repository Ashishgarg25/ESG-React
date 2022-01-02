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
import RegEx from "../../../../../utils/RegEx/RegEx";

function PrincipleContent({ principleName, principleDesc, apiCallVal }) {

    const [isEditable, setIsEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [ policyNameErr, setPolicyNameErr ] = useState(false);
    const [ webErr, setWebErr ] = useState(false);
    const [ commit, setCommit ] = useState(false);
    const [ performanceErr, setPerformanceErr ] = useState(false);

    const [ agencyNameErr, setAgencyNameerr ] = useState(false);
    const [ agencyName, setAgencyName ] = useState("");
    const [ showAgencyIpt, setShowAgencyIpt ] = useState(false)

    const [ cclsNameErr, setCclsNameErr ] = useState(false)

    const [ policyProcess, setPolicyProcess ] = useState([]);

    const handlePolicy = (e) => {
      const { name, value } = e.target;

      setPolicyProcess({
        ...policyProcess,
        [name]: value
      })
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
          <span className="breadCrumbItem"> Section B &nbsp;/&nbsp;&nbsp; </span>
          <span className="breadCrumbItem"> Principles &nbsp;/&nbsp;&nbsp; </span>
          <span className="breadCrumbActive"> Principle </span>
        </div>
  
        <h2 className="heading" style={{ color: "#fff" }}>
          {principleName} ( {principleDesc} )
          {/* <span id="cat9" style={{ color: "green" }}>
            {" "}
            <HiOutlineInformationCircle size={20} color="#fff" />
          </span>
          <TooltipComp
            message={
              principleDesc
            }
            openTooltipN={0}
            target="cat9"
          /> */}
        </h2>
  
        <h4
          style={{
            color: "#2B8CD6",
            fontSize: 20,
            padding: 16,
            paddingTop: 0,
            paddingLeft: 0,
          }}
        >
          Policy & Management Process{" "}
        </h4>
  
        <Table
          dark
          size="sm"
          className="text-center"
          bordered
          style={{ borderColor: "#2E3439" }}
        >
          <thead>
            <tr>
              <th className="tableHeading" style={{ width: 120 }}>
                {" "}
                S.No.
              </th>
              <th className="tableHeading" style={{ width: 420 }}>
                Disclosure Questions
              </th>
              <th className="tableHeading">
                {principleName}{" "}
                <span id="cat9" style={{ color: "green" }}>
                  {" "}
                  <HiOutlineInformationCircle size={20} color="#fff" />
                </span>
                <TooltipComp
                  message={
                    principleDesc
                  }
                  openTooltipN={0}
                  target="cat9"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="tableHeading"> 1. a.</th>
              <th className="tableHeadingLeft">Name your company’s policy</th>
              <th className="tableHeadingLeft">
                <Input
                  type="text"
                  className="input"
                  name="companyPolicy"
                  placeholder="Text here..."
                  onChange={(e) => {
                    if(e.target.value === "" || e.target.value === " "){
                      setPolicyNameErr(true);
                    }else{
                      setPolicyNameErr(false);
                      handlePolicy(e)
                    }
                  }}
                  invalid={policyNameErr}
                />
                <FormFeedback> Please enter valid policy name. </FormFeedback>
              </th>
            </tr>
            <tr>
              <th className="tableHeading"> b.</th>
              <th className="tableHeadingLeft">
                {" "}
                Has the policy been approved by the Board?
              </th>
              <th className="tableHeadingLeft">
                <Row>
                  <Col xs={5} md={5} className="ml-1">
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input type="radio" name="y" value="Yes" />
                        Yes, policy has been approved by the board
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs={5} md={5}>
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input type="radio" name="n" value="No" />
                        No, policy has not been approved by the board
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </th>
            </tr>
            <tr>
              <th className="tableHeading"> c.</th>
              <th className="tableHeadingLeft">
                {" "}
                Web Link of the Policies, if available
              </th>
              <th className="tableHeadingLeft">
                <Input
                  type="text"
                  className="input"
                  name="website"
                  placeholder="Text here..."
                  onChange={(e) => {
                    if(!RegEx.website.test(e.target.value) && e.target.value.length > 0){
                      setWebErr(true);
                    }else{
                      setWebErr(false);
                      handlePolicy(e)
                    }
                  }}
                  invalid={webErr}
                />
                <FormFeedback> Please enter valid website name. </FormFeedback>
                
              </th>
            </tr>
  
            <tr>
              <th className="tableHeading"> 2.</th>
              <th className="tableHeadingLeft">
                {" "}
                Whether the entity has translated the policy into procedures.
              </th>
              <th className="tableHeadingLeft">
                <Row>
                  <Col xs={5} md={5} className="ml-1">
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input type="radio" name="y" value="Yes" />
                        Yes, the entity has translated the policy into procedures
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs={5} md={5}>
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input type="radio" name="n" value="No" />
                        No, the entity has translated the policy into procedures
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </th>
            </tr>
  
            <tr>
              <th className="tableHeading"> 3.</th>
              <th className="tableHeadingLeft">
                {" "}
                Do the enlisted policies extend to your value chain partners?
              </th>
              <th className="tableHeadingLeft">
                <Row>
                  <Col xs={5} md={5} className="ml-1">
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input type="radio" name="y" value="Yes" />
                        Yes, the enlisted policies extend to our value chain
                        partners
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col xs={5} md={5}>
                    <FormGroup check className="mt-1">
                      <Label check>
                        <Input type="radio" name="n" value="No" />
                        No, the enlisted policies extend to our value chain
                        partners
                      </Label>
                    </FormGroup>
                  </Col>
                </Row>
              </th>
            </tr>
  
            <tr>
              <th className="tableHeading"> 4.</th>
              <th className="tableHeadingLeft">
                {" "}
                Name of the national and international codes / certifications /
                labels / standards
              </th>
              <th className="tableHeadingLeft">
                <Input
                  type="text"
                  className="input"
                  name="cclsNames"
                  placeholder="Text here..."
                  onChange={(e) => {
                    if(e.target.value === "" || e.target.value === " "){
                      setCclsNameErr(true);
                    }else{
                      setCclsNameErr(false);
                      handlePolicy(e)
                    }
                  }}
                  invalid={cclsNameErr}
                />
                <FormFeedback> Please enter valid Codes / Certifications etc. </FormFeedback>
              </th>
            </tr>
            <tr>
              <th className="tableHeading"> 5.</th>
              <th className="tableHeadingLeft">
                {" "}
                Specific commitments, goals and targets set by the entity
              </th>
              <th className="tableHeadingLeft">
                <Input
                  type="text"
                  className="input"
                  name="commitments"
                  placeholder="Text here..."
                  onChange={(e) => {
                    if(e.target.value === "" || e.target.value === " "){
                      setCommit(true);
                    }else{
                      setCommit(false);
                      handlePolicy(e)
                    }
                  }}
                  invalid={commit}
                />
                <FormFeedback> Please enter valid commitments. </FormFeedback>
                
              </th>
            </tr>
  
            <tr>
              <th className="tableHeading"> 6.</th>
              <th className="tableHeadingLeft">
                {" "}
                Performance of the entity against the specific commitments,
              </th>
              <th className="tableHeadingLeft">
                <Input
                  type="number"
                  className="input"
                  name="performance"
                  placeholder="Performance Score..."
                  onChange={(e) => {
                    if(e.target.value <= 0 || e.target.value > 100){
                      setPerformanceErr(true);
                    }else{
                      setPerformanceErr(false);
                      handlePolicy(e)
                    }
                  }}
                  invalid={performanceErr}
                />
                <FormFeedback> Please enter valid performance score. </FormFeedback>
                
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
          {!isEditable && (
            <>
              <Button
                id="edit0"
                className="mt-4 mb-4 mr-3"
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
                // onClick={() => saveCurrentFYData()}
              >
                {isLoading ? (
                  <div
                    class="spinner-border spinner-border-sm text-light"
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
  
          <h4
            style={{ color: "#2B8CD6", fontSize: 20, padding: 16, paddingTop: 32, paddingLeft: 0 }}
          >
            10. Details of Review of NGRBCs by the Company
            {" "}
          </h4>
  
          <Table
              dark
              size="sm"
              className="text-center"
              bordered
              style={{ borderColor: "#2E3439" }}
          >
              <thead>
                  <tr>
                      <th className="tableHeading">
                      {" "}
                      Subject for Review
                      </th>
                      <th className="tableHeading" >
                      Indicate whether review was undertaken by Director / Committee of the Board/ Any other Committee
                      </th>
                      <th className="tableHeading">
                      Frequency (Annually/ Half yearly/ Quarterly/ Any other – please specify)
                      </th>
                  </tr>
              </thead>
              <tbody>
              <tr>
                  <th className="tableHeadingLeft">Performance against above policies and follow up action</th>
                  <th className="tableHeading">
                      <FormGroup className="m-0">
                          <select className="select">
                          <option>Select...</option>
                              <option>Director</option>
                              <option>Committee of the Board</option>
                              <option>Any other Committee</option>
                          </select>
                      </FormGroup>
                  </th>
                  <th className="tableHeading">
                      <FormGroup className="m-0">
                          <select className="select">
                          <option>Select...</option>
                              <option>Annually</option>
                              <option>Half yearly</option>
                              <option>Quarterly</option>
                              <option>Others</option>
                          </select>
                      </FormGroup>
                  </th>
              </tr>
              <tr>
                  <th className="tableHeadingLeft">Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances</th>
                  <th className="tableHeading">
                      <FormGroup className="m-0">
                          <select className="select">
                          <option>Select...</option>
                              <option>Director</option>
                              <option>Committee of the Board</option>
                              <option>Any other Committee</option>
                          </select>
                      </FormGroup>
                  </th>
                  <th className="tableHeading">
                      <FormGroup className="m-0">
                          <select className="select">
                          <option>Select...</option>
                              <option>Annually</option>
                              <option>Half yearly</option>
                              <option>Quarterly</option>
                              <option>Others</option>
                          </select>
                      </FormGroup>
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
          {!isEditable && (
            <>
              <Button
                id="edit0"
                className="mt-4 mb-4 mr-3"
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
                // onClick={() => saveCurrentFYData()}
              >
                {isLoading ? (
                  <div
                    class="spinner-border spinner-border-sm text-light"
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
  
  
          <h4
            style={{ color: "#2B8CD6", fontSize: 20, padding: 16, paddingTop: 32, paddingLeft: 0 }}
          >
            11. Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency?. If yes, provide name of the agency
            {" "}
          </h4>
  
          <Row className="mb-4">
              <Col xs={2} md={2} className="ml-1">
                  <FormGroup check className="mt-1">
                      <Label check className="label">
                          <Input type="radio" name="y" value="Yes" onChange={() => setShowAgencyIpt(true)} />
                          Yes
                      </Label>
                  </FormGroup>
              </Col>
              <Col xs={2} md={2}>
                  <FormGroup check className="mt-1">
                      <Label check  className="label">
                          <Input type="radio" name="n" value="No" onChange={() => setShowAgencyIpt(false)}/>
                          No
                      </Label>
                  </FormGroup>
              </Col>
          </Row>
  
        {
          showAgencyIpt &&
          <Row className="mb-4">
              <Input
                  type="text"
                  className="input"
                  name="agencyName"
                  placeholder="Text here..."
                  onChange={(e) => {
                    if(e.target.value === "" || e.target.value === " "){
                      setAgencyNameerr(true);
                    }else{
                      setAgencyNameerr(false);
                      setAgencyName(e.target.value)
                    }
                  }}
                  invalid={agencyNameErr}
                />
                <FormFeedback> Please enter valid agencyName. </FormFeedback>
              
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
          {!isEditable && (
            <>
              <Button
                id="edit0"
                className="mt-4 mb-4 mr-3"
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
                // onClick={() => saveCurrentFYData()}
              >
                {isLoading ? (
                  <div
                    class="spinner-border spinner-border-sm text-light"
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
  
        <h4
            style={{ color: "#2B8CD6", fontSize: 20, padding: 16, paddingTop: 32, paddingLeft: 0 }}
          >
            12. If answer to question (1) in Policy & Management Process is “No” i.e. not all Principles are covered by a policy, reasons to be stated
            {" "}
          </h4>
  
          <Table
              dark
              size="sm"
              className="text-center"
              bordered
              style={{ borderColor: "#2E3439" }}
          >
              <thead>
                  <tr>
                     
                      <th className="tableHeading" >
                      Questions
                      </th>
                      <th className="tableHeading">
                          {principleName}{" "}
                          <span id="cat9" style={{ color: "green" }}>
                              {" "}
                              <HiOutlineInformationCircle size={20} color="#fff" />
                          </span>
                          <TooltipComp
                              message={
                              principleDesc
                              }
                              openTooltipN={0}
                              target="cat9"
                          />
                      </th>
                  </tr>
              </thead>
              <tbody>
              <tr>
                  <th className="tableHeadingLeft" style={{ color: "#fcdb0a" }}>The company does not consider the Principles material to its business </th>
                  <th className="tableHeadingLeft">
                      <Row>
                          <Col xs={5} md={5} className="ml-1">
                          <FormGroup check className="mt-1">
                              <Label check>
                              <Input type="radio" name="y" value="Yes" />
                              Yes, the company does not consider the Principles material
                              </Label>
                          </FormGroup>
                          </Col>
                          <Col xs={5} md={5}>
                          <FormGroup check className="mt-1">
                              <Label check>
                              <Input type="radio" name="n" value="No" />
                              No, the company does consider the Principles material
                              </Label>
                          </FormGroup>
                          </Col>
                      </Row>
                  </th>
              </tr>
              <tr>
                  <th className="tableHeadingLeft">The entity is not at a stage where it is in a position to formulate and implement the policies on specified principles</th>
                  <th className="tableHeadingLeft">
                      <Row>
                          <Col xs={5} md={5} className="ml-1">
                          <FormGroup check className="mt-1">
                              <Label check>
                              <Input type="radio" name="y" value="Yes" />
                              Yes, entity is not at a stage to formulate or implement policies
                              </Label>
                          </FormGroup>
                          </Col>
                          <Col xs={5} md={5}>
                          <FormGroup check className="mt-1">
                              <Label check>
                              <Input type="radio" name="n" value="No" />
                              No, entity is at a stage to formulate or implement policies
                              </Label>
                          </FormGroup>
                          </Col>
                      </Row>
                  </th>
              </tr>
              <tr>
                  
                  <th className="tableHeadingLeft">The entity does not have the financial or/human and technical resources available for the task</th>
                  <th className="tableHeadingLeft">
                      <Row>
                          <Col xs={5} md={5} className="ml-1">
                          <FormGroup check className="mt-1">
                              <Label check>
                              <Input type="radio" name="y" value="Yes" />
                              Yes, entity does not have the financial and technical resources
                              </Label>
                          </FormGroup>
                          </Col>
                          <Col xs={5} md={5}>
                          <FormGroup check className="mt-1">
                              <Label check>
                              <Input type="radio" name="n" value="No" />
                              No, entity does have the financial and technical resources
                              </Label>
                          </FormGroup>
                          </Col>
                      </Row>
                  </th>
              </tr>
              <tr>
                  
                  <th className="tableHeadingLeft">It is planned to be done in the next financial year</th>
                  <th className="tableHeadingLeft">
                      <Row>
                          <Col xs={5} md={5} className="ml-1">
                          <FormGroup check className="mt-1">
                              <Label check>
                              <Input type="radio" name="y" value="Yes" />
                              Yes, it is planned to be done in the next FY
                              </Label>
                          </FormGroup>
                          </Col>
                          <Col xs={5} md={5}>
                          <FormGroup check className="mt-1">
                              <Label check>
                              <Input type="radio" name="n" value="No" />
                              No, it is not planned yet
                              </Label>
                          </FormGroup>
                          </Col>
                      </Row>
                  </th>
              </tr>
              <tr>
                  
                  <th className="tableHeadingLeft">Any other reason (please specify) </th>
                  <th className="tableHeadingLeft">
                      <Input
                          type="text"
                          className="input"
                          name="mainActivityDesc"
                          placeholder="Text here..."
                      />
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
          {!isEditable && (
            <>
              <Button
                id="edit0"
                className="mt-4 mb-4 mr-3"
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
                // onClick={() => saveCurrentFYData()}
              >
                {isLoading ? (
                  <div
                    class="spinner-border spinner-border-sm text-light"
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
  
      </div>
    );
  }

export default PrincipleContent
