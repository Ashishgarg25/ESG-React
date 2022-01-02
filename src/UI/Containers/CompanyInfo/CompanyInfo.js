import React, { useState, useEffect } from "react";
import "../../../assets/css/styles.css";
import { Link, useLocation } from "react-router-dom";
import UploadData from "../../Component/SebiForm/SectionA/UploadData/UploadData";

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
} from "reactstrap";

const CompanyInfo = ({ match, siteData, setSiteData, callApi }) => {
  const { id } = match.params;
  // const thisPageData = siteData
  siteData["comp" + id] = siteData["comp" + id] ? siteData["comp" + id] : {};
  useEffect(() => {
    callApi(
      "entity/details",
      "GET",
      { entityId: id },
      siteData["comp" + id],
      (data) => {
        console.log(data);
      }
    );
  }, [id]);
  // const [ modalVisible, setModalVisible ] = useState(false)

  // const toggle = () => {
  //     setModalVisible(!modalVisible)
  // }

  // useEffect(() => {
  //     setModalVisible(true)
  // },[])

  return (
    <div className="wrapperBody">
      {siteData["comp" + id].response && (
        <UploadData siteDataObj={{ siteData, setSiteData }} />
      )}
      {/* CHOOSE FORM MODAL */}
      {/* <Modal
                backdrop="static"
                isOpen={modalVisible}
                toggle={toggle}
                className="modalContainer chooseModal"
            >
                <ModalHeader  className="modalHead" >Please choose form to be filled </ModalHeader>
                <ModalBody className="modalBody">
                    <div className="d-flex justify-content-evenly align-items-center pb-3">
                        <Button
                            outline
                            className="p-3 mt-4"
                            color="primary"
                            style={{ width: 200 }}
                            onClick={() => setModalVisible(false)}
                        >
                            SEBI FORM
                        </Button>
                        <Button
                        outline
                            className="p-3 mt-4"
                            color="warning"
                            style={{ width: 200 }}
                            onClick={() => setModalVisible(false)}
                        >
                            SEBI & MCA FORM
                        </Button>
                    </div>
                </ModalBody>
            </Modal> */}
    </div>
  );
};

export default CompanyInfo;
