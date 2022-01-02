import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, FormGroup, Input, Button } from "reactstrap";
import { apiUrl } from "../../../../../config/config";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import Toast from "../../../../../utils/Toast/Toast";

const Participation20 = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");
  const [pirWomen, setPirWomen] = useState();

  const getPirWomen = async () => {
    const response = await axios.get(
      `${apiUrl}entity/pir-women?reportingId=${props.data.reportingId}`,
      props.data.config
    );

    try {
      if (response.data.code === 200) {
        setPirWomen(response.data.data);
      }
    } catch {
      console.error({});
    }
  };

  useEffect(() => {
    getPirWomen();
  }, []);

  const savePirWomen = async () => {
    setIsLoading(true);

    const body = JSON.stringify({
      reportingId: props.data.config,
      bod: {
        bkCount: pirWomen?.bod?.bkCount,
        bkFemaleCount: pirWomen?.bod?.bkFemaleCount,
        bkFemaleCountDifferentlyAbled:
          pirWomen?.bod?.bkFemaleCountDifferentlyAbled,
      },
      kmp: {
        bkCount: pirWomen?.kmp?.bkCount,
        bkFemaleCount: pirWomen?.kmp?.bkFemaleCount,
        bkFemaleCountDifferentlyAbled:
          pirWomen?.kmp?.bkFemaleCountDifferentlyAbled,
      },
    });

    try {
      const employeeRes = await axios.post(
        `${apiUrl}entity/pir-women`,
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
              No. of Females (including differently abled)
            </th>
            <th className="tableHeading" colSpan={2}>
              No. of females who are differently abled persons
            </th>
          </tr>
          <tr>
            <th className="tableHeading">No.</th>
            <th className="tableHeading">% </th>
            <th className="tableHeading">No.</th>
            <th className="tableHeading">% </th>
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
                  name="bdt"
                  defaultValue={pirWomen?.bod?.bkCount}
                  onChange={(e) => {
                    setPirWomen({
                      ...pirWomen,
                      bod: {
                        ...pirWomen?.bod,
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
                  name="bdfi"
                  defaultValue={pirWomen?.bod?.bkFemaleCount}
                  onChange={(e) => {
                    setPirWomen({
                      ...pirWomen,
                      bod: {
                        ...pirWomen?.bod,
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
                  defaultValue={pirWomen?.bod?.femalePercent}
                  value={(
                    (parseInt(pirWomen?.bod?.bkFemaleCount || 0) /
                      parseInt(pirWomen?.bod?.bkCount || 0)) *
                    100
                  ).toFixed(1)}
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
                  name="bdfd"
                  defaultValue={pirWomen?.bod?.bkFemaleCountDifferentlyAbled}
                  onChange={(e) => {
                    setPirWomen({
                      ...pirWomen,
                      bod: {
                        ...pirWomen?.bod,
                        bkFemaleCountDifferentlyAbled: e.target.value,
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
                  defaultValue={pirWomen?.bod?.femaleDifferentlyAbledPercent}
                  value={(
                    (parseInt(
                      pirWomen?.bod?.bkFemaleCountDifferentlyAbled || 0
                    ) /
                      parseInt(pirWomen?.bod?.bkCount || 0)) *
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
                  name="kpt"
                  defaultValue={pirWomen?.kmp?.bkCount}
                  onChange={(e) => {
                    setPirWomen({
                      ...pirWomen,
                      kmp: {
                        ...pirWomen?.kmp,
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
                  name="kpfi"
                  defaultValue={pirWomen?.kmp?.bkFemaleCount}
                  onChange={(e) => {
                    setPirWomen({
                      ...pirWomen,
                      kmp: {
                        ...pirWomen?.kmp,
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
                  defaultValue={pirWomen?.kmp?.femalePercent}
                  value={(
                    (parseInt(pirWomen?.kmp?.bkFemaleCount || 0) /
                      parseInt(pirWomen?.kmp?.bkCount || 0)) *
                    100
                  ).toFixed(1)}
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
                  name="kpfd"
                  defaultValue={pirWomen?.kmp?.bkFemaleCountDifferentlyAbled}
                  onChange={(e) => {
                    setPirWomen({
                      ...pirWomen,
                      kmp: {
                        ...pirWomen?.kmp,
                        bkFemaleCountDifferentlyAbled: e.target.value,
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
                  defaultValue={pirWomen?.kmp?.femaleDifferentlyAbledPercent}
                  value={(
                    (parseInt(
                      pirWomen?.kmp?.bkFemaleCountDifferentlyAbled || 0
                    ) /
                      parseInt(pirWomen?.kmp?.bkCount || 0)) *
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
              id="save2"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => savePirWomen()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save2"} />
          </>
        )}
        <Toast error={err} setError={setErr} msg={msg} color={color} />
      </div>
    </>
  );
};

export default Participation20;
