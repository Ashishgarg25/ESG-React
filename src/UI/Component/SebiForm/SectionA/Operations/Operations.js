import React, { useEffect, useState } from "react";
import "@pathofdev/react-tag-input/build/index.css";
// import styles from "./operations.module.css";
import "../../../../../assets/css/styles.css";
import {
  HiPlus,
  HiOutlineTrash,
  HiOutlineBookmarkAlt,
  HiInformationCircle,
  HiOutlineInformationCircle,
  HiPencil,
} from "react-icons/hi";
import {
  Table,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  FormFeedback,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import Toast from "../../../../../utils/Toast/Toast";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import { apiUrl } from "../../../../../config/config";
import { getToken } from "../../../../../utils/LocalStorage/LocalStorage";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

function Operations() {
  const { reportId } = useParams();
  console.log(reportId);
  const token = getToken() || "";
  const config = {
    headers: {
      token: token,
      "Content-type": "application/json",
    },
  };

  const [internationalOffices, setInternationalOffices] = useState(0);
  const [marketServedLocA, setMarketServedLocA] = useState();
  const [turnOverEntity, setTurnOverEntity] = useState();
  const [plantErr, setPlantErr] = useState(false);
  const [officeErr, setOfficeErr] = useState(false);

  const [activeTab, setActiveTab] = useState("1");
  const [nationalTurnOver, setNationalTurnOver] = useState();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [districtList, setDistrictList] = useState([]);
  const [districtList1, setDistrictList1] = useState([]);
  const [districtList2, setDistrictList2] = useState([]);

  const [plantsLocation, setPlantsLocation] = useState({});
  const [servedMarketData, setServedMarketData] = useState({});
  const [topPlants, setTopPlants] = useState({});
  const [servedMarketInternational, setServedMarketInternational] = useState(
    {}
  );
  console.log({ servedMarketInternational });
  const [topInternational, setTopInternational] = useState({});

  // EDIT & TOAST STATES
  const [isEditable, setIsEditable] = useState(false);
  const [isEditable1, setIsEditable1] = useState(false);
  const [isEditable2, setIsEditable2] = useState(false);
  const [isEditable3, setIsEditable3] = useState(false);
  const [isEditable4, setIsEditable4] = useState(false);
  const [isEditable5, setIsEditable5] = useState(false);
  const [isEditable6, setIsEditable6] = useState(false);
  const [isEditable7, setIsEditable7] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [isLoading5, setIsLoading5] = useState(false);
  const [isLoading6, setIsLoading6] = useState(false);
  const [isLoading7, setIsLoading7] = useState(false);

  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  const [data, setData] = useState({});
  const brsrData = useSelector((state) => state);

  let obj = brsrData.brsr.finencial.response.find(
    (o) => o.entityId == reportId
  );
  useEffect(() => {
    setData(obj);
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [inputEntityList, setInputEntityList] = useState([
    {
      ctId: "",
      consumerType: "",
      briefOnConsumer: "",
    },
  ]);
  console.log({ inputEntityList });

  const handleConsumerType = (e, idx) => {
    const { name, value } = e.target;

    setInputEntityList((prevState) => {
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

    // if (name === "consumerType") {
    //   inputEntityList[idx].consumerType = value;
    // } else if (name === "briefOnConsumer") {
    //   inputEntityList[idx].briefOnConsumer = value;
    // }
  };

  const handleServedMarketDataChange = (e, type) => {
    const { name, value } = e.target;
    setServedMarketData((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...(prevState[type] || {}),
          [name]: value,
        },
      };
    });
  };
  const handleServedMarketInterDataChange = (e, type) => {
    const { name, value } = e.target;
    setServedMarketInternational((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...(prevState[type] || {}),
          [name]: value,
        },
      };
    });
  };

  const handleServedTopInterNationalDataChange = (e, type) => {
    const { name, value } = e.target;
    setTopInternational((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...(prevState[type] || {}),
          [name]: value,
        },
      };
    });
  };

  const handleTopPlantsChange = (e, type) => {
    const { name, value } = e.target;
    setTopPlants((prevState) => {
      return {
        ...prevState,
        [type]: {
          ...(prevState[type] || {}),
          [name]: value,
        },
      };
    });
  };

  // const handleCustomerType = (e) => {
  //   setCustomerType(e.target.value);
  // };

  const addEntityField = () => {
    setInputEntityList((pv) => [
      ...pv,
      {
        id: pv.length + 2,
        ctId: "",
        consumerType: "",
        briefOnConsumer: "",
      },
    ]);
  };

  const editEntityField = (idx) => {
    console.log(idx);
  };

  const removeEntityField = async (ctId, id) => {
    const list = inputEntityList.filter((item) => item.id !== id);
    setInputEntityList(list);
    if (ctId !== "") {
      const deleteInputs = await axios({
        method: "DELETE",
        url: `${apiUrl}entity/customer-type`,
        data: {
          reportingId: reportId,
          ctId: ctId,
        },
        headers: {
          token: token,
          "Content-type": "application/json",
        },
      });
      try {
        if (deleteInputs.data.code === 200) {
          getCustomerTypeData();
        }
      } catch (e) {
        console.log({});
      }
    }
  };

  useEffect(() => {
    getLocationData();
    getMarketServedData();
    getEntityTurnOverData();
    getCustomerTypeData();
    getCustomerTypeData();
    getServedMarkets();
    getTopPlantsNational();
    getTopPlantsInternational();
    getCountryList();
    getStateList();
    getServedMarketsInternational();
  }, []);

  // Get Country List

  const getCountryList = async () => {
    const response = await axios.get(
      `${apiUrl}getStateCityByName?country`,
      config
    );
    try {
      if (response.data.code === 200) {
        setCountryList(response.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };
  // Get indian State List
  const getStateList = async () => {
    const response = await axios.get(
      `${apiUrl}getStateCityByName?country=India`,
      config
    );
    console.log(response);
    try {
      if (response.data.code === 200) {
        setStateList(response.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };

  // Get District List By State
  const getDistrictList = async (state) => {
    const response = await axios.get(
      `${apiUrl}getStateCityByName?state=${state}`,
      config
    );
    try {
      if (response.data.code === 200) {
        setDistrictList(response.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };

  const getDistrictList1 = async (state) => {
    const response = await axios.get(
      `${apiUrl}getStateCityByName?state=${state}`,
      config
    );
    try {
      if (response.data.code === 200) {
        setDistrictList1(response.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };
  const getDistrictList2 = async (state) => {
    const response = await axios.get(
      `${apiUrl}getStateCityByName?state=${state}`,
      config
    );
    try {
      if (response.data.code === 200) {
        setDistrictList2(response.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };

  //no. of locations
  const saveLocations = async () => {
    setIsLoading(true);

    const totalPlants =
      plantsLocation.noOfPlantsNational +
      plantsLocation.noOfPlantsInternational;
    const totalOffices =
      plantsLocation.noOfOfficesNational +
      plantsLocation.noOfOfficesInternational;

    if (totalPlants <= 0 && totalOffices <= 0) {
      setMsg(
        "Need to have atleast 1 plant or office in either National or International"
      );
      setIsLoading(false);
      setErr(true);
      setColor("Red");
    } else {
      const body = {
        reportingId: Number(reportId),
        noOfPlantsNational: plantsLocation.noOfPlantsNational,
        noOfOfficesNational: plantsLocation.noOfOfficesNational,
        noOfPlantsInternational: plantsLocation.noOfPlantsInternational,
        noOfOfficesInternational: plantsLocation.noOfOfficesInternational,
      };
      try {
        const locationResponse = await axios.post(
          `${apiUrl}entity/plant-offices`,
          body,
          config
        );
        if (locationResponse.data.code === 200) {
          console.log(locationResponse.data.message);
          console.log(locationResponse.data.data);
          setMsg("Successfully saved data");

          setIsEditable(!isEditable);

          setIsLoading(false);
          setErr(true);
          setColor("Green");
        }
      } catch (e) {
        console.error(e.response.data.data);
        setIsLoading(false);
        setErr(true);
        setMsg("Failed to save data");
        setColor("Red");
      }
    }
  };

  const getLocationData = async () => {
    const res = await axios.get(
      `${apiUrl}entity/plant-offices?reportingId=${reportId}`,
      config
    );
    console.log(res.data.data);
    try {
      if (res.data.code === 200) {
        // res.data.data.data.length > 0
        //   ? setIsEditable(true)
        //   : setIsEditable(false);
        // setPlants(res.data.data.noOfPlantsNational);
        setPlantsLocation(res.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };
  // Market Served Data API Call
  const saveMarketServed = async () => {
    setIsLoading1(true);

    const body = {
      reportingId: Number(reportId),
      nationalCount: marketServedLocA.nationalCount,
      internationalCount: marketServedLocA.internationalCount,
    };
    try {
      const marketServedData = await axios.post(
        `${apiUrl}entity/market-served`,
        body,
        config
      );
      if (marketServedData.data.code === 200) {
        console.log(marketServedData.data.message);
        console.log(marketServedData.data.data);
        setMsg("Successfully saved data");

        setIsEditable1(!isEditable1);

        setIsLoading1(false);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.error(e.response.data.data);
      setIsLoading(false);
      setErr(true);
      setMsg("Failed to save data");
      setColor("Red");
    }
  };

  const getMarketServedData = async () => {
    const res = await axios.get(
      `${apiUrl}entity/market-served?reportingId=${reportId}`,
      config
    );
    console.log(res.data.data);
    console.log();
    try {
      if (res.data.code === 200) {
        setMarketServedLocA(res.data.data);
        res.data.data.data.length > 0
          ? setIsEditable(true)
          : setIsEditable(false);
      }
    } catch (e) {
      console.error({});
    }
  };

  // Entity TurnOver
  const saveEntityTurnOver = async () => {
    setIsLoading2(true);

    const body = {
      reportingId: Number(reportId),
      turnover: turnOverEntity.turnOver,
    };
    try {
      const entityTurnOverResponse = await axios.post(
        `${apiUrl}entity/entity-turnover`,
        body,
        config
      );
      if (entityTurnOverResponse.data.code === 200) {
        console.log(entityTurnOverResponse.data.message);
        console.log(entityTurnOverResponse.data.data);
        setMsg("Successfully saved data");

        setIsEditable2(!isEditable2);

        setIsLoading2(0);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.error(e.response.data.data);
      setIsLoading2(0);
      setErr(true);
      setMsg("Failed to save data");
      setColor("Red");
    }
  };

  const getEntityTurnOverData = async () => {
    const res = await axios.get(
      `${apiUrl}entity/entity-turnover?reportingId=${reportId}`,
      config
    );
    console.log(res.data.data);
    try {
      if (res.data.code === 200) {
        setTurnOverEntity({
          reportId: res.data.data.reportingId,
          turnOver: res.data.data.nationalCount,
        });
        res.data.data.data.length > 0
          ? setIsEditable(true)
          : setIsEditable(false);
      }
    } catch (e) {
      console.error({});
    }
  };

  // Types of Customer API calls

  const saveCustomerType = async () => {
    setIsLoading3(true);

    const body = JSON.stringify({
      reportingId: reportId,
      data: inputEntityList,
    });
    try {
      const customerTypeResponse = await axios.post(
        `${apiUrl}entity/customer-type`,
        body,
        config
      );
      if (customerTypeResponse.data.code === 200) {
        console.log(customerTypeResponse.data.message);
        console.log(customerTypeResponse.data.data);
        setMsg("Successfully saved data");

        setIsEditable3(!isEditable3);

        setIsLoading3(0);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.error(e.response.data.data);
      setIsLoading3(0);
      setErr(true);
      setMsg("Failed to save data");
      setColor("Red");
    }
  };

  const getCustomerTypeData = async () => {
    const CustomerTypeData = await axios.get(
      `${apiUrl}entity/customer-type?reportingId=${reportId}`,
      config
    );
    console.log(CustomerTypeData);
    try {
      if (CustomerTypeData.data.code === 200) {
        // CustomerTypeData.data.data.data.length > 0
        //   ? setIsEditable(true)
        //   : setIsEditable(false);
        setInputEntityList(CustomerTypeData.data.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };

  //18. Market Served By Company
  const saveServedMarketsNational = async () => {
    setIsLoading4(true);

    const body = {
      reportingId: reportId,
      locationType: 1,
      ...servedMarketData,
    };
    try {
      const servedMarketResponse = await axios.post(
        `${apiUrl}entity/mca-plants-contribution`,
        body,
        config
      );
      if (servedMarketResponse.data.code === 200) {
        console.log(servedMarketResponse.data.message);
        console.log(servedMarketResponse.data.data);
        setMsg("Successfully saved data");

        setIsEditable4(!isEditable4);

        setIsLoading4(0);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.error(e.response.data.data);
      setIsLoading4(0);
      setErr(true);
      setMsg("Failed to save data");
      setColor("Red");
    }
  };

  const saveServedMarketsInternational = async () => {
    setIsLoading5(true);

    const body = JSON.stringify({
      reportingId: reportId,
      locationType: 2,
      ...servedMarketInternational,
    });
    try {
      const servedMarketResponse = await axios.post(
        `${apiUrl}entity/mca-plants-contribution`,
        body,
        config
      );
      if (servedMarketResponse.data.code === 200) {
        console.log(servedMarketResponse.data.message);
        console.log(servedMarketResponse.data.data);
        setMsg("Successfully saved data");

        setIsEditable5(!isEditable5);

        setIsLoading5(0);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.error(e.response.data.data);
      setIsLoading5(0);
      setErr(true);
      setMsg("Failed to save data");
      setColor("Red");
    }
  };

  const getServedMarkets = async () => {
    const servedMarketData = await axios.get(
      `${apiUrl}entity/mca-plants-contribution?reportingId=${reportId}&locationType=1`,
      config
    );
    try {
      if (servedMarketData.data.code === 200) {
        setServedMarketData(servedMarketData.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };

  const getServedMarketsInternational = async () => {
    const servedMarketData = await axios.get(
      `${apiUrl}entity/mca-plants-contribution?reportingId=${reportId}&locationType=2`,
      config
    );
    console.log(servedMarketData);
    try {
      if (servedMarketData.data.code === 200) {
        setServedMarketInternational(servedMarketData.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };

  // Top Plants a. National

  const saveTopPlantsNational = async () => {
    setIsLoading6(true);

    const body = JSON.stringify({
      reportingId: reportId,
      locationType: 1,
      ...topPlants,
    });
    try {
      const topPlantsResponse = await axios.post(
        `${apiUrl}entity/plants-contribution`,
        body,
        config
      );
      if (topPlantsResponse.data.code === 200) {
        console.log(topPlantsResponse.data.message);
        console.log(topPlantsResponse.data.data);
        setMsg("Successfully saved data");

        setIsEditable6(!isEditable6);

        setIsLoading6(0);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.error(e.response.data.data);
      setIsLoading6(0);
      setErr(true);
      setMsg("Failed to save data");
      setColor("Red");
    }
  };

  const getTopPlantsNational = async () => {
    const topPlantsData = await axios.get(
      `${apiUrl}entity/plants-contribution?reportingId=${reportId}&locationType=1`,
      config
    );
    try {
      if (topPlantsData.data.code === 200) {
        topPlantsData.data.data.data.length > 0
          ? setIsEditable(true)
          : setIsEditable(false);
        setTopPlants(topPlantsData.data.data);
      }
    } catch (e) {
      console.error({});
    }
  };

  // Top Plants b. International
  const saveTopPlantsInternational = async () => {
    setIsLoading7(true);

    const body = JSON.stringify({
      reportingId: reportId,
      locationType: 2,
      ...topInternational,
    });
    try {
      const topPlantsResponse = await axios.post(
        `${apiUrl}entity/plants-contribution`,
        body,
        config
      );
      if (topPlantsResponse.data.code === 200) {
        console.log(topPlantsResponse.data.message);
        console.log(topPlantsResponse.data.data);
        setMsg("Successfully saved data");

        setIsEditable7(!isEditable7);

        setIsLoading7(0);
        setErr(true);
        setColor("Green");
      }
    } catch (e) {
      console.error(e.response.data.data);
      setIsLoading7(0);
      setErr(true);
      setMsg("Failed to save data");
      setColor("Red");
    }
  };

  const getTopPlantsInternational = async () => {
    const topPlantsData = await axios.get(
      `${apiUrl}entity/plants-contribution?reportingId=${reportId}&locationType=2`,
      config
    );
    try {
      if (topPlantsData.data.code === 200) {
        setTopInternational(topPlantsData?.data.data);
      }
    } catch (e) {
      console.error({});
    }
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
        <span className="breadCrumbActive"> Operations </span>
      </div>
      <div className="float-right" style={{ color: "#f56" }}>
        <span>{data.companyName}</span> - <span>{data.reportingBoundary}</span>{" "}
        - <span>FY {data.financialYear}</span> - <span>(Q{data.quarter})</span>
      </div>
      <h2 className="heading" style={{ color: "#fff" }}>
        III Operations
      </h2>

      {/* <TabContent activeTab={activeTab} className="mt-3">
        <TabPane tabId="1"> */}
      <h4 className="subHeading">
        16. Number of locations where plants and/or operations/offices of the
        entity are situated
        <span id="cat9" style={{ color: "green" }}>
          {" "}
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={
            "locations of plants (in case of manufacturing businesses) and/or operations/offices (in case of non-manufacturing)"
          }
          openTooltipN={0}
          target="cat9"
        />
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
            <th className="tableHeading">Location</th>
            <th className="tableHeading">No. of Plants </th>
            <th className="tableHeading">No. of Offices</th>
            <th className="tableHeading">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading" style={{ textAlign: "left" }}>
              &nbsp; &nbsp; National
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  className={isEditable ? "input inputWithoutBg" : "input"}
                  disabled={isEditable}
                  name="plants"
                  placeholder="No. of Plants"
                  defaultValue={plantsLocation?.noOfPlantsNational}
                  onChange={(e) => {
                    if (e.target.value === " ") {
                      setPlantErr(true);
                    } else {
                      setPlantErr(false);
                      // setPlants(e.target.value);
                      setPlantsLocation({
                        ...plantsLocation,
                        noOfPlantsNational: e.target.value,
                      });
                    }
                  }}
                  invalid={plantErr === true}
                />
                <FormFeedback>Please enter valid no. of plant</FormFeedback>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="No. of Offices"
                  className={isEditable ? "input inputWithoutBg" : "input"}
                  disabled={isEditable}
                  name="offices"
                  defaultValue={plantsLocation?.noOfOfficesNational}
                  onChange={(e) => {
                    if (e.target.value === " ") {
                      setOfficeErr(true);
                    } else {
                      setOfficeErr(false);
                      // setOffices(e.target.value);
                      setPlantsLocation({
                        ...plantsLocation,
                        noOfOfficesNational: e.target.value,
                      });
                    }
                  }}
                  invalid={officeErr === true}
                />
                <FormFeedback>Please enter valid no. of offices</FormFeedback>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  defaultValue={plantsLocation?.totalNational}
                  value={
                    parseInt(plantsLocation?.noOfPlantsNational || 0) +
                    parseInt(plantsLocation?.noOfOfficesNational || 0)
                  }
                  className="input inputWithoutBg"
                  name="total"
                  placeholder="Total"
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ textAlign: "left" }}>
              &nbsp; &nbsp; International
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="text"
                  placeholder="No. of Plants"
                  className={isEditable ? "input inputWithoutBg" : "input"}
                  disabled={isEditable}
                  name="text"
                  defaultValue={plantsLocation?.noOfPlantsInternational}
                  onChange={(e) => {
                    // setInternationalPlants(e.target.value)
                    setPlantsLocation({
                      ...plantsLocation,
                      noOfPlantsInternational: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="text"
                  placeholder="No. of Offices"
                  className={isEditable ? "input inputWithoutBg" : "input"}
                  disabled={isEditable}
                  name="text"
                  defaultValue={plantsLocation?.noOfOfficesInternational}
                  onChange={(e) => {
                    setInternationalOffices(e.target.value);
                    setPlantsLocation({
                      ...plantsLocation,
                      noOfOfficesInternational: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="text"
                  placeholder="Total"
                  className="input inputWithoutBg"
                  name="text"
                  defaultValue={plantsLocation?.totalInternational}
                  value={
                    parseInt(plantsLocation?.noOfPlantsInternational || 0) +
                    parseInt(plantsLocation?.noOfOfficesInternational || 0)
                  }
                />
              </FormGroup>
            </td>
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
        {isEditable && (
          <>
            <Button
              id="edit3"
              className="mt-4 mb-4"
              color="warning"
              style={{ width: 100 }}
              onClick={() => setIsEditable(!isEditable)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
          </>
        )}

        {!isEditable && (
          <>
            <Button
              id="save4"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveLocations()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save4"} />
          </>
        )}
      </div>
      {/* </TabPane> */}

      {/* <TabPane tabId="2"> */}
      <h4 className="subHeading">17. Markets served by Entity</h4>
      <h4 className="label">a. Number of locations</h4>
      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading">National </th>
            <th className="tableHeading">International </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="National (No. of States)"
                  className={isEditable1 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable1}
                  name="text"
                  defaultValue={marketServedLocA?.nationalCount}
                  onChange={(e) => {
                    setMarketServedLocA({
                      ...marketServedLocA,
                      nationalCount: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="International (No. of Countries)"
                  className={isEditable1 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable1}
                  name="text"
                  defaultValue={marketServedLocA?.internationalCount}
                  onChange={(e) => {
                    setMarketServedLocA({
                      ...marketServedLocA,
                      internationalCount: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </td>
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
        {isEditable1 && (
          <>
            <Button
              id="edit2"
              className="mt-4 mb-4"
              color="warning"
              style={{ width: 100 }}
              onClick={() => setIsEditable1(!isEditable1)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit2"} />
          </>
        )}

        {!isEditable1 && (
          <>
            <Button
              id="save5"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveMarketServed()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save5"} />
          </>
        )}
      </div>

      <Row className="mb-3">
        <Col md={12}>
          <FormGroup className="mt-1">
            <Label className="label">
              b. Contribution of exports as a percentage of the total turnover
              of the entity{" "}
              <span style={{ fontSize: 12, color: "#efefef" }}>( in % )</span>{" "}
            </Label>
            <Input
              className={isEditable2 ? "input inputWithoutBg" : "input"}
              disabled={isEditable2}
              type="number"
              rows={3}
              name="financialYear"
              placeholder="Export Contribution in %"
              defaultValue={turnOverEntity?.turnOver}
              onChange={(e) =>
                setTurnOverEntity({
                  ...turnOverEntity,
                  turnOver: e.target.value,
                })
              }
            />
          </FormGroup>
        </Col>
      </Row>

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
              id="edit6"
              className="mt-4 mb-4"
              color="warning"
              style={{ width: 100 }}
              onClick={() => setIsEditable2(!isEditable2)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit6"} />
          </>
        )}

        {!isEditable2 && (
          <>
            <Button
              id="save4"
              className=""
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveEntityTurnOver()}
            >
              {/* <HiOutlineBookmarkAlt size={24} /> */}
              {isLoading2 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save4"} />
          </>
        )}
      </div>

      <Label className="label">
        c. A brief on types of customers
        <span style={{ fontSize: 12, color: "#efefef" }}>( in % )</span>{" "}
      </Label>

      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading">S.No.</th>
            <th className="tableHeading">Type of Customer</th>
            <th className="tableHeading">Brief on Customer</th>
            <th className="tableHeading" colSpan={2}></th>
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
                <FormGroup className="mt-1">
                  <select
                    name="consumerType"
                    value={item?.consumerType}
                    className={isEditable3 ? "select inputWithoutBg" : "select"}
                    disabled={isEditable3}
                    onChange={(e) => {
                      handleConsumerType(e, idx);
                    }}
                  >
                    {" "}
                    <option selected value="undefined">
                      Select...
                    </option>
                    <option value="1">Customer Type 1</option>
                    <option value="2">Customer Type 2</option>
                    <option value="3">Customer Type 3</option>
                  </select>
                </FormGroup>
              </td>
              <td className="tableHeading">
                <FormGroup className="mt-1">
                  <Input
                    className={isEditable3 ? "input inputWithoutBg" : "input"}
                    disabled={isEditable3}
                    type="textarea"
                    rows={1}
                    name="briefOnConsumer"
                    placeholder="Brief on Type of Customer"
                    defaultValue={item?.briefOnConsumer}
                    onChange={(e) => {
                      handleConsumerType(e, idx);
                    }}
                  />
                </FormGroup>
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
                      ? removeEntityField(item.ctId, item.id)
                      : ""
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
        {isEditable3 && (
          <>
            
            <Button
              id="edit20"
              className="mt-4 mb-4"
              color="secondary"
              onClick={() => setIsEditable3(!isEditable3)}
              style={{ width: 100 }}
            >
              {/* <HiPlus size={24} /> */}
              EDIT
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit20"} />
          </>
        )}

        {!isEditable3 && (
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
              id="save24"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveCustomerType()}
            >
              {/* <HiOutlineBookmarkAlt size={24} /> */}
              {isLoading3 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save24"} />
          </>
        )}

        {/* <Button
              id="next"
              className="mt-4 mb-4"
              color="dark"
              style={{ width: 100 }}
            >
              
              NEXT
            </Button>
            <TooltipComp message={"next"} openTooltipN={0} target={"next"} /> */}
      </div>

      <h4 className="subHeading">
        {" "}
        <span style={{ color: "#fcdb0a" }}>
          {" "}
          18. Markets served by the Company
        </span>
      </h4>
      <h4 className="label" style={{ color: "#fcdb0a", paddingTop: 12 }}>
        {" "}
        b. Location of top 3 Markets by contribution to Turnover{" "}
      </h4>
      <h4 className="label" style={{ color: "#fcdb0a" }}>
        {" "}
        (i). National{" "}
      </h4>

      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading" style={{ width: 200 }}>
              Market(State){" "}
            </th>
            <th className="tableHeading" style={{ width: 200 }}>
              Turnover{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable4 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable4}
                  value={servedMarketData?.loc1?.locName}
                  name="locName"
                  onChange={(e) => handleServedMarketDataChange(e, "loc1")}
                >
                  <option>Select...</option>
                  {stateList.map((items, index) => {
                    return (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="State wise Turnover"
                  name="turnover"
                  value={servedMarketData?.loc1?.turnover}
                  onChange={(e) => handleServedMarketDataChange(e, "loc1")}
                  className={isEditable4 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable4}
                />
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable4 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable4}
                  name="locName"
                  value={servedMarketData?.loc2?.locName}
                  onChange={(e) => handleServedMarketDataChange(e, "loc2")}
                >
                  <option>Select...</option>
                  {stateList.map((items, index) => {
                    return <option key={index}>{items} </option>;
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="State wise Turnover"
                  name="turnover"
                  value={servedMarketData?.loc2?.turnover}
                  onChange={(e) => handleServedMarketDataChange(e, "loc2")}
                  className={isEditable4 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable4}
                />
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable4 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable4}
                  name="locName"
                  value={servedMarketData?.loc3?.locName}
                  onChange={(e) => handleServedMarketDataChange(e, "loc3")}
                >
                  <option>Select...</option>
                  {stateList.map((items, index) => {
                    return <option key={index}>{items}</option>;
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="State wise Turnover"
                  name="turnover"
                  value={servedMarketData?.loc3?.turnover}
                  onChange={(e) => handleServedMarketDataChange(e, "loc3")}
                  className={isEditable4 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable4}
                />
              </FormGroup>
            </td>
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
        {isEditable4 && (
          <>
            <Button
              id="edit1"
              className="mt-4 mb-4"
              color="warning"
              style={{ width: 100 }}
              onClick={() => setIsEditable4(!isEditable4)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit1"} />
          </>
        )}

        {!isEditable4 && (
          <>
            <Button
              id="save5"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveServedMarketsNational()}
            >
              {isLoading4 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save5"} />
          </>
        )}
      </div>

      <h4 className="label" style={{ color: "#fcdb0a" }}>
        {" "}
        (ii). International{" "}
      </h4>

      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading" style={{ width: 200 }}>
              Country{" "}
            </th>
            <th className="tableHeading" style={{ width: 200 }}>
              Turnover{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable5 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable5}
                  value={servedMarketInternational?.loc1?.locName}
                  name="locName"
                  onChange={(e) => handleServedMarketInterDataChange(e, "loc1")}
                >
                  <option>Select...</option>
                  {countryList.map((items, index) => {
                    return (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="Country wise Turnover"
                  name="turnover"
                  value={servedMarketInternational?.loc1?.turnover}
                  onChange={(e) => handleServedMarketInterDataChange(e, "loc1")}
                  className={isEditable5 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable5}
                />
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable5 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable5}
                  name="locName"
                  value={servedMarketInternational?.loc2?.locName}
                  onChange={(e) => handleServedMarketInterDataChange(e, "loc2")}
                >
                  <option>Select...</option>
                  {countryList.map((items, index) => {
                    return <option key={index}>{items}</option>;
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="Country wise Turnover"
                  name="turnover"
                  value={servedMarketInternational?.loc2?.turnover}
                  onChange={(e) => handleServedMarketInterDataChange(e, "loc2")}
                  className={isEditable5 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable5}
                />
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable5 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable5}
                  name="locName"
                  value={servedMarketInternational?.loc3?.locName}
                  onChange={(e) => handleServedMarketInterDataChange(e, "loc3")}
                >
                  <option>Select...</option>
                  {countryList.map((items, index) => {
                    return <option key={index}>{items}</option>;
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="Country wise Turnover"
                  className={isEditable5 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable5}
                  name="turnover"
                  value={servedMarketInternational?.loc3?.turnover}
                  onChange={(e) => handleServedMarketInterDataChange(e, "loc3")}
                />
              </FormGroup>
            </td>
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
        {isEditable5 && (
          <>
            <Button
              id="edit0"
              className="mt-4 mb-4"
              color="warning"
              style={{ width: 100 }}
              onClick={() => setIsEditable5(!isEditable5)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit0"} />
          </>
        )}

        {!isEditable5 && (
          <>
            <Button
              id="save5"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveServedMarketsInternational()}
            >
              {isLoading5 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save5"} />
          </>
        )}
      </div>
      {/* </TabPane> */}

      {/* <TabPane tabId="3"> */}
      <h4 className="subHeading" style={{ color: "#fcdb0a" }}>
        Location of top 3 plants or operation / offices in India by contribution
        to turnover{" "}
        <span id="cat9" style={{ color: "green" }}>
          {" "}
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={
            "locations of top 3 plants (in case of manufacturing businesses) and/or operations/offices (in case of non-manufacturing)"
          }
          openTooltipN={0}
          target="cat9"
        />
      </h4>
      <h4 className="label" style={{ color: "#fcdb0a" }}>
        {" "}
        a. National{" "}
      </h4>

      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading" style={{ width: 200 }}>
              State{" "}
            </th>
            <th className="tableHeading">Turnover </th>
            <th className="tableHeading" style={{ width: 200 }}>
              District{" "}
            </th>
            <th className="tableHeading">
              Category A
              <span id="cat1" style={{ color: "green" }}>
                {" "}
                <HiOutlineInformationCircle size={20} color="#fff" />
              </span>
              <TooltipComp
                message={
                  "In or within 50 km of protected areas like National Parks, Wild life Sanctuaries, Biosphere Reserves, Wetlands, etc"
                }
                openTooltipN={0}
                target="cat1"
              />
            </th>
            <th className="tableHeading">
              Category B
              <span id="cat2" style={{ color: "green" }}>
                {" "}
                <HiOutlineInformationCircle size={20} color="#fff" />
              </span>
              <TooltipComp
                message={"In or within 50 km of Biodiversity Hotspots"}
                openTooltipN={0}
                target="cat2"
              />
            </th>
            <th className="tableHeading">
              Category C
              <span id="cat3" style={{ color: "green" }}>
                {" "}
                <HiOutlineInformationCircle size={20} color="#fff" />
              </span>
              <TooltipComp
                message={
                  "In high water-stressed zones defined as “Over-exploited” or “critical” by the Central Groundwater Board"
                }
                openTooltipN={0}
                target="cat3"
              />
            </th>
            <th className="tableHeading">
              Category D
              <span id="cat4" style={{ color: "green" }}>
                {" "}
                <HiOutlineInformationCircle size={20} color="#fff" />
              </span>
              <TooltipComp
                message={"Within Coastal Regulation Zones"}
                openTooltipN={0}
                target="cat4"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable6 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable6}
                  value={topPlants?.loc1?.locName}
                  name="locName"
                  onChange={(e) => {
                    handleTopPlantsChange(e, "loc1");
                    getDistrictList(e.target.value);
                  }}
                >
                  <option>Select...</option>
                  {stateList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                  ;
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="State wise Turnover"
                  name="turnover"
                  onChange={(e) => handleTopPlantsChange(e, "loc1")}
                  className={isEditable6 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable6}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable6 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable6}
                  value={topPlants?.loc1?.district}
                  name="district"
                  onChange={(e) => handleTopPlantsChange(e, "loc1")}
                >
                  <option>Select...</option>
                  {districtList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                  ;
                </select>
              </FormGroup>
            </td>

            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryA"
                        checked={topPlants?.loc1?.categoryA == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc1");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryA"
                        checked={topPlants?.loc1?.categoryA == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc1");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryB"
                        checked={topPlants?.loc1?.categoryB == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc1");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryB"
                        checked={topPlants?.loc1?.categoryB == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc1");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryC"
                        checked={topPlants?.loc1?.categoryC == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc1");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryC"
                        checked={topPlants?.loc1?.categoryC == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc1");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryD"
                        checked={topPlants?.loc1?.categoryC == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc1");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryD"
                        checked={topPlants?.loc1?.categoryD == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc1");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
          </tr>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable6 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable6}
                  value={topPlants?.loc2?.locName}
                  name="locName"
                  onChange={(e) => {
                    handleTopPlantsChange(e, "loc2");
                    getDistrictList1(e.target.value);
                  }}
                >
                  <option>Select...</option>
                  {stateList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                  ;
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="State wise Turnover"
                  name="turnover"
                  onChange={(e) => handleTopPlantsChange(e, "loc2")}
                  className={isEditable6 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable6}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable6 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable6}
                  value={topPlants?.loc2?.district}
                  name="district"
                  onChange={(e) => handleTopPlantsChange(e, "loc2")}
                >
                  <option>Select...</option>
                  {districtList1.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                  ;
                </select>
              </FormGroup>
            </td>

            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryA"
                        checked={topPlants?.loc2?.categoryA == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc2");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryA"
                        checked={topPlants?.loc2?.categoryA == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc2");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label check>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryB"
                        checked={topPlants?.loc2?.categoryB == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc2");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryB"
                        checked={topPlants?.loc2?.categoryB == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc2");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryC"
                        checked={topPlants?.loc2?.categoryC == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc2");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryC"
                        checked={topPlants?.loc2?.categoryC == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc2");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryD"
                        checked={topPlants?.loc2?.categoryD == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc2");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryD"
                        checked={topPlants?.loc2?.categoryD == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc2");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
          </tr>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable6 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable6}
                  value={topPlants?.loc3?.locName}
                  name="locName"
                  onChange={(e) => {
                    handleTopPlantsChange(e, "loc3");
                    getDistrictList2(e.target.value);
                  }}
                >
                  <option>Select...</option>
                  {stateList.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                  ;
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="State wise Turnover"
                  name="turnover"
                  onChange={(e) => handleTopPlantsChange(e, "loc3")}
                  className={isEditable6 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable6}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable6 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable6}
                  value={topPlants?.loc3?.district}
                  name="district"
                  onChange={(e) => handleTopPlantsChange(e, "loc3")}
                >
                  <option>Select...</option>
                  {districtList2.map((item, index) => {
                    return (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    );
                  })}
                  ;
                </select>
              </FormGroup>
            </td>

            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryA"
                        checked={topPlants?.loc3?.categoryA == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc3");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryA"
                        checked={topPlants?.loc3?.categoryA == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc3");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryB"
                        checked={topPlants?.loc3?.categoryB == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc3");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryB"
                        checked={topPlants?.loc3?.categoryB == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc3");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryC"
                        checked={topPlants?.loc3?.categoryC == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc3");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryC"
                        checked={topPlants?.loc3?.categoryC == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc3");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
            <td className="tableHeading">
              <Row>
                <Col xs={5} md={5} className="ml-3">
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryD"
                        checked={topPlants?.loc3?.categoryD == 1}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc3");
                        }}
                        value={1}
                      />
                      Yes
                    </Label>
                  </FormGroup>
                </Col>
                <Col xs={5} md={5}>
                  <FormGroup check className="mt-1">
                    <Label>
                      <Input
                        disabled={isEditable6}
                        type="radio"
                        name="categoryD"
                        checked={topPlants?.loc3?.categoryD == 0}
                        onChange={(e) => {
                          handleTopPlantsChange(e, "loc3");
                        }}
                        value={0}
                      />
                      No
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </td>
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
        {isEditable6 && (
          <>
            <Button
              id="edit4"
              className="mt-4 mb-4"
              color="warning"
              style={{ width: 100 }}
              onClick={() => setIsEditable6(!isEditable6)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit4"} />
          </>
        )}

        {!isEditable6 && (
          <>
            <Button
              id="save5"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveTopPlantsNational()}
            >
              {isLoading6 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save5"} />
          </>
        )}
      </div>

      <h4 className="subHeading" style={{ color: "#fcdb0a" }}>
        Location of top 3 plants or operation / offices in foreign countries by
        contribution to turnover{" "}
        <span id="cat9" style={{ color: "green" }}>
          {" "}
          <HiOutlineInformationCircle size={20} color="#fff" />
        </span>
        <TooltipComp
          message={
            "locations of top 3 plants (in case of manufacturing businesses) and/or operations/offices (in case of non-manufacturing)"
          }
          openTooltipN={0}
          target="cat9"
        />
      </h4>

      <h4 className="label" style={{ color: "#fcdb0a" }}>
        {" "}
        b. International{" "}
      </h4>
      <Table
        dark
        size="sm"
        className="text-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading" style={{ width: 200 }}>
              Country{" "}
            </th>
            <th className="tableHeading" style={{ width: 200 }}>
              Turnover{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable7 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable7}
                  value={topInternational?.loc1?.locName}
                  name="locName"
                  onChange={(e) =>
                    handleServedTopInterNationalDataChange(e, "loc1")
                  }
                >
                  <option>Select...</option>
                  {countryList.map((items, index) => {
                    return (
                      <option key={index} value={items}>
                        {items}
                      </option>
                    );
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="Country wise Turnover"
                  className={isEditable7 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable7}
                  name="turnover"
                  value={topInternational?.loc1?.turnover}
                  onChange={(e) =>
                    handleServedTopInterNationalDataChange(e, "loc1")
                  }
                />
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable7 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable7}
                  name="locName"
                  value={topInternational?.loc2?.locName}
                  onChange={(e) =>
                    handleServedTopInterNationalDataChange(e, "loc2")
                  }
                >
                  <option>Select...</option>
                  {countryList.map((items, index) => {
                    return <option key={index}>{items}</option>;
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="Country wise Turnover"
                  name="turnover"
                  value={topInternational?.loc2?.turnover}
                  onChange={(e) =>
                    handleServedTopInterNationalDataChange(e, "loc2")
                  }
                  className={isEditable7 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable7}
                />
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <select
                  className={isEditable7 ? "select inputWithoutBg" : "select"}
                  disabled={isEditable7}
                  name="locName"
                  value={topInternational?.loc3?.locName}
                  onChange={(e) =>
                    handleServedTopInterNationalDataChange(e, "loc3")
                  }
                >
                  <option>Select...</option>
                  {countryList.map((items, index) => {
                    return <option key={index}>{items}</option>;
                  })}
                </select>
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  placeholder="Country wise Turnover"
                  className={isEditable7 ? "input inputWithoutBg" : "input"}
                  disabled={isEditable7}
                  name="turnover"
                  value={topInternational?.loc3?.turnover}
                  onChange={(e) =>
                    handleServedTopInterNationalDataChange(e, "loc3")
                  }
                />
              </FormGroup>
            </td>
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
        {isEditable7 && (
          <>
            <Button
              id="edit5"
              className="mt-4 mb-4"
              color="warning"
              style={{ width: 100 }}
              onClick={() => setIsEditable7(!isEditable7)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit5"} />
          </>
        )}

        {!isEditable7 && (
          <>
            <Button
              id="save5"
              className="mt-4 mb-4 mr-3"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveTopPlantsInternational()}
            >
              {isLoading7 ? (
                <div
                  class="spinner-border spinner-border-sm text-light"
                  role="status"
                ></div>
              ) : (
                "SAVE"
              )}
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"save"} openTooltipN={0} target={"save5"} />
          </>
        )}

        <Button
          id="next"
          className="mt-4 mb-4"
          color="dark"
          style={{ width: 100 }}
          disabled={
            !isEditable ||
            !isEditable1 ||
            !isEditable2 ||
            !isEditable3 ||
            !isEditable4 ||
            !isEditable5 ||
            !isEditable6 ||
            !isEditable7
          }
          onClick={() => {document.getElementById("sidebar11").click()}}
        >
          NEXT
          {/* <HiOutlineBookmarkAlt size={24} /> */}
        </Button>
        <TooltipComp message={"next"} openTooltipN={0} target={"next"} />
      </div>
      {/* </TabPane> */}

      {/* <TabPane tabId="4"> */}

      {/* </TabPane> */}
      {/* </TabContent> */}
      <Toast error={err} setError={setErr} msg={msg} color={color} />
    </div>
  );
}

export default Operations;
