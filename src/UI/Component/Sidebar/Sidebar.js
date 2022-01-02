import React from "react";
import { FaGem, FaHeart } from "react-icons/fa";
import {
  HiDatabase,
  HiOutlineUpload,
  HiPencilAlt,
  HiOutlineDocumentReport,
  HiOutlineDocumentDownload,
  HiChartBar,
  HiOutlineEye,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import logo from "../../../assets/favicon.ico";
import myyTakeLogo from "../../../assets/myytake-logo.png";
import { Link, useHistory } from "react-router-dom";
import TooltipComp from "../../../../utils/TooltipComp/TooltipComp";

function Sidebar({ collapse, type, setNavName }) {
  const history = useHistory();

  return (
    <>
      <ProSidebar style={{ height: "235vh" }} collapsed={collapse}>
        <SidebarHeader>
          <img
            // src={ collapse ? logo : myyTakeLogo}
            src={collapse}
            alt="logo"
            style={{
              width: collapse ? 48 : 72,
              position: "absolute",
            }}
            className="mt-3 ml-3"
          />
        </SidebarHeader>
        {type === "Company" ? (
          <Menu iconShape="square" style={{ paddingTop: 96 }}>
            <MenuItem
              icon={<HiOutlinePresentationChartBar color="#2B8CD6" size={20} />}
            >
              Dashboard
            </MenuItem>

            <SubMenu
              title="Data Management"
              icon={<HiDatabase color="#2B8CD6" size={20} />}
            >
              <MenuItem icon={<HiOutlineUpload color="#2B8CD6" size={20} />}>
                <Link to="/companyInfo">Company Information</Link>
              </MenuItem>

              <SubMenu
                title="Financial Year"
                icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
              >
                <SubMenu
                  title="FY 2020 - 2021 (Q1)"
                  icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                  onClick={() => history.push("/financialData")}
                >
                  <SubMenu
                    title="Section A"
                    icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                    id="SECTIONA"
                  >
                    <TooltipComp
                      message={"GENERAL DISCLOSURES"}
                      openTooltipN={0}
                      target={"SECTIONA"}
                    />
                    <MenuItem
                      icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                      onClick={() => setNavName("Prod")}
                    >
                      Product & Services
                    </MenuItem>
                    <MenuItem
                      icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                      onClick={() => setNavName("Operations")}
                    >
                      Operations
                    </MenuItem>
                    <MenuItem
                      icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                      onClick={() => setNavName("Employees")}
                    >
                      Employees
                    </MenuItem>
                    {/* <MenuItem icon={<HiOutlineUpload color="#2B8CD6" size={20}/>} onClick={() => setNavName("Workers")}>
                                                Workers
                                            </MenuItem>
                                            <MenuItem icon={<HiOutlineUpload color="#2B8CD6" size={20}/>} onClick={() => setNavName("EmployeeSubDetails")}>
                                                Women Representation
                                            </MenuItem> */}
                    <MenuItem
                      icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                      onClick={() => setNavName("Holdings")}
                    >
                      Holdings
                    </MenuItem>
                    <MenuItem
                      icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                      onClick={() => setNavName("CSR")}
                    >
                      CSR
                    </MenuItem>
                    <MenuItem
                      icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                      onClick={() => setNavName("CompGriev")}
                    >
                      Complaints / Grievance
                    </MenuItem>
                    <MenuItem
                      icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                      onClick={() => setNavName("MaterialBusiness")}
                    >
                      Material Business
                    </MenuItem>
                  </SubMenu>

                  <SubMenu
                    title="Section B"
                    icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                    id="SECTIONB"
                  >
                    <TooltipComp
                      message={"MANAGEMENT AND PROCESS DISCLOSURES"}
                      openTooltipN={0}
                      target={"SECTIONB"}
                    />
                    <MenuItem
                      icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                      onClick={() => setNavName("m&p")}
                    >
                      Management & Process
                    </MenuItem>
                  </SubMenu>
                  <SubMenu
                    title="Section C"
                    icon={<HiOutlineUpload color="#2B8CD6" size={20} />}
                    id="SECTIONC"
                  >
                    <TooltipComp
                      message={"PRINCIPLE WISE PERFORMANCE DISCLOSURE"}
                      openTooltipN={0}
                      target={"SECTIONC"}
                    />
                  </SubMenu>
                </SubMenu>
              </SubMenu>
            </SubMenu>
            <SubMenu
              title="Report"
              icon={<HiOutlineDocumentReport color="#2B8CD6" size={20} />}
            >
              <MenuItem
                icon={<HiOutlineDocumentDownload color="#2B8CD6" size={20} />}
              >
                Download BRSR Report
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<HiChartBar color="#2B8CD6" size={20} />}>
              Analytics
            </MenuItem>
          </Menu>
        ) : (
          <Menu iconShape="square" style={{ paddingTop: 64 }}>
            <MenuItem
              icon={<HiOutlinePresentationChartBar color="#2B8CD6" size={20} />}
            >
              Dashboard
            </MenuItem>
            <MenuItem icon={<HiOutlineEye color="#2B8CD6" size={20} />}>
              View & Compare Data
            </MenuItem>
          </Menu>
        )}
      </ProSidebar>
    </>
  );
}

export default Sidebar;
