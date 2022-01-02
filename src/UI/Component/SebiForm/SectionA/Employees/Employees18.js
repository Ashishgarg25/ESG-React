import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, FormGroup, Input, Button } from "reactstrap";
import { apiUrl } from "../../../../../config/config";
import { getToken } from "../../../../../utils/LocalStorage/LocalStorage";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import Toast from "../../../../../utils/Toast/Toast";

const Employees18 = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    getEmployeeData();
  }, []);

  const token = getToken() || "";
  const config = {
    headers: {
      token: token,
      "Content-type": "application/json",
    },
  };
  const isEmpty = (obj) => {
    for (var key in obj) {
      if (!obj[key]) return false;
    }
    return true;
  };

  const saveEmployeeData = async () => {
    if (isEmpty(employeeData)) {
      setErr(true);
      setMsg("All Fields are mandatory!");
      setColor("Red");
    } else {
      setIsLoading(true);

      const body = JSON.stringify({
        reportingId: props.empData.reportingId,
        ewParticular: props.empData.ewParticular,
        ewIsDifferentlyAbled: props.empData.ewIsDifferentlyAbled,
        permanent: {
          male: employeeData?.permanent?.male,
          female: employeeData?.permanent?.female,
          other: employeeData?.permanent?.other,
        },
        otpermanent: {
          male: employeeData?.otpermanent?.male,
          female: employeeData.otpermanent?.female,
          other: employeeData?.otpermanent?.other,
        },
      });

      try {
        const employeeRes = await axios.post(
          `${apiUrl}entity/employee`,
          body,
          config
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
    }
  };
  const getEmployeeData = async () => {
    const response = await axios.get(
      `${apiUrl}entity/employee?reportingId=${props.empData.reportingId}&ewParticular=${props.empData.ewParticular}&ewIsDifferentlyAbled=${props.empData.ewIsDifferentlyAbled}`,
      config
    );
    console.log(response.data.data.permanent.total);
    try {
      if (response.data.code === 200) {
        setEmployeeData(response.data.data);
      }
    } catch {
      console.error({});
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
            <th className="tableHeading" rowSpan={2}>
              S.No.
            </th>
            <th className="tableHeading" rowSpan={2}>
              Particulars{" "}
            </th>
            <th className="tableHeading" rowSpan={2}>
              Total{" "}
            </th>
            <th className="tableHeading" colSpan={2}>
              Male{" "}
            </th>
            <th className="tableHeading" colSpan={2}>
              Female{" "}
            </th>
            <th className="tableHeading" colSpan={2}>
              <span style={{ color: "#fcdb0a" }}> Others </span>
            </th>
          </tr>
          <tr>
            <td className="tableHeading">No.</td>
            <td className="tableHeading">% (No. of Males / Total)</td>
            <td className="tableHeading">No.</td>
            <td className="tableHeading">% (No. of Females / Total)</td>
            <td className="tableHeading">No.</td>
            <td className="tableHeading">% (No. of Others / Total)</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading">1</td>
            <td className="tableHeading" style={{ textAlign: "left" }}>
              &nbsp; &nbsp; Permanent
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  id="tept"
                  name="tept"
                  placeholder="total"
                  value={parseInt(employeeData?.permanent?.total || 0)}
                  defaultValue={employeeData?.permanent?.total}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="tepnm"
                  placeholder="no."
                  defaultValue={employeeData?.permanent?.male}
                  onChange={(e) => {
                    setEmployeeData({
                      ...employeeData,
                      permanent: {
                        ...employeeData.permanent,
                        male: e.target.value,
                        total:
                          parseInt(employeeData.permanent.female || 0) +
                          parseInt(employeeData.permanent.other || 0) +
                          parseInt(e.target.value || 0),
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
                  className="input inputWithoutBg"
                  name="teppm"
                  placeholder="percentage"
                  value={(
                    (parseInt(employeeData?.permanent?.male || 0) /
                      parseInt(employeeData?.permanent?.total || 0)) *
                    100
                  ).toFixed(1)}
                  defaultValue={employeeData?.permanent?.malePercent} // =>  CALCULATING PERCENTAGE FOR PERMANENT MALES / TOTAL NO.
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="tepnf"
                  placeholder="no."
                  defaultValue={employeeData?.permanent?.female}
                  onChange={(e) => {
                    setEmployeeData({
                      ...employeeData,
                      permanent: {
                        ...employeeData.permanent,
                        female: e.target.value,
                        total:
                          parseInt(employeeData.permanent.male || 0) +
                          parseInt(employeeData.permanent.other || 0) +
                          parseInt(e.target.value || 0),
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
                  className="input inputWithoutBg"
                  name="teppf"
                  placeholder="percentage"
                  defaultValue={employeeData?.permanent?.femalePercent}
                  value={(
                    (parseInt(employeeData?.permanent?.female || 0) /
                      parseInt(employeeData?.permanent?.total || 0)) *
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
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name={"tepno"}
                  defaultValue={employeeData?.permanent?.other}
                  placeholder="no."
                  onChange={(e) => {
                    setEmployeeData({
                      ...employeeData,
                      permanent: {
                        ...employeeData.permanent,
                        other: e.target.value,
                        total:
                          parseInt(employeeData.permanent.male || 0) +
                          parseInt(employeeData.permanent.female || 0) +
                          parseInt(e.target.value || 0),
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
                  className="input inputWithoutBg"
                  name="teppo"
                  placeholder="percentage"
                  defaultValue={employeeData?.permanent?.otherPercent}
                  value={(
                    (parseInt(employeeData?.permanent?.other || 0) /
                      parseInt(employeeData?.permanent?.total || 0)) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading">2</td>
            <td className="tableHeadingLeft">Other than Permanent</td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  id="teot"
                  name="teot"
                  placeholder="total"
                  defaultValue={employeeData?.otpermanent?.total}
                  value={parseInt(employeeData?.otpermanent?.total || 0)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="teonm"
                  placeholder="no."
                  defaultValue={employeeData?.otpermanent?.male}
                  onChange={(e) => {
                    setEmployeeData({
                      ...employeeData,
                      otpermanent: {
                        ...employeeData.otpermanent,
                        male: e.target.value,
                        total:
                          parseInt(employeeData.otpermanent.female || 0) +
                          parseInt(employeeData.otpermanent.other || 0) +
                          parseInt(e.target.value || 0),
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
                  className="input inputWithoutBg"
                  name="teopm"
                  placeholder="percentage"
                  defaultValue={employeeData?.otpermanent?.malePercent}
                  value={(
                    (parseInt(employeeData?.otpermanent?.male || 0) /
                      parseInt(employeeData?.otpermanent?.total || 0)) *
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
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="teonf"
                  placeholder="no."
                  defaultValue={employeeData?.otpermanent?.female}
                  onChange={(e) => {
                    setEmployeeData({
                      ...employeeData,
                      otpermanent: {
                        ...employeeData.otpermanent,
                        female: e.target.value,
                        total:
                          parseInt(employeeData.otpermanent.male || 0) +
                          parseInt(employeeData.otpermanent.other || 0) +
                          parseInt(e.target.value || 0),
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
                  className="input inputWithoutBg"
                  name="teopf"
                  placeholder="percentage"
                  defaultValue={employeeData?.otpermanent?.femalePercent}
                  value={(
                    (parseInt(employeeData?.otpermanent?.female || 0) /
                      parseInt(employeeData?.otpermanent?.total || 0)) *
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
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="teono"
                  defaultValue={employeeData?.otpermanent?.other}
                  placeholder="no."
                  onChange={(e) => {
                    setEmployeeData({
                      ...employeeData,
                      otpermanent: {
                        ...employeeData.otpermanent,
                        other: e.target.value,
                        total:
                          parseInt(employeeData.otpermanent.female || 0) +
                          parseInt(employeeData.otpermanent.male || 0) +
                          parseInt(e.target.value || 0),
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
                  className="input inputWithoutBg"
                  name="teopo"
                  placeholder="percentage"
                  defaultValue={employeeData?.otpermanent?.otherPercent}
                  value={(
                    (parseInt(employeeData?.otpermanent?.other || 0) /
                      parseInt(employeeData?.otpermanent?.total || 0)) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading">3</td>
            <td className="tableHeading" style={{ textAlign: "left" }}>
              &nbsp; &nbsp; Total
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  id="tet"
                  type="number"
                  className="input inputWithoutBg"
                  name="number"
                  defaultValue={employeeData?.total?.total}
                  value={
                    parseInt(employeeData?.permanent?.total || 0) +
                    parseInt(employeeData?.otpermanent?.total || 0)
                  }
                  placeholder="total"
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="no."
                  defaultValue={employeeData?.total?.male}
                  value={
                    parseInt(employeeData?.permanent?.male || 0) +
                    parseInt(employeeData?.otpermanent?.male || 0)
                  }
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  // value={showValue("tet", employeeData?.tepnm + employeeData?.teonm)}
                  name="tetpm"
                  placeholder="percentage"
                  defaultValue={employeeData?.total?.malePercent}
                  value={(
                    ((parseInt(employeeData?.permanent?.male || 0) +
                      parseInt(employeeData?.otpermanent?.male || 0)) /
                      (parseInt(employeeData?.permanent?.total || 0) +
                        parseInt(employeeData?.otpermanent?.total || 0))) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="no."
                  defaultValue={employeeData?.total?.female}
                  value={
                    parseInt(employeeData?.permanent?.female || 0) +
                    parseInt(employeeData?.otpermanent?.female || 0)
                  }
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  name="tetpf"
                  placeholder="percentage"
                  defaultValue={employeeData?.total?.femalePercent}
                  value={(
                    ((parseInt(employeeData?.permanent?.female || 0) +
                      parseInt(employeeData?.otpermanent?.female || 0)) /
                      (parseInt(employeeData?.permanent?.total || 0) +
                        parseInt(employeeData?.otpermanent?.total || 0))) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="no."
                  defaultValue={employeeData?.total?.other}
                  value={
                    parseInt(employeeData?.permanent?.other || 0) +
                    parseInt(employeeData?.otpermanent?.other || 0)
                  }
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  name="tetpo"
                  placeholder="percentage"
                  defaultValue={employeeData?.total?.otherPercent}
                  value={(
                    ((parseInt(employeeData?.permanent?.other || 0) +
                      parseInt(employeeData?.otpermanent?.other || 0)) /
                      (parseInt(employeeData?.permanent?.total || 0) +
                        parseInt(employeeData?.otpermanent?.total || 0))) *
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
              id="save"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveEmployeeData()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save"} />
          </>
        )}
        <Toast error={err} setError={setErr} msg={msg} color={color} />
      </div>
    </>
  );
};

export default Employees18;
