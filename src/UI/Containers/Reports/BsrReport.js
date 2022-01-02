import React, { useState, useEffect } from "react";
import "../../../assets/css/styles.css";
import styles from "./bsr.module.css";
import { Link, useLocation } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import jsPDF from "jspdf";
// const doc = new jsPDF();
import domToPdf from 'react-dom-to-pdf';
import {
    HiDownload
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
} from "reactstrap";
import Pdf from "react-to-pdf";
import axios from "axios";
import { apiUrl } from "../../../config/config";
import { getToken } from "../../../utils/LocalStorage/LocalStorage";
import { useParams } from "react-router";

function BsrReport() {

    const { reportId } = useParams();
    const token = getToken() || "";
    const config = {
        headers: {
        token: token,
        "Content-type": "application/json",
        },
    };

    const [ allData, setAllData ] = useState();

    useEffect(() => {
        getAllData();
    },[])

    const getAllData = async() => {
        const reportData = await axios.get(`${apiUrl}report?entityId=${reportId}`, config)
        try{
            if(reportData.data.code === 200){
                console.log(reportData.data.data);
                setAllData(reportData.data.data)
            }
        }catch(e){
            console.log(e)
        }
    }

    const doc = new jsPDF();
    const ref = React.createRef();
    const [downloading, setDownloading] = useState(0);
    
    function savePDF1(){
        if(!downloading){
            console.log("clicked");
            setDownloading(1);
            const options = {
                filename: "Report.pdf",
                overrideWidth: 1100,
                margin: [20, 20, 20, 20]
            };
            const element = document.querySelector('.'+styles.wrapperContent);
            setTimeout(() => {
                return domToPdf(element, options, () => {
                    // callback function
                    setTimeout(() => {
                        setDownloading(0);
                    }, 1000);
                });
            }, 500);
        }
    }

  return (
    <>
        {/* <Pdf targetRef={ref} filename="BSR-Report.pdf">
            {({ toPdf }) => <button className="mt-5" onClick={toPdf}>Generate Pdf</button>}
        </Pdf> */}
        {/* <div style={{"margin-top": '70px'}}>
            <Button disabled={downloading} className="" onClick={savePDF1}>{downloading ? "Please wait..." : "Generate Pdf"}</Button>
        </div> */}
        <div 
            disabled={downloading}
            style={{
                pointerEvents: downloading ? "none" : "all",
                position: "absolute", 
                right: 48, 
                bottom: 64, 
                backgroundColor: "#2b8cd6", 
                borderRadius: '50%', 
                padding: 10, 
                "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", 
                cursor: "pointer"
            }}
            onClick={savePDF1}
        >
            {
                !downloading ?
                    <HiDownload color="#fff" size={32} />
                :
                    <div class="spinner-border text-light" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
            }
            
        </div>
        <div ref={ref} className={styles.wrapperContent}>
            <div className={styles.wrapper}>
                <Label className={styles.heading}>
                    SECTION A: GENERAL DISCLOSURES
                </Label>
                {/* <div className={styles.border} /> */}
            </div>

            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Table
                className="text-center mt-3"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <tbody>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    1
                    </td>
                    <td className={styles.tableBodyContent} style={{ width: "36rem" }}>
                    Corporate Identity Number (CIN) of the Company
                    </td>
                    <td className={styles.tableBodyDesc}>{allData?.compInfo?.corpId}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    2
                    </td>
                    <td className={styles.tableBodyContent}>Name of the Company</td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.companyName}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    3
                    </td>
                    <td className={styles.tableBodyContent}>
                    Year of Incorporation
                    </td>
                    <td className={styles.tableBodyDesc}>{allData?.compInfo?.incorporationYear}</td>
                </tr>
                
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    4
                    </td>
                    <td className={styles.tableBodyContent}>
                    Registered office address
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {`${allData?.compInfo?.officeAddress} ${allData?.compInfo?.officeCity} ${allData?.compInfo?.officeState} ${allData?.compInfo?.officePincode}`} 
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    5
                    </td>
                    <td className={styles.tableBodyContent}>
                    Registered office address
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {`${allData?.compInfo?.corpAddress} ${allData?.compInfo?.corpCity} ${allData?.compInfo?.corpState} ${allData?.compInfo?.corpPincode}`}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    6
                    </td>
                    <td className={styles.tableBodyContent}>
                    Email
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.compEmail}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    7
                    </td>
                    <td className={styles.tableBodyContent}>
                    Telephone
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.compPhone}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    8
                    </td>
                    <td className={styles.tableBodyContent}>
                    Website
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.website}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    9
                    </td>
                    <td className={styles.tableBodyContent}>
                    Financial year for which reporting is being done
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.financialYear}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    10
                    </td>
                    <td className={styles.tableBodyContent}>
                    Name of the Stock Exchange(s) where shares are listed
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.stockExchange.map(item => {
                        return item;
                    })}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    11
                    </td>
                    <td className={styles.tableBodyContent}>
                    Paid-up capital
                    </td>
                    <td className={styles.tableBodyDesc}>
                    ₹ {allData?.compInfo?.paidUpCapital}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    12
                    </td>
                    <td className={styles.tableBodyContent}>
                    Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report

                    </td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.name}<br/>
                    E-mail id - {allData?.compInfo?.email}<br/>
                    Telephone number - {allData?.compInfo?.paidUpCapital}
                    
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    13
                    </td>
                    <td className={styles.tableBodyContent}>
                    Reporting boundary
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.reportingBoundary}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyContent}
                    style={{ textAlign: "center" }}
                    >
                    M 13
                    </td>
                    <td className={styles.tableBodyContent}>
                    Authorized Capital
                    </td>
                    <td className={styles.tableBodyDesc}>
                    {allData?.compInfo?.authorizedCapital}
                    </td>
                </tr>
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;II.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Product
                & Services&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>
                14. &nbsp;&nbsp; Details of Business Activity
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>
                    Discription of Main Activity
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Discription of Business Activity
                    </th>
                    <th className={styles.tableBodyContent1}>% of Turnover</th>
                    <th className={styles.tableBodyContent1}>
                    Discription of Main Activity Group Code
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Discription of Business Activity Group Code
                    </th>
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.prodctAndService.buisnsAct.data.map((item, idx) => (
                            <tr className={styles.tableRow}>
                                <td className={styles.tableBodyDesc1}>{idx + 1}</td>
                                <td className={styles.tableBodyDesc1}>
                                {item.discMainActivity}
                                </td>
                                <td className={styles.tableBodyDesc1}>
                                {item.discBusinessActivity}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.turnover}</td>
                                <td className={styles.tableBodyDesc1}>
                                {item.mca_mainActivityCode}
                                </td>
                                <td className={styles.tableBodyDesc1}>
                                {item.mca_mainBusinessCode}
                                </td>
                            </tr>
                        ))
                    }
                
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>
                15. &nbsp;&nbsp; Products/services sold by the entity
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>Product/Service</th>
                    <th className={styles.tableBodyContent1}>NIC Code</th>
                    <th className={styles.tableBodyContent1}>
                    % of total turn over contributed
                    </th>
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.prodctAndService.prodServc.data.map((item, idx) => (
                            <tr className={styles.tableRow}>
                                <td className={styles.tableBodyDesc1}>{idx + 1}</td>
                                <td
                                className={styles.tableBodyDesc1}
                                style={{ textAlign: "left" }}
                                >
                                {item.productName}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.nicCode}</td>
                                <td className={styles.tableBodyDesc1}>{item.turnover}</td>
                                
                            </tr>
                        ))
                    }

                
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;III.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Operations&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>
                16. &nbsp;&nbsp; Number of locations where plants and/or
                operations/offices of the entity are situated
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Location</th>
                    <th className={styles.tableBodyContent1}>No. of Plants</th>
                    <th className={styles.tableBodyContent1}>No. of Offices</th>
                    <th className={styles.tableBodyContent1}>Total</th>
                </tr>
                </thead>
                <tbody>

                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyDesc}
                    style={{ fontWeight: "bold" }}
                    >
                    National
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    {allData?.operation.noOfLoc.noOfPlantsNational}
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    {allData?.operation.noOfLoc.noOfOfficesNational}
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    {allData?.operation.noOfLoc.totalNational}
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyDesc}
                    style={{ fontWeight: "bold" }}
                    >
                    International
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    {allData?.operation.noOfLoc.noOfPlantsInternational}
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    {allData?.operation.noOfLoc.noOfOfficesInternational}
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    {allData?.operation.noOfLoc.totalInternational}
                    </td>
                </tr>
                </tbody>
            </Table>
            {/* <h6 style={{ fontWeight: "normal", fontStyle: "italic" }}>
                * The Corporation is a Non-Banking Financial Company - Housing
                Finance Company (NBFC-HFC) and hence does not undertake any
                manufacturing activity.
            </h6>
            <h6 style={{ fontWeight: "normal", fontStyle: "italic" }}>
                <sup style={{ fontSize: 10, color: "#000" }}>#</sup> Includes
                outlets of HDFC Sales Private Limited, which is a wholly owned
                subsidiary of the Corporation
            </h6> */}
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>
                17. &nbsp;&nbsp; Markets served by entity
            </Label>{" "}
            <br />
            <Label className={styles.label}>
                a. &nbsp;&nbsp; Number of Locations
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Location</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>
                    National (No. of States)
                    </td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.markServd.nationalCount}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>
                    International (No. of Countries)
                    </td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.markServd.internationalCount}</td>
                </tr>
                </tbody>
            </Table>
            

            <Label className={styles.label}>
                {" "}
                &nbsp;&nbsp; Location of top 3 plants by contribution to Turnover -
                National
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Market (State)</th>
                    <th className={styles.tableBodyContent1}>Turnover</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktNational.loc1.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktNational.loc1.turnover}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktNational.loc2.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktNational.loc2.turnover}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktNational.loc3.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktNational.loc3.turnover}</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                {" "}
                &nbsp;&nbsp; Location of top 3 plants by contribution to Turnover -
                International
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Country</th>
                    <th className={styles.tableBodyContent1}>Turnover</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktInternational.loc1.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktInternational.loc1.turnover}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktInternational.loc2.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktInternational.loc2.turnover}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktInternational.loc3.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topMarktInternational.loc3.turnover}</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                b. &nbsp;&nbsp; What is the contribution of exports as a percentage
                of the total turnover of the entity?
            </Label>{" "}
            <br />
            <Label className={styles.tableBodyDesc} style={{ paddingLeft: 32 }}>
                {" "}
                {allData?.operation.entTurnover.nationalCount}
            </Label>{" "}
            <br />
            <Label className={styles.label}>
                c. &nbsp;&nbsp; A brief on types of customers
            </Label>{" "}
            <br />
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>Customer Type</th>
                    <th className={styles.tableBodyContent1}>Brief on Customer</th>
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.operation.custType !== undefined && allData?.operation.custType.map((item, idx) => (
                            <tr className={styles.tableRow}>
                                <td className={styles.tableBodyDesc1}>{idx + 1}</td>
                                <td className={styles.tableBodyDesc1}>{ item.consumerType }</td>
                                <td className={styles.tableBodyDesc1}>{item.briefOnConsumer}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
            <Label className={styles.label}>
                {" "}
                &nbsp;&nbsp; Location of top 3 Plants / Offices
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>State</th>
                    <th className={styles.tableBodyContent1}>Turnover</th>
                    <th className={styles.tableBodyContent1}>District</th>
                    <th className={styles.tableBodyContent1}>Category A </th>
                    <th className={styles.tableBodyContent1}>Category B </th>
                    <th className={styles.tableBodyContent1}>Category C </th>
                    <th className={styles.tableBodyContent1}>Category D </th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc1.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc1.turnover}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc1.district}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc1.categoryA}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc1.categoryB}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc1.categoryC}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc1.categoryD}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc2.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc2.turnover}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc2.district}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc2.categoryA}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc2.categoryB}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc2.categoryC}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc2.categoryD}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc3.locName}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc3.turnover}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc3.district}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc3.categoryA}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc3.categoryB}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc3.categoryC}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntNational.loc3.categoryD}</td>
                </tr>
                </tbody>
            </Table>
            <h6 style={{ fontWeight: "normal", fontStyle: "italic" }}>
                <span style={{ fontSize: 14, color: "#000", fontWeight: "bold" }}>
                Category A:
                </span>{" "}
                In or within 50 km of protected areas like National Parks, Wild life
                Sanctuaries, Biosphere Reserves, Wetlands, etc
            </h6>
            <h6 style={{ fontWeight: "normal", fontStyle: "italic" }}>
                <span style={{ fontSize: 14, color: "#000", fontWeight: "bold" }}>
                Category B:
                </span>{" "}
                In or within 50 km of Biodiversity Hotspots
            </h6>
            <h6 style={{ fontWeight: "normal", fontStyle: "italic" }}>
                <span style={{ fontSize: 14, color: "#000", fontWeight: "bold" }}>
                Category C:
                </span>{" "}
                In high water-stressed zones defined as “Over-exploited” or
                “critical” by the Central Groundwater Board
            </h6>
            <h6 style={{ fontWeight: "normal", fontStyle: "italic" }}>
                <span style={{ fontSize: 14, color: "#000", fontWeight: "bold" }}>
                Category D:
                </span>{" "}
                Within Coastal Regulation Zones
            </h6>
            <Label className={styles.label}>
                {" "}
                &nbsp;&nbsp; Location of top 3 Plants / Offices
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Country</th>
                    <th className={styles.tableBodyContent1}>Turnover</th>
                </tr>
                </thead>
                <tbody>
                    <tr className={styles.tableRow}>
                        <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntInternational.loc1.locName}</td>
                        <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntInternational.loc1.turnover}</td>
                    </tr>
                    <tr className={styles.tableRow}>
                        <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntInternational.loc2.locName}</td>
                        <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntInternational.loc2.turnover}</td>
                    </tr>
                    <tr className={styles.tableRow}>
                        <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntInternational.loc3.locName}</td>
                        <td className={styles.tableBodyDesc1}>{allData?.operation.topPlntInternational.loc3.turnover}</td>
                    </tr>
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IV.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Employees&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>
                18. &nbsp;&nbsp; Details as at March 31, 2021
            </Label>{" "}
            <br />
            <Label className={styles.label}>
                a. &nbsp;&nbsp; Employees (including differently abled)
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    S.No.
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Particulars
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Total
                    </th>

                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Male
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Female
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Others
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>1</td>
                    <td className={styles.tableBodyDesc1}>Permanent</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.permanent.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.permanent.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.permanent.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.permanent.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.permanent.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.permanent.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.permanent.otherPercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>2</td>
                    <td className={styles.tableBodyDesc1}>Other than Permanent</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.otpermanent.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.otpermanent.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.otpermanent.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.otpermanent.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.otpermanent.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.otpermanent.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.otpermanent.otherPercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>3</td>
                    <td className={styles.tableBodyDesc1}>Total</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.total.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.total.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.total.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.total.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.total.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.total.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employAll.total.otherPercent}</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                &nbsp;&nbsp; Differently abled employees
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    S.No.
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Particulars
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Total
                    </th>

                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Male
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Female
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Others
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>1</td>
                    <td className={styles.tableBodyDesc1}>Permanent</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.permanent.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.permanent.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.permanent.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.permanent.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.permanent.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.permanent.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.permanent.otherPercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>2</td>
                    <td className={styles.tableBodyDesc1}>Other than Permanent</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.otpermanent.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.otpermanent.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.otpermanent.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.otpermanent.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.otpermanent.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.otpermanent.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.otpermanent.otherPercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>3</td>
                    <td className={styles.tableBodyDesc1}>Total</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.total.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.total.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.total.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.total.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.total.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.total.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.employDifAbld.total.otherPercent}</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                b. &nbsp;&nbsp; Workers (including differently abled)
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    S.No.
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Particulars
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Total
                    </th>

                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Male
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Female
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Others
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>1</td>
                    <td className={styles.tableBodyDesc1}>Permanent</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.permanent.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.permanent.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.permanent.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.permanent.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.permanent.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.permanent.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.permanent.otherPercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>2</td>
                    <td className={styles.tableBodyDesc1}>Other than Permanent</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.otpermanent.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.otpermanent.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.otpermanent.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.otpermanent.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.otpermanent.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.otpermanent.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.otpermanent.otherPercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>3</td>
                    <td className={styles.tableBodyDesc1}>Total</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.total.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.total.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.total.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.total.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.total.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.total.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerAll.total.otherPercent}</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                &nbsp;&nbsp; Differently abled workers
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    S.No.
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Particulars
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Total
                    </th>

                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Male
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Female
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Others
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>1</td>
                    <td className={styles.tableBodyDesc1}>Permanent</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.permanent.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.permanent.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.permanent.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.permanent.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.permanent.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.permanent.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.permanent.otherPercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>2</td>
                    <td className={styles.tableBodyDesc1}>Other than Permanent</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.otpermanent.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.otpermanent.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.otpermanent.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.otpermanent.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.otpermanent.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.otpermanent.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.otpermanent.otherPercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>3</td>
                    <td className={styles.tableBodyDesc1}>Total</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.total.total}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.total.male}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.total.malePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.total.female}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.total.femalePercent}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.total.other}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.workerDifAbld.total.otherPercent}</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                19. &nbsp;&nbsp; Women Representation
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}></th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Total
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Females
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>Board of Directors</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.womenReprsnt.bod.bkCount}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.womenReprsnt.bod.bkFemaleCount}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.womenReprsnt.bod.femalePercent}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>
                    Key Management Personel
                    </td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.womenReprsnt.kmp.bkCount}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.womenReprsnt.kmp.bkFemaleCount}</td>
                    <td className={styles.tableBodyDesc1}>{allData?.employee.womenReprsnt.kmp.femalePercent}</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                &nbsp;&nbsp; Women Representation (including differently abled)
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}></th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Total
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    No. of Females (including differently abled)
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    No. of females who are differently abled persons
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>Board of Directors</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.bod.bkCount }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.bod.bkFemaleCount }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.bod.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.bod.bkFemaleCountDifferentlyAbled }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.bod.femaleDifferentlyAbledPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>
                    Key Management Personel
                    </td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.kmp.bkCount }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.kmp.bkFemaleCount }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.kmp.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.kmp.bkFemaleCountDifferentlyAbled }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.pirWomn.kmp.femaleDifferentlyAbledPercent }</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                20. &nbsp;&nbsp; Turnover rate for permanent employees and workers
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}></th>
                    <th className={styles.tableBodyContent1} colSpan={3}>
                    FY (Turnover rate in current FY)
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={3}>
                    FY (Turnover rate in previous FY)
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={3}>
                    FY (Turnover rate in year prior to prev FY)
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Male</th>
                    <th className={styles.tableBodyContent1}>Female</th>
                    <th className={styles.tableBodyContent1}>Total</th>
                    <th className={styles.tableBodyContent1}>Male</th>
                    <th className={styles.tableBodyContent1}>Female</th>
                    <th className={styles.tableBodyContent1}>Total</th>
                    <th className={styles.tableBodyContent1}>Male</th>
                    <th className={styles.tableBodyContent1}>Female</th>
                    <th className={styles.tableBodyContent1}>Total</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>Employes</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyCurrent.employees.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyCurrent.employees.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyCurrent.employees.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPrev.employees.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPrev.employees.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPrev.employees.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPriPrev.employees.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPriPrev.employees.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPriPrev.employees.total }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>
                    Workers
                    </td>
                    <td className={styles.tableBodyDesc1}>Employes</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyCurrent.workers.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyCurrent.workers.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyCurrent.workers.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPrev.workers.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPrev.workers.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPrev.workers.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPriPrev.workers.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPriPrev.workers.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.ternovrPermnt.fyPriPrev.workers.total }</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                e. &nbsp;&nbsp; Workmen (including differently abled)
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    S.No.
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Particulars
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Total
                    </th>

                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Male
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Female
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Others
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyContent1}>1</td>
                    <td className={styles.tableBodyContent1}>Permanent</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.total.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.total.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.total.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.total.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.total.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.total.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.total.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>a</td>
                    <td className={styles.tableBodyDesc1}>Unskilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.unSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.unSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.unSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.unSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.unSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.unSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.unSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>b</td>
                    <td className={styles.tableBodyDesc1}>Semi-Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.semiSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.semiSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.semiSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.semiSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.semiSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.semiSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.semiSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>c</td>
                    <td className={styles.tableBodyDesc1}>Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.skilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.skilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.skilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.skilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.skilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.skilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.skilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>d</td>
                    <td className={styles.tableBodyDesc1}>Highly Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.highSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.highSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.highSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.highSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.highSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.highSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.permanent.highSkilled.otherPercent }</td>
                </tr>

                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyContent1}>2</td>
                    <td className={styles.tableBodyContent1}>Other than Permanent</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.total.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.total.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.total.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.total.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.total.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.total.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.total.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>a</td>
                    <td className={styles.tableBodyDesc1}>Unskilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.unSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.unSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.unSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.unSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.unSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.unSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.unSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>b</td>
                    <td className={styles.tableBodyDesc1}>Semi-Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.semiSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.semiSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.semiSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.semiSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.semiSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.semiSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.semiSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>c</td>
                    <td className={styles.tableBodyDesc1}>Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.skilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.skilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.skilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.skilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.skilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.skilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.skilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>d</td>
                    <td className={styles.tableBodyDesc1}>Highly Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.highSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.highSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.highSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.highSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.highSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.highSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.otpermanent.highSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyContent1}>3</td>
                    <td className={styles.tableBodyContent1}>Total</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.total.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.total.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.total.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.total.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.total.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.total.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenAll.total.otherPercent }</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                &nbsp;&nbsp; Differently abled workmen
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    S.No.
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Particulars
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={2}>
                    Total
                    </th>

                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Male
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Female
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={2}>
                    Others
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                    <th className={styles.tableBodyContent1}>Number</th>
                    <th className={styles.tableBodyContent1}>%</th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyContent1}>1</td>
                    <td className={styles.tableBodyContent1}>Permanent</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.total.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.total.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.total.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.total.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.total.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.total.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.total.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>a</td>
                    <td className={styles.tableBodyDesc1}>Unskilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.unSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.unSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.unSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.unSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.unSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.unSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.unSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>b</td>
                    <td className={styles.tableBodyDesc1}>Semi-Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.semiSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.semiSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.semiSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.semiSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.semiSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.semiSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.semiSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>c</td>
                    <td className={styles.tableBodyDesc1}>Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.skilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.skilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.skilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.skilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.skilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.skilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.skilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>d</td>
                    <td className={styles.tableBodyDesc1}>Highly Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.highSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.highSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.highSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.highSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.highSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.highSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.permanent.highSkilled.otherPercent }</td>
                </tr>

                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyContent1}>2</td>
                    <td className={styles.tableBodyContent1}>Other than Permanent</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.total.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.total.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.total.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.total.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.total.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.total.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.total.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>a</td>
                    <td className={styles.tableBodyDesc1}>Unskilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.unSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.unSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.unSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.unSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.unSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.unSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.unSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>b</td>
                    <td className={styles.tableBodyDesc1}>Semi-Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.semiSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.semiSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.semiSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.semiSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.semiSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.semiSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.semiSkilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>c</td>
                    <td className={styles.tableBodyDesc1}>Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.skilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.skilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.skilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.skilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.skilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.skilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.skilled.otherPercent }</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>d</td>
                    <td className={styles.tableBodyDesc1}>Highly Skilled</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.highSkilled.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.highSkilled.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.highSkilled.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.highSkilled.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.highSkilled.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.highSkilled.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.otpermanent.highSkilled.otherPercent }</td>
                </tr>

                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyContent1}>3</td>
                    <td className={styles.tableBodyContent1}>Total</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.total.total }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.total.male }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.total.malePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.total.female }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.total.femalePercent }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.total.other }</td>
                    <td className={styles.tableBodyDesc1}>{ allData?.employee.workmenDifAbld.total.otherPercent }</td>
                </tr>
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;V.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Holdings&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>
                21. a &nbsp;&nbsp;Names of subsidiary / associate companies
                (including Joint Ventures)
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>
                    Name of Holdings / Subsidiary / Associates / Companies / Joint
                    Ventures
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Indicate whether holding/ Subsidiary/ Associate/ Joint Venture
                    </th>
                    <th className={styles.tableBodyContent1}>
                    % of shares held by listed entity{" "}
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Does the entity participate in the Business Responsibility
                    initiatives of the listed entity?
                    </th>
                    <th className={styles.tableBodyContent1}>CIN / FCRN</th>
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.holding.data !== undefined && allData?.holding.data.map((item, idx) => (
                            <tr className={styles.tableRow}>    
                                <td
                                    className={styles.tableBodyDesc}
                                    style={{ fontWeight: "bold" }}
                                >
                                {idx + 1}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.ecName}</td>
                                <td className={styles.tableBodyDesc1}>{item.ecType}</td>
                                <td className={styles.tableBodyDesc1}>{item.entityShare}</td>
                                <td className={styles.tableBodyDesc1}>{item.isBRI}</td>
                                <td className={styles.tableBodyDesc1}>{item.mca_cin_frns}</td>
                            </tr>
                        ))
                    }

                
                
                </tbody>
            </Table>
            <Label className={styles.label}>
                No. of subsidiary/associate companies for which information is to be
                given
            </Label>{" "}
            <br />
            <Label className={styles.tableBodyDesc}>{allData?.holding.mca21a21b.mca_no_of_subsi}</Label>
            <Label className={styles.label}>
                Do any other entity/entities (e.g. suppliers, distributors etc.)
                that the Company does business with, participate in the BR
                initiatives of the Company? If yes, then indicate the percentage of
                such entity/entities?
            </Label>
            <br />
            <Label className={styles.tableBodyDesc}>{allData?.holding.mca21a21b.mca_21_b === 1 ? "Less than 30%" : allData?.holding.mca21a21b.mca_21_b === 2 ? "Between 30% - 60%" : "More than 60%" }</Label>
            </div>

            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VI.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; CSR
                Details&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            
            <Label className={styles.label}>
                Whether CSR is applicable as per section 135 of Companies Act, 2013:
            </Label>
            <Label className={styles.tableBodyDesc}>&nbsp; {allData?.csr.applcCsr.isCSRApplicable}</Label> <br />
            <Label className={styles.label}>Turnover:</Label>
            <Label className={styles.tableBodyDesc}>&nbsp; ₹ {allData?.csr.applcCsr.turnover}</Label>
            <br />
            <Label className={styles.label}>Net Worth:</Label>
            <Label className={styles.tableBodyDesc}>
                &nbsp; ₹ {allData?.csr.applcCsr.networth}
            </Label>
            <br />
            <Label className={styles.label}>Whether a responsibility statement of the CSR Committee on the implementation and monitoring of CSR Policy is enclosed to the Board’s Report:</Label>
            <Label className={styles.tableBodyDesc}>
                &nbsp; <Link to="/">{allData?.csr.csr27_28.isCSRInc}</Link>{" "}
            </Label>
            <br />
            <Label className={styles.label}>Link to CSR Policy:</Label>
            <Label className={styles.tableBodyDesc}>
                &nbsp; <Link to="/">{allData?.csr.csr27_28.csrPolicyURL}</Link>{" "}
            </Label>
            <br />
            <Label className={styles.label}>
                22. b &nbsp;&nbsp;Net profit for last 3 Financial Years
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>
                    Financial Year Ended
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Profit before Tax (in Rs.)
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Net Profit computed u/s 198 adjusted as per rule 2(1)(f) of
                    the Companies (CSR Policy) Rules, 2014 (in Rs.)
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyDesc}
                    style={{ fontWeight: "bold" }}
                    >
                    {allData?.csr.netProfit.fY1}
                    </td>
                    <td className={styles.tableBodyDesc1}>₹ {allData?.csr.netProfit.fY1_profit_withtax}</td>
                    <td className={styles.tableBodyDesc1}>₹ {allData?.csr.netProfit.fY1_profit_adjusted}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyDesc}
                    style={{ fontWeight: "bold" }}
                    >
                    {allData?.csr.netProfit.fY2}
                    </td>
                    <td className={styles.tableBodyDesc1}>₹ {allData?.csr.netProfit.fY2_profit_withtax}</td>
                    <td className={styles.tableBodyDesc1}>₹ {allData?.csr.netProfit.fY2_profit_adjusted}</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyDesc}
                    style={{ fontWeight: "bold" }}
                    >
                    {allData?.csr.netProfit.fY3}
                    </td>
                    <td className={styles.tableBodyDesc1}>₹ {allData?.csr.netProfit.fY3_profit_withtax}</td>
                    <td className={styles.tableBodyDesc1}>₹ {allData?.csr.netProfit.fY3_profit_adjusted}</td>
                </tr>
                </tbody>
            </Table>
            <Label className={styles.label}>
                Average net profit of the company for last three financial years:
            </Label>
            <Label className={styles.tableBodyDesc}>
                &nbsp; ₹ {allData?.csr.netProfit.avg_profit}
            </Label>
            <br />
            <Label className={styles.label}>Prescribed CSR Expenditure:</Label>
            <Label className={styles.tableBodyDesc}>&nbsp; ₹ {allData?.csr.netProfit.csr_desc}</Label>
            <br />
            <Label className={styles.label}>
                22. c &nbsp;&nbsp;Amount spent on CSR
            </Label>
            <Label className={styles.label}>
                Total amount spent on CSR for the financial year (in Rs.):
            </Label>
            <Label className={styles.tableBodyDesc}>&nbsp; ₹ 190 crore</Label>
            <br />
            <Label className={styles.label}>Amount spent in local area:</Label>
            <Label className={styles.tableBodyDesc}>&nbsp; ₹ 90 crore</Label>
            <br />
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>
                    CSR project or activity identified
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Sector in which the project is Covered.
                    </th>
                    <th className={styles.tableBodyContent1}>
                    State/ UnionTerritory wherethe Project / Program was
                    Undertaken
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Specify the district where projects / programs were undertaken
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Amount outlay (budget) project or programs wise (in Rs.)
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Amount spent on the projects / programs(in Rs.)
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Expenditure on Administrative overheads (in Rs.)
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Mode of Amount spent
                    </th>
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.csr.csrAmount.map((item, idx) => (
                            <tr className={styles.tableRow}>
                                <td
                                className={styles.tableBodyDesc1}
                                style={{ fontWeight: "bold" }}
                                >
                                {idx + 1}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.csr_project}</td>
                                <td className={styles.tableBodyDesc1}>{item.project_sector}</td>
                                <td
                                className={styles.tableBodyDesc1}
                                
                                >
                                {item.project_state}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.project_district}</td>
                                <td className={styles.tableBodyDesc1}>{item.amount}</td>
                                <td
                                className={styles.tableBodyDesc1}
                               
                                >
                                {item.amount_spent}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.admin_spent}</td>
                                <td className={styles.tableBodyDesc1}>{item.spent_mode}</td>
                            </tr>
                        ))
                    }

                
                </tbody>
            </Table>
            <Label className={styles.label}>
                22. d &nbsp;&nbsp;Details of Implementing Agencies
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1} rowSpan={4}>
                    Project Name
                    </th>
                    <th className={styles.tableBodyContent1} rowSpan={4}>
                    Project Location
                    </th>
                    <th className={styles.tableBodyContent1} colSpan={4}>
                    Details of Implementing Agencies
                    </th>
                </tr>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Name</th>
                    <th className={styles.tableBodyContent1}>Address</th>
                    <th className={styles.tableBodyContent1}>Contact</th>
                    <th className={styles.tableBodyContent1}>Email</th>
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.csr.detailImplmnt.map((item, idx) => (
                            <tr className={styles.tableRow}>
                                <td
                                className={styles.tableBodyDesc1}
                                style={{ fontWeight: "bold" }}
                                >
                                {idx + 1}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.projectName}</td>
                                <td className={styles.tableBodyDesc1}>{item.projectLoc}</td>
                                <td
                                className={styles.tableBodyDesc1}
                                
                                >
                                {item.agencyName}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.agencyAddress}</td>
                                <td className={styles.tableBodyDesc1}>{item.agencyPhone}</td>
                                <td
                                className={styles.tableBodyDesc1}
                               
                                >
                                {item.agencyEmail}
                                </td>
                                
                            </tr>
                        ))
                    }

                
                </tbody>
            </Table>
            
            <br />
            </div>

            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VIII
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Transparency and Disclosures
                Compliances&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>
                23. &nbsp;&nbsp;Complaints/grievances on any of the principles
                (Principles 1 to 9) under the National Guidelines on Responsible
                Business Conduct (NGRBC)
            </Label><br/>

            <Label className={styles.label}>Current Year</Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>

                <tr className={styles.tableRow}>
                <th className={styles.tableBodyContent1}>
                    Stakeholder group from whom complaint is received
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Grievance Redressal Mechanism in Place
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Number of complaints filed at beginning of the year
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Number of complaints filed during the year
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Number of complaints pending resolution at close of the year
                    </th>
                    <th className={styles.tableBodyContent1}>Remarks</th>
                    
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.transparency.fiscalCurrent.groups.map((item, idx) => (
                            <tr className={styles.tableRow}>
                                <td className={styles.tableBodyDesc} style={{ fontWeight: "bold" }}>
                                    {item.stakeholderGroup === "Other" ? item.stakeholderOtherText : item.stakeholderGroup}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.isGMinPlace}</td>
                                <td className={styles.tableBodyDesc1}>{item.mca_compFiledBY}</td>
                                <td className={styles.tableBodyDesc1}>{item.compFiledDY}</td>
                                <td className={styles.tableBodyDesc1}>{item.compPendingYE}</td>
                                <td className={styles.tableBodyDesc1}>{item.remarks}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>

            <Label className={styles.label}>Previous Year</Label>

            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                

                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>
                    Stakeholder group from whom complaint is received
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Grievance Redressal Mechanism in Place
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Number of complaints filed at beginning of the year
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Number of complaints filed during the year
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Number of complaints pending resolution at close of the year
                    </th>
                    <th className={styles.tableBodyContent1}>Remarks</th>
                    
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.transparency.fiscalPrevs.groups.map((item, idx) => (
                            <tr className={styles.tableRow}>
                                <td className={styles.tableBodyDesc} style={{ fontWeight: "bold" }}>
                                    {item.stakeholderGroup === "Other" ? item.stakeholderOtherText : item.stakeholderGroup}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.isGMinPlace}</td>
                                <td className={styles.tableBodyDesc1}>{item.mca_compFiledBY}</td>
                                <td className={styles.tableBodyDesc1}>{item.compFiledDY}</td>
                                <td className={styles.tableBodyDesc1}>{item.compPendingYE}</td>
                                <td className={styles.tableBodyDesc1}>{item.remarks}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
            {/* <h6 style={{ fontWeight: "normal", fontStyle: "italic" }}>
                * Some of the policies guiding the Corporation’s conduct with all
                its stakeholders, including grievance mechanisms are placed on the
                Corporation’s website. The hyperlink is:{" "}
                <span>
                {" "}
                <Link to="/">
                    {" "}
                    https://www.hdfc.com/investor-services#codes-policies{" "}
                </Link>
                </span>
                . In addition, there are internal policies placed on the intranet of
                the Corporation.
            </h6> */}
            </div>

            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VIII.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Material Business Conduct&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>
                24. &nbsp;&nbsp;Overview of the entity’s material responsible
                business conduct issues
            </Label>
            <Label className={styles.tableBodyDesc}>
                Please indicate material responsible business conduct and
                sustainability issues pertaining to environmental and social matters
                that present a risk or an opportunity to your business, rationale
                for identifying the same, approach to adapt or mitigate the risk, as
                per the following format:
            </Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>
                    Material issue identified
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Indicate whether risk or opportunity (R/O)
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Rationale for identifying the risk / opportunity
                    </th>
                    <th className={styles.tableBodyContent1}>
                    In case of risk, approach to adapt or mitigate
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Financial implications of the risk or opportunity{" "}
                    <span>*</span>{" "}
                    </th>
                </tr>
                </thead>
                <tbody>

                    {
                        allData?.materialIssue.map((item, idx) => (
                            <tr className={styles.tableRow}>
                                <td
                                className={styles.tableBodyDesc1}
                                style={{ fontWeight: "bold" }}
                                >
                                {idx + 1}
                                </td>
                                <td className={styles.tableBodyDesc1}>{item.materialIssue}</td>
                                <td className={styles.tableBodyDesc1}>{item.isRO}</td>
                                <td className={styles.tableBodyDesc1}>{item.rationaleForRO}</td>
                                <td className={styles.tableBodyDesc1}>{item.rishApproach}</td>
                                <td className={styles.tableBodyDesc1}>{item.financialImpact}</td>
                            </tr>
                        ))
                    }

                
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyDesc1}
                    style={{ fontWeight: "bold" }}
                    >
                    2
                    </td>
                    <td className={styles.tableBodyDesc1}>Yes</td>
                    <td className={styles.tableBodyDesc1}>-</td>
                    <td className={styles.tableBodyDesc1}>-</td>
                    <td className={styles.tableBodyDesc1}>-</td>
                    <td className={styles.tableBodyDesc1}>-</td>
                </tr>
                <tr className={styles.tableRow}>
                    <td
                    className={styles.tableBodyDesc1}
                    style={{ fontWeight: "bold" }}
                    >
                    3
                    </td>
                    <td className={styles.tableBodyDesc1}>Yes</td>
                    <td className={styles.tableBodyDesc1}>-</td>
                    <td className={styles.tableBodyDesc1}>-</td>
                    <td className={styles.tableBodyDesc1}>-</td>
                    <td className={styles.tableBodyDesc1}>-</td>
                </tr>
                </tbody>
            </Table>
            <h6 style={{ fontWeight: "normal", fontStyle: "italic" }}>
                * Including both manufactured and traded & accounting for more than
                90% of entity's turnover.
            </h6>
            </div>
            <br />
            <br />
            <br />

            <div className={styles.wrapper}>
                <Label className={styles.heading}>
                    SECTION B: MANAGEMENT & PROCESS DISCLOSURES
                </Label>
                {/* <div className={styles.border} /> */}
            </div>
            <div className={styles.wrapperHead}>
            <Label className={styles.subHeading}>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I.
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Policy & Management Process&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Disclosure Questions</th>
                    <th className={styles.tableBodyContent1}>P1</th>
                    <th className={styles.tableBodyContent1}>P2</th>
                    <th className={styles.tableBodyContent1}>P3</th>
                    <th className={styles.tableBodyContent1}>P4</th>
                    <th className={styles.tableBodyContent1}>P5</th>
                    <th className={styles.tableBodyContent1}>P6</th>
                    <th className={styles.tableBodyContent1}>P7</th>
                    <th className={styles.tableBodyContent1}>P8</th>
                    <th className={styles.tableBodyContent1}>P9</th>
                    
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>1. a. Name your company’s policy	</td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>b. Has the policy been approved by the Board?	</td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>c. Web Link of the Policies, if available	</td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>2. Whether the entity has translated the policy into procedures.	</td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>3. Do the enlisted policies extend to your value chain partners?	</td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>4. Name of the national and international codes / certifications / labels / standards	</td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>5. Specific commitments, goals and targets set by the entity		</td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>6. Performance of the entity against the specific commitments,	</td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                </tr>
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>10. Details of Review of NGRBCs by the Company</Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Subject for Review	</th>
                    <th className={styles.tableBodyContent1}>
                    Indicate whether review was undertaken by Director / Committee of the Board/ Any other Committee	
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Frequency (Annually/ Half yearly/ Quarterly/ Any other – please specify)	
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>Performance against above policies and follow up action	</td>
                    <td className={styles.tableBodyDesc1}>
                    Director
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Anually
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances	</td>
                    <td className={styles.tableBodyDesc1}>
                    Director
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Anually
                    </td>
                    
                </tr>
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>11. Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency?. If yes, provide name of the agency</Label>
            <br/>
            <Label className={styles.tableBodyDesc}>Yes</Label>
            </div>
            

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>12. If answer to question (1) in Policy & Management Process is “No” i.e. not all Principles are covered by a policy, reasons to be stated</Label>
            <Table
                className="text-center"
                bordered
                style={{ borderColor: "#2E3439", borderWidth: 0 }}
            >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>Questions</th>
                    <th className={styles.tableBodyContent1}>P1</th>
                    <th className={styles.tableBodyContent1}>P2</th>
                    <th className={styles.tableBodyContent1}>P3</th>
                    <th className={styles.tableBodyContent1}>P4</th>
                    <th className={styles.tableBodyContent1}>P5</th>
                    <th className={styles.tableBodyContent1}>P6</th>
                    <th className={styles.tableBodyContent1}>P7</th>
                    <th className={styles.tableBodyContent1}>P8</th>
                    <th className={styles.tableBodyContent1}>P9</th>
                    
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>The company does not consider the Principles material to its business	</td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>The entity is not at a stage where it is in a position to formulate and implement the policies on specified principles	</td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>The entity does not have the financial or/human and technical resources available for the task	</td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>It is planned to be done in the next financial year	</td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Yes
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc}>Any other reason (please specify)	</td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Text here
                    </td>
                </tr>
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperHead}>
                <Label className={styles.subHeading}>
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;II.
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Governance, Leadership & Oversight&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Label>
            </div>

            <div className={styles.wrapperBody}>
            <Label className={styles.label}>7. Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements</Label>
            <br/>
            <Label className={styles.tableBodyDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Label>
            </div>

            <div className={styles.wrapperBody}>
                <Label className={styles.label}>8. Details of the Director responsible for implementation of the Business Responsibility policy(ies)</Label>
                <br/>
                <Label className={styles.label}>No. of Directors</Label>
                <br/>
                <Label className={styles.tableBodyDesc}>2</Label>
                <br/>
                <Table
                    className="text-center"
                    bordered
                    style={{ borderColor: "#2E3439", borderWidth: 0 }}
                >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>
                    DIN No.	
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Name	
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Designation	
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>1</td>
                    <td className={styles.tableBodyDesc1}>
                    12345678
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Name
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Desg
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>2</td>
                    <td className={styles.tableBodyDesc1}>
                    12345678
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Name
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Desg
                    </td>
                </tr>
                </tbody>
            </Table>
            </div>

            <div className={styles.wrapperBody}>
                <Label className={styles.label}>9. Does the company have a specified committee of the Board/ Directors/ Officials to oversee the implementation of the policy?</Label>
                <br/>
                <Label className={styles.tableBodyDesc}>Yes</Label>
                <br/>
                <Label className={styles.label}>No. of Directors</Label>
                <br/>
                <Label className={styles.tableBodyDesc}>2</Label>
                <br/>
                <Table
                    className="text-center"
                    bordered
                    style={{ borderColor: "#2E3439", borderWidth: 0 }}
                >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>
                    DIN No.	
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Name	
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Designation	
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>1</td>
                    <td className={styles.tableBodyDesc1}>
                    12345678
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Name
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Desg
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>2</td>
                    <td className={styles.tableBodyDesc1}>
                    12345678
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Name
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Desg
                    </td>
                </tr>
                </tbody>
            </Table>

            <br/>
            <Label className={styles.label}>No. of Employees</Label>
                <br/>
                <Label className={styles.tableBodyDesc}>2</Label>
                <br/>
                <Table
                    className="text-center"
                    bordered
                    style={{ borderColor: "#2E3439", borderWidth: 0 }}
                >
                <thead>
                <tr className={styles.tableRow}>
                    <th className={styles.tableBodyContent1}>S.No.</th>
                    <th className={styles.tableBodyContent1}>
                    Employee ID	
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Name	
                    </th>
                    <th className={styles.tableBodyContent1}>
                    Designation	
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>1</td>
                    <td className={styles.tableBodyDesc1}>
                    12345678
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Name
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Desg
                    </td>
                </tr>
                <tr className={styles.tableRow}>
                    <td className={styles.tableBodyDesc1}>2</td>
                    <td className={styles.tableBodyDesc1}>
                    12345678
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Name
                    </td>
                    <td className={styles.tableBodyDesc1}>
                    Desg
                    </td>
                </tr>
                </tbody>
            </Table>
            </div>
            <br />
            <br />
            <br />
        </div>
    </>
  );
}

export default BsrReport;
