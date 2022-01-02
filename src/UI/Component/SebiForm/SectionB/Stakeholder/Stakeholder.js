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

function Stakeholder() {

  const [ comChannels, setComChanels ] = useState("");
  const [ infoChannels, setInfoChannels ] = useState("")

  const [ processErr, setProcessErr ] = useState(false);
  const [ process, setProcess ] = useState("");

  const [ otherCommunicateErr, setOtherCommunicateErr ] = useState(false);
  const [ otherCommunicate, setOtherCommunicate ] = useState("");

  const [ otherInfoErr, setOtherInfoErr ] = useState(false)
  const [ otherInfo, setOtherInfo ] = useState("")

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
        <span className="breadCrumbActive"> Stakeholder </span>
      </div>

      <h2 className="heading" style={{ color: "#fcdb0a" }}>
        Stakeholder Engagement
      </h2>

      <Row className="">
        <Col xs={12} md={12}>
          <FormGroup className="mt-1">
            <Label className="label">
              9. Describe the process of identifying key stakeholder groups of the
              company
            </Label>
            <Input 
            type="textarea" 
            rows={3} className="input" 
            placeholder="Describe the process..." 
            onChange={(e) => {
              if(e.target.value === "" || e.target.value === " "){
                setProcessErr(true);
              }else{
                setProcessErr(false);
                setProcess(e.target.value)
              }
            }}
            invalid={processErr}
          />
          <FormFeedback> Please enter valid process description. </FormFeedback>
           
          </FormGroup>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={6} md={6}>
          <FormGroup className="mt-1">
            <Label className="label">
              10. Mention the channels to communicate to stakeholders, features of
              your policies, procedures, decisions and performance that impact
              them.
            </Label>
            <select className="select" onChange={(e) => setComChanels(e.target.value)}>
              <option>Email</option>
              <option>SMS</option>
              <option>Newspaper</option>
              <option>Phamplets</option>
              <option>Advertisement</option>
              <option>Community Meetings</option>
              <option>Notice Board</option>
              <option>Website</option>
              <option value="Others">Others</option>
            </select>
            {
              comChannels === "Others" &&
                <>
                  <Input
                    type="text"
                    className="input mt-2"
                    name="mainActivityDesc"
                    placeholder="Please Specify"
                    onChange={(e) => {
                      if(e.target.value === "" || e.target.value === " "){
                        setOtherCommunicateErr(true);
                      }else{
                        setOtherCommunicateErr(false);
                        setOtherCommunicate(e.target.value)
                      }
                    }}
                    invalid={otherCommunicateErr}
                  />
                  <FormFeedback> Please enter valid stakeholder communication channel. </FormFeedback>  
                </>
                
            }
          </FormGroup>
        </Col>
        <Col xs={6} md={6}>
          <FormGroup check className="mt-1">
            <Label className="label">
              11. What are the channels through which stakeholders can access
              information about the company on issues relevant to them?
            </Label>
            <select className="select" onChange={(e) => setInfoChannels(e.target.value)}>
              <option>Email</option>
              <option>SMS</option>
              <option>Newspaper</option>
              <option>Phamplets</option>
              <option>Advertisement</option>
              <option>Community Meetings</option>
              <option>Notice Board</option>
              <option>Website</option>
              <option value="Others">Others</option>
            </select>
            {
              infoChannels === "Others" &&
                <>
                  <Input
                    type="text"
                    className="input mt-2"
                    name="mainActivityDesc"
                    placeholder="Please Specify"
                    onChange={(e) => {
                      if(e.target.value === "" || e.target.value === " "){
                        setOtherInfoErr(true);
                      }else{
                        setOtherInfoErr(false);
                        setOtherInfo(e.target.value)
                      }
                    }}
                    invalid={otherInfoErr}
                  />
                  <FormFeedback> Please enter valid stakeholder information channel. </FormFeedback> 
                </> 
                
            }
          </FormGroup>
        </Col>
      </Row>

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

export default Stakeholder;
