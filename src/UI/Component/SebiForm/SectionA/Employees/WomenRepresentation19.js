import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, FormGroup, Input, Button } from "reactstrap";
import { apiUrl } from "../../../../../config/config";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import Toast from "../../../../../utils/Toast/Toast";

const WomenRepresentation19 = (props) => {
  const [womenRepresentation, setWomenRepresentation] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  const getWomenRepresentation = async () => {
    const response = await axios.get(
      `${apiUrl}entity/women-representation?reportingId=${props.data.reportingId}`,
      props.data.config
    );

    try {
      if (response.data.code === 200) {
        setWomenRepresentation(response.data.data);
      }
    } catch {
      console.error({});
    }
  };
  useEffect(() => {
    getWomenRepresentation();
  }, []);

  const saveWomenRepresentation = async () => {
    setIsLoading(true);

    const body = JSON.stringify({
      reportingId: props.data.reportingId,
      bod: {
        bkCount: womenRepresentation?.bod?.bkCount,
        bkFemaleCount: womenRepresentation?.bod?.bkFemaleCount,
      },
      kmp: {
        bkCount: womenRepresentation?.kmp?.bkCount,
        bkFemaleCount: womenRepresentation?.kmp?.bkFemaleCount,
      },
    });
    try {
      const employeeRes = await axios.post(
        `${apiUrl}entity/women-representation`,
        body,
        props.data.config
      );
      if (employeeRes.data.code === 200) {
        console.log(employeeRes.data.message);
        console.log(employeeRes.data.data);

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
  };

  return (
    <>
      <Table
        dark
        size="sm"
        className="number-center"
        bordered
        style={{ borderColor: "#2E3439" }}
      >
        <thead className="tableHead">
          <tr>
            <th className="tableHeading" rowSpan={2}></th>
            <th className="tableHeading" rowSpan={2}>
              Total{" "}
            </th>
            <th className="tableHeading" colSpan={2}>
              No. and percentage of Females{" "}
            </th>
          </tr>
          <tr>
            <th className="tableHeading">No.</th>
            <th className="tableHeading">% (No. of Females / Total)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading" style={{ textAlign: "left" }}>
              {" "}
              &nbsp; &nbsp; Board of Directors
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="total"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="number"
                  defaultValue={womenRepresentation?.bod?.bkCount}
                  onChange={(e) => {
                    setWomenRepresentation({
                      ...womenRepresentation,
                      bod: {
                        ...womenRepresentation.bod,
                        bkCount: e.target.value,
                      },
                    });
                  }}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="number"
                  defaultValue={womenRepresentation?.bod?.bkFemaleCount}
                  onChange={(e) => {
                    setWomenRepresentation({
                      ...womenRepresentation,
                      bod: {
                        ...womenRepresentation.bod,
                        bkFemaleCount: e.target.value,
                      },
                    });
                  }}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  placeholder="percentage"
                  className="input inputWithoutBg"
                  name="number"
                  defaultValue={womenRepresentation?.bod?.femalePercent}
                  value={(
                    (parseInt(womenRepresentation?.bod?.bkFemaleCount || 0) /
                      parseInt(womenRepresentation?.bod?.bkCount || 0)) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td className="tableHeading" style={{ textAlign: "left" }}>
              {" "}
              &nbsp; &nbsp; Key Management Personel
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="total"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="number"
                  defaultValue={womenRepresentation?.kmp?.bkCount}
                  onChange={(e) => {
                    setWomenRepresentation({
                      ...womenRepresentation,
                      kmp: {
                        ...womenRepresentation.kmp,
                        bkCount: e.target.value,
                      },
                    });
                  }}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="number"
                  defaultValue={womenRepresentation?.kmp?.bkFemaleCount}
                  onChange={(e) => {
                    setWomenRepresentation({
                      ...womenRepresentation,
                      kmp: {
                        ...womenRepresentation.kmp,
                        bkFemaleCount: e.target.value,
                      },
                    });
                  }}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  placeholder="percentage"
                  className="input inputWithoutBg"
                  name="number"
                  defaultValue={womenRepresentation?.kmp?.femalePercent}
                  value={(
                    (parseInt(womenRepresentation?.kmp?.bkFemaleCount || 0) /
                      parseInt(womenRepresentation?.kmp?.bkCount || 0)) *
                    100
                  ).toFixed(1)}
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
        {!isEditable && (
          <>
            <Button
              id="edit3"
              className="mt-4 mb-4"
              color="secondary"
              style={{ width: 100 }}
              onClick={() => setIsEditable(!isEditable)}
            >
              EDIT
              {/* <HiOutlineBookmarkAlt size={24} /> */}
            </Button>
            <TooltipComp message={"edit"} openTooltipN={0} target={"edit3"} />
          </>
        )}

        {isEditable && (
          <>
            <Button
              id="save27"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveWomenRepresentation()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save27"} />
          </>
        )}
        <Toast error={err} setError={setErr} msg={msg} color={color} />
      </div>
    </>
  );
};

export default WomenRepresentation19;
