import React, { useState, useEffect } from "react";
import "@pathofdev/react-tag-input/build/index.css";
// import styles from "./productServices.module.css";
import {
  HiPlus,
  HiOutlineTrash,
  HiPencil,
  HiOutlineDocumentDuplicate,
  HiOutlineInformationCircle,
} from "react-icons/hi";

import {
  Table,
  FormGroup,
  Input,
  FormFeedback,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import Toast from "../../../../../utils/Toast/Toast";
import { apiUrl } from "../../../../../config/config";
import { getToken } from "../../../../../utils/LocalStorage/LocalStorage";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import RegEx from "../../../../../utils/RegEx/RegEx";

const ProductServices = () => {
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
      baId: "",
      discMainActivity: "",
      discBusinessActivity: "",
      turnover: 0,
      mca_mainActivityCode: "",
      mca_mainBusinessCode: "",
    },
    {
      id: 2,
      baId: "",
      discMainActivity: "",
      discBusinessActivity: "",
      turnover: 0,
      mca_mainActivityCode: "",
      mca_mainBusinessCode: "",
    },
    {
      id: 3,
      baId: "",
      discMainActivity: "",
      discBusinessActivity: "",
      turnover: 0,
      mca_mainActivityCode: "",
      mca_mainBusinessCode: "",
    },
  ]);
  const [inputEntityList, setInputEntityList] = useState([
    {
      id: 1,
      psId: "",
      productName: "",
      nicCode: "",
      turnover: 0,
      mca_brands: [
        {
          brand: "",
          turnover: 0,
          id: 1,
        },
      ],
    },
    {
      id: 2,
      psId: "",
      productName: "",
      nicCode: "",
      turnover: 0,
      mca_brands: [
        {
          brand: "",
          turnover: 0,
          id: 1,
        },
      ],
    },
    {
      id: 3,
      psId: "",
      productName: "",
      nicCode: "",
      turnover: 0,
      mca_brands: [
        {
          brand: "",
          turnover: 0,
          id: 1,
        },
      ],
    },
  ]);

  const [inputBrandList, setInputBrandList] = useState([
    {
      id: 1,
      brand: "",
      contribution: 0,
    },
  ]);

  const [businessActivity, setBusinessActivity] = useState([]);
  const [topProducts, setTopProducts] = useState();

  const [brands, setBrands] = useState();
  const [invalidList, setInvalidList] = useState([]);

  const [count, setCount] = useState(1);
  const [entityCount, setEntityCount] = useState(1);
  const [brandCount, setBrandCount] = useState(1);

  const [modal, setModal] = useState(false);

  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");

  const [isEditable, setIsEditable] = useState(false);
  const [isEditable1, setIsEditable1] = useState(false);
  const [isEditable2, setIsEditable2] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [color, setColor] = useState("");
  const [selectedEntity, setSelectedEntity] = useState(null);

  const [data, setData] = useState({});
  const brsrData = useSelector((state) => state);

  let obj = brsrData.brsr.finencial.response.find(
    (o) => o.entityId == reportId
  );
  useEffect(() => {
    setData(obj);
  }, []);

  // const [activeTab, setActiveTab] = useState("1");
  // const toggle = (tab) => {
  //   if (activeTab !== tab) setActiveTab(tab);
  // };

  // Business Activity

  const addField = () => {
    setInputList([
      ...inputList,
      {
        id: count + 1,
        baId: "",
        discMainActivity: "",
        discBusinessActivity: "",
        turnover: 0,
        mca_mainActivityCode: "",
        mca_mainBusinessCode: "",
      },
    ]);

    setCount(count + 1);
  };

  // const editField = (idx) => {
  //   console.log("edit=====", idx);
  // };

  const removeField = async (baId, id) => {
    const list = inputList.filter((item) => item.id !== id);

    // const list = [...inputList];
    // list.splice(id, 1);

    setInputList(list);
    if (baId !== "") {
      const deleteInputs = await axios({
        method: "DELETE",
        url: `${apiUrl}entity/busness-activity`,
        data: {
          reportingId: reportId,
          baId: baId,
        },
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });
      try {
        if (deleteInputs.data.code === 200) {
          getAllProductServiceData();
        }
      } catch (e) {
        console.log({});
      }
    }
  };

  // Top 3 Products

  const addEntityField = () => {
    setInputEntityList((pv) => [
      ...pv,
      {
        id: pv.length + 2,
        psId: "",
        productName: "",
        nicCode: "",
        mca_brands: [
          {
            brand: "",
            turnover: 0,
            id: 1,
          },
        ],
        turnover: "",
      },
    ]);
  };

  const editEntityField = (idx) => {
    console.log(idx);
  };

  const removeEntityField = async (psId, id) => {
    const list = inputEntityList.filter((item) => item.id !== id);
    setInputEntityList(list);
    if (psId !== "") {
      const deleteInputs = await axios({
        method: "DELETE",
        url: `${apiUrl}entity/product-services`,
        data: {
          reportingId: reportId,
          baId: psId,
        },
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });
      try {
        if (deleteInputs.data.code === 200) {
          getTopProducts();
        }
      } catch (e) {
        console.log({});
      }
    }
  };

  useEffect(() => {
    getAllProductServiceData();
    getTopProducts();
    getBrands();
  }, []);

  const getAllProductServiceData = async () => {
    const response = await axios.get(
      `${apiUrl}entity/busness-activity?reportingId=${reportId}`,
      config
    );
    try {
      if (response.data.code === 200) {
        response.data.data.data.length > 0
          ? setInputList(response.data.data.data)
          : setInputList(inputList);
      }
    } catch (e) {
      console.error({});
    }
  };
  const getTopProducts = async () => {
    const response = await axios.get(
      `${apiUrl}entity/product-services?reportingId=${reportId}`,
      config
    );
    try {
      if (response.data.code === 200) {
        response.data.data.data.length > 0
          ? setIsEditable(true)
          : setIsEditable(false);

        if (response.data.data.data?.length > 0) {
          setInputEntityList(response.data.data.data);
          setInputBrandList(response.data.data.data);
        } else {
          addEntityField();
        }
      }
    } catch (e) {
      console.error({});
    }
  };

  const getBrands = async () => {
    const response = await axios.get(
      `${apiUrl}entity/product-services?reportingId=${reportId}`,
      config
    );
    try {
      if (response.data.code === 200) {
        if (response.data.data.data?.length > 0) {
          setInputBrandList(response.data.data.data);
        } else {
          setInputBrandList([
            {
              psId: "",
              brand: "",
              contribution: 0,
            },
          ]);
        }
      }
    } catch (e) {
      console.error({});
    }
  };

  //   BRAND

  const addBrandField = () => {
    setInputBrandList([
      ...inputBrandList,
      {
        id: brandCount + 1,
        brand: "",
        contribution: "",
      },
    ]);

    setBrandCount(brandCount + 1);
  };

  const editBrandField = (idx) => {
    console.log("edit=====", idx);
  };

  const removeBrandField = (id) => {
    const list = inputBrandList.filter((item) => item.id !== id);

    // const list = [...inputList];
    // list.splice(id, 1);
    setInputBrandList(list);
  };

  // ================ HANDLE CHANGE =================

  const handleChange = (e, idx) => {
    const { name, value } = e.target;
    setInputList((prevState) => {
      return prevState.map((input, index) => {
        if (index === idx) {
          const newInput = {
            ...input,
            [name]: value,
          };
          return newInput;
        }
        return input;
      });
    });
  };

  // const handleChange = (e, idx) => {
  //   const { name, value } = e.target;

  //   if (name === "discMainActivity") {
  //     inputList[idx].discMainActivity = value;
  //   } else if (name === "discBusinessActivity") {
  //     inputList[idx].discBusinessActivity = value;
  //   } else if (name === "turnover") {
  //     inputList[idx].turnover = value;
  //   } else if (name === "mca_mainActivityCode") {
  //     inputList[idx].mca_mainActivityCode = value;
  //   } else {
  //     inputList[idx].mca_mainBusinessCode = value;
  //   }

  //   setBusinessActivity({
  //     ...businessActivity,
  //     inputList,
  //   });
  // };

  const handleChangev1 = (e, idx) => {
    let { name, value } = e.target;
    setInputEntityList((prevState) => {
      if (e.target.type === "number") {
        value = parseInt(value);
      }
      return prevState.map((input, index) => {
        if (index === idx) {
          const newInput = {
            ...input,
            [name]: value,
          };
          return newInput;
        }
        return input;
      });
    });
  };

  const handleChangev2 = (e, idx) => {
    let { name, value } = e.target;
    setInputBrandList((prevState) => {
      if (e.target.type === "number") {
        value = parseInt(value);
      }
      return prevState.map((input, index) => {
        if (index === idx) {
          const newInput = {
            ...input,
            [name]: value,
          };
          return newInput;
        }
        return input;
      });
    });
  };

  // ================= SAVE FUNCTIONALITY ===================

  const saveBusinessActivity = async () => {
    setIsLoading(true);
    let checkTurnover = 0;
    inputList?.map((item) => {
      checkTurnover += Number(item.turnover);
    });

    if (checkTurnover > 100) {
      setErr(true);
      setMsg("Combined Turnover can not exceed 100%");
      setIsLoading(false);
    } else {
      // API CALL

      const body = {
        reportingId: reportId,
        data: inputList,
      };

      try {
        const productData = await axios.post(
          `${apiUrl}entity/busness-activity`,
          body,
          config
        );
        if (productData.data.code === 200) {
          setMsg("Successfully saved data");

          setIsEditable(!isEditable);

          setIsLoading(false);
          setErr(true);
          setColor("Green");
        }
      } catch (e) {
        setIsLoading(false);
        setErr(true);
        setMsg("Failed to save data");
        setColor("Red");
      }
    }
  };

  const saveTopProducts = async () => {
    setIsLoading1(true);

    let checkTurnover = 0;

    inputEntityList.map((item) => {
      checkTurnover += Number(item.turnover);
    });

    if (checkTurnover > 100) {
      setErr(true);
      setMsg("Combined Turnover can not exceed 100%");
      setIsLoading1(false);
    } else {
      // API CALL
      const body = {
        reportingId: reportId,
        data: inputEntityList,
      };

      try {
        const topProductData = await axios.post(
          `${apiUrl}entity/product-services`,
          body,
          config
        );
        if (topProductData.data.code === 200) {
          setMsg("Successfully saved data");
          topProductData.data.data.data.forEach((element, idx) => {
            inputEntityList[idx].baId = element.baId;
          });

          setIsEditable1(!isEditable1);

          setIsLoading1(false);
          setErr(true);
          setColor("Green");
        }
      } catch (e) {
        setIsLoading1(false);
        setErr(true);
        setMsg("Failed to save data");
        setColor("Red");
      }
    }
  };

  const saveBrands = async (idx) => {

    setIsLoading2(true)

    // let checkContribution = 0;
    // brands.inputBrandList.map((item) => {
    //   checkContribution += Number(item.contribution);
    // });
    // if (checkContribution > 100) {
    //   setErr(true);
    //   setMsg("Combined Contribution can not exceed 100%");
    // } else {
    //   // API CALL
    //   const body = JSON.stringify({
    //     reportingId: reportId,
    //     data: inputBrandList,
    //   });
    //   const res = await axios.post(
    //     `${apiUrl}entity/product-services`,
    //     body,
    //     config
    //   );
    //   try {
    //     if (res.data.code === 200) {
    //       setMsg("Successfully saved data");
    //       setIsEditable2(!isEditable1);
    //       setIsLoading2(false);
    //       setErr(true);
    //       setColor("Green");
    //     }
    //   } catch (e) {
    //     setIsLoading2(false);
    //     setErr(true);
    //     setMsg("Failed to save data");
    //     setColor("Red");
    //   }
    // }

    setInputEntityList((prevState) => {
      return prevState.map((input, index) => {
        if (index === idx) {
          return {
            ...input,
            mca_brands: inputBrandList,
          };
        }
        return input;
      });
    });

    setIsLoading2(false);
    setIsEditable2(!isEditable2)
    setErr(true);
    setMsg("Data Saved Successfully");
    setColor("Green");
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
        <span className="breadCrumbActive"> Product & Services </span>
      </div>
      <div className="float-right" style={{ color: "#f56" }}>
        <span>{data.companyName}</span> - <span>{data.reportingBoundary}</span>{" "}
        - <span>FY {data.financialYear}</span> - <span>(Q{data.quarter})</span>
      </div>
      <h2 className="heading" style={{ color: "#fff" }}>
        II Product & Services
      </h2>

      {/* <TabContent activeTab={activeTab}>
        <TabPane tabId="1"> */}

      <h4 className="subHeading">
        14. Details of Business Activity{" "}
        <span id="cat4" style={{ color: "green" }}>
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={
            "S. 14 - Accounting for more than 90% of entity's turnover, M. 13 - Sector(s) in which the company is engaged"
          }
          openTooltipN={0}
          target="cat4"
        />
      </h4>

      <Table
        dark
        size="sm"
        className="text-center mt-3"
        bordered
        style={{ borderColor: "#2E3439", borderWidth: 0 }}
      >
        <thead className="tableHead">
          <tr>
            {/* <th className="tableHeading"></th> */}
            <th className="tableHeading">S.No.</th>

            <th className="tableHeading">Description of Main Activity</th>

            <th className="tableHeading">Description of Business Activity</th>
            <th className="tableHeading">% Turnover of the entity </th>
            <th className="tableHeading">
              <span style={{ color: "#FCDB0A" }}>Main Activity Code </span>
            </th>
            <th className="tableHeading">
              <span style={{ color: "#FCDB0A" }}>Business Activity Code</span>
            </th>
            <th className="tableHeading" colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {inputList?.map((item, idx) => (
            <tr key={item.id}>
              <td className="tableHeading" className="pt-3">
                {" "}
                {idx + 1}{" "}
              </td>

              <td className="tableHeading">
                <Input
                  disabled={isEditable}
                  type="text"
                  className="input"
                  name="discMainActivity"
                  placeholder="Main Activity Description"
                  defaultValue={item?.discMainActivity}
                  onChange={(e) => {
                    if (e.target.value === "" || e.target.value === " ") {
                      setInvalidList([
                        ...invalidList,
                        "discMainActivity" + idx,
                      ]);
                    } else {
                      setInvalidList(
                        invalidList?.filter(
                          (item) => item !== "discMainActivity" + idx
                        )
                      );
                      handleChange(e, idx);
                    }
                  }}
                  invalid={invalidList?.includes("discMainActivity" + idx)}
                />
                <FormFeedback className="text-left">
                  Please enter valid description
                </FormFeedback>
              </td>

              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    disabled={isEditable}
                    type="text"
                    className="input"
                    name="discBusinessActivity"
                    placeholder="Business Activity Description"
                    defaultValue={item?.discBusinessActivity}
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([
                          ...invalidList,
                          "discBusinessActivity" + idx,
                        ]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "discBusinessActivity" + idx
                          )
                        );
                        handleChange(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes(
                      "discBusinessActivity" + idx
                    )}
                    // invalid={businessActivityDescErr === true}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid description
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    disabled={isEditable}
                    type="number"
                    className="input"
                    name="turnover"
                    placeholder="Turnover"
                    defaultValue={item?.turnover}
                    onChange={(e) => {
                      if (e.target.value.length > 0 && e.target.value <= 100) {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "turnover" + idx
                          )
                        );
                        handleChange(e, idx);
                      } else {
                        setInvalidList([...invalidList, "turnover" + idx]);
                      }
                    }}
                    invalid={invalidList?.includes("turnover" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Turnover can not be more that 100%
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <Input
                  disabled={isEditable}
                  type="number"
                  className="input"
                  name="mca_mainActivityCode"
                  placeholder="Main Activity Code"
                  defaultValue={item?.mca_mainActivityCode}
                  onChange={(e) => {
                    handleChange(e, idx);
                  }}
                />
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    disabled={isEditable}
                    type="number"
                    className="input"
                    name="mca_mainBusinessCode"
                    placeholder="Business Activity Code"
                    defaultValue={item?.mca_mainBusinessCode}
                    onChange={(e) => {
                      handleChange(e, idx);
                    }}
                  />
                </FormGroup>
              </td>
              {/* <td className="tableHeading" className="pt-3">
                <HiPencil
                  size={22}
                  id={"edit" + idx}
                  color="#2B8CD6"
                  onClick={() => editField(item.id)}
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
                  color={inputList.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    inputList.length > 1 ? removeField(item.baId, item.id) : ""
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
        {isEditable && (
          <>
            
            <Button
              id="edit1"
              className="mt-4 mb-4 mr-3"
              color="secondary"
              style={{ width: 100 }}
              onClick={() => setIsEditable(!isEditable)}
            >
              {/* <HiPlus size={24} /> */}
              EDIT
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"edit1"} />
          </>
        )}

        {!isEditable && (
          <div>
            <Button
              id="add4"
              className="mt-4 mb-4 mr-3"
              color="warning"
              onClick={() => addField()}
              style={{ width: 100 }}
            >
              {/* <HiPlus size={24} /> */}
              ADD
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"add4"} />
            <Button
              id="save15"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveBusinessActivity()}
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
          </div>
        )}
      </div>

      {/* <Row>
        <Col md={12}>
          <Label className="label">What is the contribution of exports to total turnover of the Company in percentage?</Label>
          <Input className="input" type="number" placeholder="Contribution of Exports to Total Turnover (in %)" name="cet" />
        </Col>
      </Row> */}

      {/* <div
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
              color="warning"
              style={{ width: 100 }}
            >
              EDIT
              
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
            <Button
              id="save18"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
            >
              SAVE
              
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save18"} />
          </div> */}
      {/* </TabPane> */}

      {/* <TabPane tabId="2"> */}

      <h4 className="subHeading">
        15. Top 3 Products / Services sold by Entity{" "}
        <span id="cat2" style={{ color: "green" }}>
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={
            "M. 14 - Including both manufactured and traded, S.15 - Accounting for more than 90% of entity's turnover"
          }
          openTooltipN={0}
          target="cat2"
        />
      </h4>
      <Table
        dark
        size="sm"
        className="text-center  mt-3"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            {/* <th className={styles.tableHeading}></th> */}
            <th className="tableHeading">S.No.</th>
            <th className="tableHeading">Product / Service</th>
            <th className="tableHeading">NIC Code</th>
            <th className="tableHeading">% of total Turnover contributed </th>
            <th className="tableHeading">
              {" "}
              <span style={{ color: "#FCDB0A" }}> Brands </span>{" "}
            </th>
            <th className="tableHeading" colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {inputEntityList?.map((item, idx) => (
            <tr key={item.id}>
              <td className="tableHeading" className="pt-3">
                {" "}
                {idx + 1}{" "}
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    disabled={isEditable1}
                    type="text"
                    className="input"
                    name="productName"
                    placeholder="Product Name"
                    defaultValue={item?.productName}
                    onChange={(e) => {
                      if (e.target.value === "" || e.target.value === " ") {
                        setInvalidList([...invalidList, "product" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "product" + idx
                          )
                        );
                        handleChangev1(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("product" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Product name field can not be empty
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    disabled={isEditable1}
                    type="text"
                    className="input"
                    name="nicCode"
                    defaultValue={item?.nicCode}
                    placeholder="NIC code"
                    onChange={(e) => {
                      if (
                        (e.target.value.length <= 8 &&
                          !RegEx.nicCodeOld.test(e.target.value)) ||
                        (e.target.value.length > 8 &&
                          !RegEx.nicCodeNew.test(e.target.value))
                      ) {
                        setInvalidList([...invalidList, "nicCode" + idx]);
                      } else {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "nicCode" + idx
                          )
                        );
                        handleChangev1(e, idx);
                      }
                    }}
                    invalid={invalidList?.includes("nicCode" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Please enter valid NIC code
                  </FormFeedback>
                </FormGroup>
              </td>

              <td className="tableHeading">
                <FormGroup className="m-0">
                  <Input
                    disabled={isEditable1}
                    type="number"
                    className="input"
                    name="turnover"
                    defaultValue={item?.turnover}
                    placeholder="Total Turnover"
                    onChange={(e) => {
                      if (e.target.value.length > 0 && e.target.value <= 100) {
                        setInvalidList(
                          invalidList?.filter(
                            (item) => item !== "totalTurnover" + idx
                          )
                        );
                        handleChangev1(e, idx);
                      } else {
                        setInvalidList([...invalidList, "totalTurnover" + idx]);
                      }
                    }}
                    invalid={invalidList?.includes("totalTurnover" + idx)}
                  />
                  <FormFeedback className="text-left">
                    Turnover can not be more that 100%
                  </FormFeedback>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <HiOutlineDocumentDuplicate
                  id={"brand" + idx}
                  size={24}
                  color={"#fcdb0a"}
                  onClick={() => {
                    setModal(!modal);
                    setSelectedEntity(idx);
                    setInputBrandList(
                      item.mca_brands || [
                        {
                          brand: "",
                          turnover: 0,
                          id: 1,
                        },
                      ]
                    );
                  }}
                />
                <TooltipComp
                  message={"Click to Add, Modify, Delete Brand Details"}
                  openTooltipN={0}
                  target={"brand" + idx}
                />
              </td>
              {/* <td className="tableHeading" className="pt-3">
                <HiPencil
                  id={"edit" + idx}
                  size={22}
                  color="#2B8CD6"
                  onClick={() => editEntityField(idx)}
                />
                <TooltipComp
                  message={"edit"}
                  openTooltipN={0}
                  target={"edit" + idx}
                />
              </td> */}
              <td className="tableHeading" className="pt-3">
                <HiOutlineTrash
                  id={"delete" + idx}
                  size={22}
                  color={inputEntityList.length > 1 ? "#f56" : "#767676"}
                  onClick={() =>
                    inputEntityList.length > 1
                      ? removeEntityField(item.psId, item.id)
                      : ""
                  }
                />
                <TooltipComp
                  message={"delete"}
                  openTooltipN={0}
                  target={"delete" + idx}
                />
              </td>
              {/* {
                        
                            <td className="tableHeading">
                                <HiOutlineTrash size={24} color="#f56" onClick={() => removeField(item.id)}/>
                            </td>  
                        :   <td className="tableHeading">
                                
                            </td>
                    } */}
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
        {isEditable1 && (
          <>
            
            <Button
              id="edit2"
              className="mt-4 mb-4"
              color="secondary"
              style={{ width: 100 }}
              onClick={() => setIsEditable1(!isEditable1)}
            >
              {/* <HiPlus size={24} /> */}
              EDIT
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"edit2"} />
          </>
        )}

        {!isEditable1 && (
          <>
            <Button
              id="add20"
              className="mt-4 mb-4 mr-3"
              color="warning"
              onClick={() => addEntityField()}
              style={{ width: 100 }}
            >
              {/* <HiPlus size={24} /> */}
              ADD
            </Button>
            <TooltipComp message={"add"} openTooltipN={0} target={"add20"} />
            <Button
              id="save26"
              className="mt-4 mb-4 mr-3"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveTopProducts()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save26"} />
          </>
        )}

        <Button
          id="next"
          className="mt-4 mb-4"
          color="dark"
          style={{ width: 100 }}
          disabled={!isEditable || !isEditable1 || !isEditable2}
          onClick={() => {document.getElementById("sidebar10").click()}}
        >
          NEXT
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"next"} openTooltipN={0} target={"next"} />
      </div>
      {/* </TabPane> */}
      {/* </TabContent> */}

      {/* BRANDS MODAL */}
      <Modal
        backdrop="static"
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="modalContainer"
      >
        <ModalHeader toggle={() => setModal(!modal)} className="modalHead">
          Brands{" "}
          <span id="cat2" style={{ color: "green" }}>
            <HiOutlineInformationCircle size={20} color="#fff" />
          </span>
          <TooltipComp
            message={
              "Brand(s) associated with the product/service and % of total Turnover contributed by the Brand(s)"
            }
            openTooltipN={0}
            target="cat2"
          />
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
                <th className="tableHeading">Brand</th>
                <th className="tableHeading">
                  Contribution on to % of Total Turnover
                </th>
                <th className="tableHeading" colSpan={2}></th>
              </tr>
            </thead>

            <tbody>
              {inputBrandList?.map((item, idx) => (
                <tr key={item.id}>
                  <td className="tableHeading" className="pt-3">
                    {" "}
                    {idx + 1}{" "}
                  </td>
                  <td className="tableHeading">
                    <FormGroup className="m-0">
                      <Input
                        type="text"
                        disabled={isEditable2}
                        className={
                          isEditable2 ? "input inputWithoutBg" : "input"
                        }
                        defaultValue={item?.brand}
                        name="brand"
                        onChange={(e) => {
                          if (e.target.value === "" || e.target.value === " ") {
                            setInvalidList([...invalidList, "brand" + idx]);
                          } else {
                            setInvalidList(
                              invalidList?.filter(
                                (item) => item !== "brand" + idx
                              )
                            );
                            handleChangev2(e, idx);
                          }
                        }}
                        invalid={invalidList?.includes("brand" + idx)}
                      />
                    </FormGroup>
                  </td>
                  <td className="tableHeading">
                    <FormGroup className="m-0">
                      <Input
                        type="number"
                        disabled={isEditable2}
                        className={
                          isEditable2 ? "input inputWithoutBg" : "input"
                        }
                        defaultValue={item?.contribution}
                        name="turnover"
                        onChange={(e) => {
                          if (
                            e.target.value.length > 0 &&
                            e.target.value <= 100
                          ) {
                            setInvalidList(
                              invalidList?.filter(
                                (item) => item !== "contribution" + idx
                              )
                            );
                            handleChangev2(e, idx);
                          } else {
                            setInvalidList([
                              ...invalidList,
                              "contribution" + idx,
                            ]);
                          }
                        }}
                        invalid={invalidList?.includes("contribution" + idx)}
                      />
                    </FormGroup>
                  </td>
                  {/* <td className="tableHeading" className="pt-3">
                    <HiPencil
                      size={22}
                      color="#2B8CD6"
                      onClick={() => editBrandField(idx)}
                    />
                  </td> */}
                  <td className="tableHeading" className="pt-3">
                    <HiOutlineTrash
                      size={22}
                      color={inputBrandList.length > 1 ? "#f56" : "#767676"}
                      onClick={() =>
                        inputBrandList.length > 1
                          ? removeBrandField(item.id)
                          : ""
                      }
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
            {isEditable2 && (
              <>
                
                <Button
                  id="edit3"
                  className="mt-4 mb-4"
                  color="secondary"
                  style={{ width: 100 }}
                >
                  {/* <HiPlus size={24} /> */}
                  EDIT
                </Button>
                <TooltipComp
                  message={"add"}
                  openTooltipN={0}
                  target={"edit3"}
                />
              </>
            )}

            {!isEditable2 && (
              <>
                <Button
                  className="mt-4 mb-4 mr-3"
                  color="warning"
                  onClick={() => addBrandField()}
                  style={{ width: 100 }}
                >
                  {/* <HiPlus size={24} /> */}
                  ADD
                </Button>
                <Button
                  className="mt-4 mb-4"
                  color="primary"
                  style={{ width: 100 }}
                  onClick={() => {
                    saveBrands(selectedEntity);
                    setModal(!modal);
                  }}
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
              </>
            )}
          </div>
        </ModalBody>
      </Modal>
      {/* BRANDS MODAL */}

      <Toast error={err} setError={setErr} msg={msg} color={color} />
    </div>
  );
};

export default ProductServices;
