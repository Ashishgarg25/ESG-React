import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, FormGroup, Input, Button } from "reactstrap";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import { apiUrl } from "../../../../../config/config";
import Toast from "../../../../../utils/Toast/Toast";

const Workmen = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");
  const [totalWorkmen, setTotalWorkmen] = useState({});
  const [workmen, setWorkmen] = useState();
  console.log({ workmen });
  const handleInputv4 = (e) => {
    const { name, value } = e.target;

    setWorkmen({
      ...workmen,
      [name]: Number(value),
    });
  };
  const getTotalWorkmen = async () => {
    const response = await axios.get(
      `${apiUrl}entity/workmen?reportingId=${props.data.reportingId}&ewIsDifferentlyAbled=${props.data.ewIsDifferentlyAbled}`,
      props.data.config
    );

    try {
      if (response.data.code === 200) {
        setTotalWorkmen(response.data.data);
      }
    } catch {
      console.error({});
    }
  };

  const saveTotalWorkmen = async () => {
    setIsLoading(true);

    const body = JSON.stringify({
      reportingId: props.data.reportingId,
      ewIsDifferentlyAbled: props.data.ewIsDifferentlyAbled,
      permanent: {
        unSkilled: {
          male: totalWorkmen?.permanent?.unSkilled?.male,
          female: totalWorkmen?.permanent?.unSkilled?.female,
          other: totalWorkmen?.permanent?.unSkilled?.other,
        },
        semiSkilled: {
          male: totalWorkmen?.permanent?.semiSkilled?.male,
          female: totalWorkmen?.permanent?.semiSkilled?.female,
          other: totalWorkmen?.permanent?.semiSkilled?.other,
        },
        skilled: {
          male: totalWorkmen?.permanent?.skilled?.male,
          female: totalWorkmen?.permanent?.skilled?.female,
          other: totalWorkmen?.permanent?.skilled?.other,
        },
        highSkilled: {
          male: totalWorkmen?.permanent?.highSkilled?.male,
          female: totalWorkmen?.permanent?.highSkilled?.female,
          other: totalWorkmen?.permanent?.highSkilled?.other,
        },
      },
      otpermanent: {
        unSkilled: {
          male: totalWorkmen?.otpermanent?.unSkilled?.male,
          female: totalWorkmen?.otpermanent?.unSkilled?.female,
          other: totalWorkmen?.otpermanent?.unSkilled?.other,
        },
        semiSkilled: {
          male: totalWorkmen?.otpermanent?.semiSkilled?.male,
          female: totalWorkmen?.otpermanent?.semiSkilled?.female,
          other: totalWorkmen?.otpermanent?.semiSkilled?.other,
        },
        skilled: {
          male: totalWorkmen?.otpermanent?.skilled?.male,
          female: totalWorkmen?.otpermanent?.skilled?.female,
          other: totalWorkmen?.otpermanent?.skilled?.other,
        },
        highSkilled: {
          male: totalWorkmen?.otpermanent?.highSkilled?.male,
          female: totalWorkmen?.otpermanent?.highSkilled?.female,
          other: totalWorkmen?.otpermanent?.highSkilled?.other,
        },
      },
    });

    try {
      const employeeRes = await axios.post(
        `${apiUrl}entity/workmen`,
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
  useEffect(() => {
    getTotalWorkmen();
  }, []);

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
              Others
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
                  name="awpt"
                  placeholder="total"
                  defaultValue={totalWorkmen?.permanent?.total?.total}
                  value={
                    parseInt(totalWorkmen?.permanent?.unSkilled?.total) +
                    parseInt(totalWorkmen?.permanent?.semiSkilled?.total) +
                    parseInt(totalWorkmen?.permanent?.skilled?.total) +
                    parseInt(totalWorkmen?.permanent?.highSkilled?.total)
                  }
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  disabled={true}
                  className={"input inputWithoutBg"}
                  name="awpm"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.total?.male}
                  value={parseInt(totalWorkmen?.permanent?.total?.male || 0)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.permanent?.total?.malePercent}
                  value={(
                    (parseInt(totalWorkmen?.permanent?.total?.male || 0) /
                      (parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.permanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(totalWorkmen?.permanent?.skilled?.total || 0) +
                        parseInt(
                          totalWorkmen?.permanent?.highSkilled?.total || 0
                        ))) *
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
                  name="awpf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.total?.female}
                  value={parseInt(totalWorkmen?.permanent?.total?.female || 0)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.permanent?.total?.femalePercent}
                  value={(
                    (parseInt(totalWorkmen?.permanent?.total?.female || 0) /
                      (parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.permanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(totalWorkmen?.permanent?.skilled?.total || 0) +
                        parseInt(
                          totalWorkmen?.permanent?.highSkilled?.total || 0
                        ))) *
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
                  name="awpo"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.total?.other}
                  value={parseInt(totalWorkmen?.permanent?.total?.other || 0)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.permanent?.total?.otherPercent}
                  value={(
                    (parseInt(totalWorkmen?.permanent?.total?.other || 0) /
                      (parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.permanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(totalWorkmen?.permanent?.skilled?.total || 0) +
                        parseInt(
                          totalWorkmen?.permanent?.highSkilled?.total || 0
                        ))) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ color: "#767676" }}>
              a
            </td>
            <td
              className="tableHeading"
              style={{ textAlign: "left", color: "#767676" }}
            >
              &nbsp; &nbsp; Unskilled
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.permanent?.unSkilled?.total}
                  value={parseInt(
                    totalWorkmen?.permanent?.unSkilled?.total || 0
                  )}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="awpum"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.unSkilled?.male}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        unSkilled: {
                          ...totalWorkmen.permanent.unSkilled,
                          male: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          male:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.permanent?.unSkilled?.malePercent}
                  value={(
                    (parseInt(totalWorkmen?.permanent?.unSkilled?.male || 0) /
                      parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      )) *
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
                  name="awpuf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.unSkilled?.female}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        unSkilled: {
                          ...totalWorkmen.permanent.unSkilled,
                          female: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          female:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.female || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.permanent?.unSkilled?.femalePercent
                  }
                  value={(
                    (parseInt(totalWorkmen?.permanent?.unSkilled?.female || 0) /
                      parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      )) *
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
                  name="awpuo"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.unSkilled?.other}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        unSkilled: {
                          ...totalWorkmen.permanent.unSkilled,
                          other: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          other:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.permanent?.unSkilled?.otherPercent
                  }
                  value={(
                    (parseInt(totalWorkmen?.permanent?.unSkilled?.other || 0) /
                      parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      )) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ color: "#767676" }}>
              b
            </td>
            <td
              className="tableHeading"
              style={{ textAlign: "left", color: "#767676" }}
            >
              &nbsp; &nbsp; Semi-skilled
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.permanent?.semiSkilled?.total}
                  value={parseInt(
                    totalWorkmen?.permanent?.semiSkilled?.total || 0
                  )}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="awpssm"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.semiSkilled?.male}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        semiSkilled: {
                          ...totalWorkmen.permanent.semiSkilled,
                          male: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          male:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.permanent?.semiSkilled?.malePercent
                  }
                  value={(
                    (parseInt(totalWorkmen?.permanent?.semiSkilled?.male || 0) /
                      parseInt(
                        totalWorkmen?.permanent?.semiSkilled?.total || 0
                      )) *
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
                  name="awpssf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.semiSkilled?.female}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        semiSkilled: {
                          ...totalWorkmen.permanent.semiSkilled,
                          female: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          female:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.female || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.permanent?.semiSkilled?.femalePercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.permanent?.semiSkilled?.female || 0
                    ) /
                      parseInt(
                        totalWorkmen?.permanent?.semiSkilled?.total || 0
                      )) *
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
                  name="awpsso"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.semiSkilled?.other}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        semiSkilled: {
                          ...totalWorkmen.permanent.semiSkilled,
                          other: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          other:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.permanent?.semiSkilled?.otherPercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.permanent?.semiSkilled?.other || 0
                    ) /
                      parseInt(
                        totalWorkmen?.permanent?.semiSkilled?.total || 0
                      )) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ color: "#767676" }}>
              c
            </td>
            <td
              className="tableHeading"
              style={{ textAlign: "left", color: "#767676" }}
            >
              &nbsp; &nbsp; Skilled
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.permanent?.skilled?.total}
                  value={parseInt(totalWorkmen?.permanent?.skilled?.total || 0)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="awpsm"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.skilled?.male}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        skilled: {
                          ...totalWorkmen.permanent.skilled,
                          male: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          male:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.permanent?.skilled?.malePercent}
                  value={(
                    (parseInt(totalWorkmen?.permanent?.skilled?.male || 0) /
                      parseInt(totalWorkmen?.permanent?.skilled?.total || 0)) *
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
                  name="awpsf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.skilled?.female}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        skilled: {
                          ...totalWorkmen.permanent.skilled,
                          female: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          female:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.female || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.permanent?.skilled?.femalePercent}
                  value={(
                    (parseInt(totalWorkmen?.permanent?.skilled?.female || 0) /
                      parseInt(totalWorkmen?.permanent?.skilled?.total || 0)) *
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
                  name="awpso"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.skilled?.other}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        skilled: {
                          ...totalWorkmen.permanent.skilled,
                          other: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          other:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.permanent?.skilled?.otherPercent}
                  value={(
                    (parseInt(totalWorkmen?.permanent?.skilled?.other || 0) /
                      parseInt(totalWorkmen?.permanent?.skilled?.total || 0)) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ color: "#767676" }}>
              d
            </td>
            <td
              className="tableHeading"
              style={{ textAlign: "left", color: "#767676" }}
            >
              &nbsp; &nbsp; Highly Skilled
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.permanent?.highSkilled?.total}
                  value={parseInt(
                    totalWorkmen?.permanent?.highSkilled?.total || 0
                  )}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="awphm"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.highSkilled?.male}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        highSkilled: {
                          ...totalWorkmen.permanent.highSkilled,
                          male: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          male:
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.permanent?.highSkilled?.malePercent
                  }
                  value={(
                    (parseInt(totalWorkmen?.permanent?.highSkilled?.male || 0) /
                      parseInt(
                        totalWorkmen?.permanent?.highSkilled?.total || 0
                      )) *
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
                  name="awphf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.highSkilled?.female}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        highSkilled: {
                          ...totalWorkmen.permanent.highSkilled,
                          female: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          female:
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.female || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.permanent?.highSkilled?.femalePercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.permanent?.highSkilled?.female || 0
                    ) /
                      parseInt(
                        totalWorkmen?.permanent?.highSkilled?.total || 0
                      )) *
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
                  name="awpho"
                  placeholder="no."
                  defaultValue={totalWorkmen?.permanent?.highSkilled?.other}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      permanent: {
                        ...totalWorkmen.permanent,
                        highSkilled: {
                          ...totalWorkmen.permanent.highSkilled,
                          other: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.highSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.permanent.total,
                          other:
                            parseInt(
                              totalWorkmen?.permanent?.skilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.unSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.permanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.permanent?.highSkilled?.otherPercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.permanent?.highSkilled?.other || 0
                    ) /
                      parseInt(
                        totalWorkmen?.permanent?.highSkilled?.total || 0
                      )) *
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
                  className={"input inputWithoutBg"}
                  name="twot"
                  placeholder="total"
                  defaultValue={totalWorkmen?.otpermanent?.total?.total}
                  value={
                    parseInt(totalWorkmen?.otpermanent?.unSkilled?.total || 0) +
                    parseInt(
                      totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                    ) +
                    parseInt(totalWorkmen?.otpermanent?.skilled?.total || 0) +
                    parseInt(totalWorkmen?.otpermanent?.highSkilled?.total || 0)
                  }
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="awom"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.total?.male}
                  value={parseInt(totalWorkmen?.otpermanent?.total?.male || 0)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.otpermanent?.total?.malePercent}
                  value={(
                    (parseInt(totalWorkmen?.otpermanent?.total?.male || 0) /
                      (parseInt(
                        totalWorkmen?.otpermanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.skilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.highSkilled?.total || 0
                        ))) *
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
                  name="awof"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.total?.female}
                  value={parseInt(
                    totalWorkmen?.otpermanent?.total?.female || 0
                  )}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.otpermanent?.total?.femalePercent}
                  value={(
                    (parseInt(totalWorkmen?.otpermanent?.total?.female || 0) /
                      (parseInt(
                        totalWorkmen?.otpermanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.skilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.highSkilled?.total || 0
                        ))) *
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
                  name="awoo"
                  placeholder="no."
                  onChange={(e) => handleInputv4(e)}
                  defaultValue={totalWorkmen?.otpermanent?.total?.other}
                  value={parseInt(totalWorkmen?.otpermanent?.total?.other || 0)}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className="input inputWithoutBg"
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.otpermanent?.total?.otherPercent}
                  value={(
                    (parseInt(totalWorkmen?.otpermanent?.total?.other || 0) /
                      (parseInt(
                        totalWorkmen?.otpermanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.skilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.highSkilled?.total || 0
                        ))) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ color: "#767676" }}>
              a
            </td>
            <td
              className="tableHeading"
              style={{ textAlign: "left", color: "#767676" }}
            >
              &nbsp; &nbsp; Unskilled
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.otpermanent?.unSkilled?.total}
                  value={parseInt(
                    totalWorkmen?.otpermanent?.unSkilled?.total || 0
                  )}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="awoum"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.unSkilled?.male}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        unSkilled: {
                          ...totalWorkmen.otpermanent.unSkilled,
                          male: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          male:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.unSkilled?.malePercent
                  }
                  value={(
                    (parseInt(totalWorkmen?.otpermanent?.unSkilled?.male || 0) /
                      parseInt(
                        totalWorkmen?.otpermanent?.unSkilled?.total || 0
                      )) *
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
                  name="awouf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.unSkilled?.female}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        unSkilled: {
                          ...totalWorkmen.otpermanent.unSkilled,
                          female: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          female:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.female ||
                                0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.female ||
                                0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.female || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.unSkilled?.femalePercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.otpermanent?.unSkilled?.female || 0
                    ) /
                      parseInt(
                        totalWorkmen?.otpermanent?.unSkilled?.total || 0
                      )) *
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
                  name="awouo"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.unSkilled?.other}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        unSkilled: {
                          ...totalWorkmen.otpermanent.unSkilled,
                          other: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          other:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.unSkilled?.otherPercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.otpermanent?.unSkilled?.other || 0
                    ) /
                      parseInt(
                        totalWorkmen?.otpermanent?.unSkilled?.total || 0
                      )) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ color: "#767676" }}>
              b
            </td>
            <td
              className="tableHeading"
              style={{ textAlign: "left", color: "#767676" }}
            >
              &nbsp; &nbsp; Semi-skilled
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.otpermanent?.semiSkilled?.total}
                  value={parseInt(
                    totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                  )}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="awossm"
                  defaultValue={totalWorkmen?.otpermanent?.semiSkilled?.male}
                  placeholder="no."
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        semiSkilled: {
                          ...totalWorkmen.otpermanent.semiSkilled,
                          male: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.female ||
                                0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          male:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.semiSkilled?.malePercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.otpermanent?.semiSkilled?.male || 0
                    ) /
                      parseInt(
                        totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                      )) *
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
                  name="awoussf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.semiSkilled?.female}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        semiSkilled: {
                          ...totalWorkmen.otpermanent.semiSkilled,
                          female: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          female:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.female ||
                                0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.female || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.semiSkilled?.femalePercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.otpermanent?.semiSkilled?.female || 0
                    ) /
                      parseInt(
                        totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                      )) *
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
                  name="awousso"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.semiSkilled?.other}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        semiSkilled: {
                          ...totalWorkmen.otpermanent.semiSkilled,
                          other: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.female ||
                                0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          other:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.semiSkilled?.otherPercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.otpermanent?.semiSkilled?.other || 0
                    ) /
                      parseInt(
                        totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                      )) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ color: "#767676" }}>
              c
            </td>
            <td
              className="tableHeading"
              style={{ textAlign: "left", color: "#767676" }}
            >
              &nbsp; &nbsp; Skilled
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.otpermanent?.skilled?.total}
                  value={parseInt(
                    totalWorkmen?.otpermanent?.skilled?.total || 0
                  )}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="awosm"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.skilled?.male}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        skilled: {
                          ...totalWorkmen.otpermanent.skilled,
                          male: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          male:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.otpermanent?.skilled?.malePercent}
                  value={(
                    (parseInt(totalWorkmen?.otpermanent?.skilled?.male || 0) /
                      parseInt(
                        totalWorkmen?.otpermanent?.skilled?.total || 0
                      )) *
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
                  name="awosf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.skilled?.female}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        skilled: {
                          ...totalWorkmen.otpermanent.skilled,
                          female: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          female:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.female ||
                                0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.female ||
                                0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.skilled?.femalePercent
                  }
                  value={(
                    (parseInt(totalWorkmen?.otpermanent?.skilled?.female || 0) /
                      parseInt(
                        totalWorkmen?.otpermanent?.skilled?.total || 0
                      )) *
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
                  name="awoso"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.skilled?.other}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        skilled: {
                          ...totalWorkmen.otpermanent.skilled,
                          other: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          other:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.skilled?.otherPercent
                  }
                  value={(
                    (parseInt(totalWorkmen?.otpermanent?.skilled?.other || 0) /
                      parseInt(
                        totalWorkmen?.otpermanent?.skilled?.total || 0
                      )) *
                    100
                  ).toFixed(1)}
                />
              </FormGroup>
            </td>
          </tr>

          <tr>
            <td className="tableHeading" style={{ color: "#767676" }}>
              d
            </td>
            <td
              className="tableHeading"
              style={{ textAlign: "left", color: "#767676" }}
            >
              &nbsp; &nbsp; Highly Skilled
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.otpermanent?.highSkilled?.total}
                  value={parseInt(
                    totalWorkmen?.otpermanent?.highSkilled?.total || 0
                  )}
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="awohm"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.highSkilled?.male}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        highSkilled: {
                          ...totalWorkmen.otpermanent.highSkilled,
                          male: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.female ||
                                0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          male:
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.highSkilled?.malePercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.otpermanent?.highSkilled?.male || 0
                    ) /
                      parseInt(
                        totalWorkmen?.otpermanent?.highSkilled?.total || 0
                      )) *
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
                  name="awohf"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.highSkilled?.female}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        highSkilled: {
                          ...totalWorkmen.otpermanent.highSkilled,
                          female: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.male || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          female:
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.female || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.female ||
                                0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.highSkilled?.femalePercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.otpermanent?.highSkilled?.female || 0
                    ) /
                      parseInt(
                        totalWorkmen?.otpermanent?.highSkilled?.total || 0
                      )) *
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
                  name="awoho"
                  placeholder="no."
                  defaultValue={totalWorkmen?.otpermanent?.highSkilled?.other}
                  onChange={(e) => {
                    handleInputv4(e);
                    setTotalWorkmen({
                      ...totalWorkmen,
                      otpermanent: {
                        ...totalWorkmen.otpermanent,
                        highSkilled: {
                          ...totalWorkmen.otpermanent.highSkilled,
                          other: e.target.value,
                          total:
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.female ||
                                0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.highSkilled?.male || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
                        total: {
                          ...totalWorkmen.otpermanent.total,
                          other:
                            parseInt(
                              totalWorkmen?.otpermanent?.skilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.unSkilled?.other || 0
                            ) +
                            parseInt(
                              totalWorkmen?.otpermanent?.semiSkilled?.other || 0
                            ) +
                            parseInt(e.target.value || 0),
                        },
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={
                    totalWorkmen?.otpermanent?.highSkilled?.otherPercent
                  }
                  value={(
                    (parseInt(
                      totalWorkmen?.otpermanent?.highSkilled?.other || 0
                    ) /
                      parseInt(
                        totalWorkmen?.otpermanent?.highSkilled?.total || 0
                      )) *
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
                  type="number"
                  className={"input inputWithoutBg"}
                  name="number"
                  placeholder="total"
                  defaultValue={totalWorkmen?.total?.total}
                  value={
                    parseInt(totalWorkmen?.permanent?.unSkilled?.total) +
                    parseInt(totalWorkmen?.permanent?.semiSkilled?.total) +
                    parseInt(totalWorkmen?.permanent?.skilled?.total) +
                    parseInt(totalWorkmen?.permanent?.highSkilled?.total) +
                    parseInt(totalWorkmen?.otpermanent?.unSkilled?.total) +
                    parseInt(totalWorkmen?.otpermanent?.semiSkilled?.total) +
                    parseInt(totalWorkmen?.otpermanent?.skilled?.total) +
                    parseInt(totalWorkmen?.otpermanent?.highSkilled?.total)
                  }
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={true}
                  type="number"
                  className={"input inputWithoutBg"}
                  name="awtm"
                  placeholder="no."
                  defaultValue={totalWorkmen?.total?.male}
                  value={
                    parseInt(totalWorkmen?.permanent?.total?.male || 0) +
                    parseInt(totalWorkmen?.otpermanent?.total?.male || 0)
                  }
                />
              </FormGroup>
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  type="number"
                  className="input inputWithoutBg"
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.total?.malePercent}
                  value={(
                    ((parseInt(totalWorkmen?.permanent?.total?.male || 0) +
                      parseInt(totalWorkmen?.otpermanent?.total?.male || 0)) /
                      (parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.permanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(totalWorkmen?.permanent?.skilled?.total || 0) +
                        parseInt(
                          totalWorkmen?.permanent?.highSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.unSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.skilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.highSkilled?.total || 0
                        ))) *
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
                  name="awtf"
                  placeholder="no."
                  onChange={(e) => handleInputv4(e)}
                  defaultValue={totalWorkmen?.total?.female}
                  value={
                    parseInt(totalWorkmen?.permanent?.total?.female || 0) +
                    parseInt(totalWorkmen?.otpermanent?.total?.female || 0)
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.total?.femalePercent}
                  value={(
                    ((parseInt(totalWorkmen?.permanent?.total?.female || 0) +
                      parseInt(totalWorkmen?.otpermanent?.total?.female || 0)) /
                      (parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.permanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(totalWorkmen?.permanent?.skilled?.total || 0) +
                        parseInt(
                          totalWorkmen?.permanent?.highSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.unSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.skilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.highSkilled?.total || 0
                        ))) *
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
                  name="awto"
                  placeholder="no."
                  onChange={(e) => handleInputv4(e)}
                  defaultValue={totalWorkmen?.total?.other}
                  value={
                    parseInt(totalWorkmen?.permanent?.total?.other || 0) +
                    parseInt(totalWorkmen?.otpermanent?.total?.other || 0)
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
                  name="number"
                  placeholder="percentage"
                  defaultValue={totalWorkmen?.total?.otherPercent}
                  value={(
                    ((parseInt(totalWorkmen?.permanent?.total?.other || 0) +
                      parseInt(totalWorkmen?.otpermanent?.total?.ohter || 0)) /
                      (parseInt(
                        totalWorkmen?.permanent?.unSkilled?.total || 0
                      ) +
                        parseInt(
                          totalWorkmen?.permanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(totalWorkmen?.permanent?.skilled?.total || 0) +
                        parseInt(
                          totalWorkmen?.permanent?.highSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.unSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.semiSkilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.skilled?.total || 0
                        ) +
                        parseInt(
                          totalWorkmen?.otpermanent?.highSkilled?.total || 0
                        ))) *
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
              onClick={() => saveTotalWorkmen()}
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

export default Workmen;
