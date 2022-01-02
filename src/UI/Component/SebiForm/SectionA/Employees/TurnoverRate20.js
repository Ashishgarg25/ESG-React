import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, FormGroup, Input, Button } from "reactstrap";
import { apiUrl } from "../../../../../config/config";
import TooltipComp from "../../../../../utils/TooltipComp/TooltipComp";
import Toast from "../../../../../utils/Toast/Toast";

const TurnoverRate20 = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");
  const [turnOverPermanentEmployee, setTurnOverPermanentEmployee] = useState();

  const getTurnOverPermanentEmployee = async () => {
    const response = await axios.get(
      `${apiUrl}entity/turnover-permanent?reportingId=${props.data.reportingId}`,
      props.data.config
    );

    try {
      if (response.data.code === 200) {
        setTurnOverPermanentEmployee(response.data.data);
      }
    } catch {
      console.error({});
    }
  };
  useEffect(() => {
    getTurnOverPermanentEmployee();
  }, []);

  const saveTurnOverPermanentEmployee = async () => {
    setIsLoading(true);

    const body = JSON.stringify({
      reportingId: props.data.reportingId,
      fyCurrent: {
        employees: {
          male: turnOverPermanentEmployee?.fyCurrent?.employees?.male,
          female: turnOverPermanentEmployee?.fyCurrent?.employees?.female,
        },
        workers: {
          male: turnOverPermanentEmployee?.fyCurrent?.workers?.male,
          female: turnOverPermanentEmployee?.fyCurrent?.workers?.female,
        },
      },
      fyPrev: {
        employees: {
          male: turnOverPermanentEmployee?.fyPrev?.employees?.male,
          female: turnOverPermanentEmployee?.fyPrev?.employees?.female,
        },
        workers: {
          male: turnOverPermanentEmployee?.fyPrev?.workers?.male,
          female: turnOverPermanentEmployee?.fyPrev?.workers?.female,
        },
      },
      fyPriPrev: {
        employees: {
          male: turnOverPermanentEmployee?.fyPriPrev?.employees?.male,
          female: turnOverPermanentEmployee?.fyPriPrev?.employees?.female,
        },
        workers: {
          male: turnOverPermanentEmployee?.fyPriPrev?.workers?.male,
          female: turnOverPermanentEmployee?.fyPriPrev?.workers?.female,
        },
      },
    });

    try {
      const employeeRes = await axios.post(
        `${apiUrl}entity/turnover-permanent`,
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
            <th className="tableHeading" rowSpan={3}></th>
            <th className="tableHeading" colSpan={3}>
              FY (Turnover rate in current FY){" "}
            </th>
            <th className="tableHeading" colSpan={3}>
              FY (Turnover rate in previous FY){" "}
            </th>
            <th className="tableHeading" colSpan={3}>
              FY (Turnover rate in year prior to prev FY){" "}
            </th>
          </tr>

          <tr>
            <td className="tableHeading">Male</td>
            <td className="tableHeading">Female</td>
            <td className="tableHeading">Total</td>
            <td className="tableHeading">Male</td>
            <td className="tableHeading">Female</td>
            <td className="tableHeading">Total</td>
            <td className="tableHeading">Male</td>
            <td className="tableHeading">Female</td>
            <td className="tableHeading">Total</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="tableHeading" style={{ textAlign: "left" }}>
              {" "}
              &nbsp;Employees
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="cyem"
                  defaultValue={
                    turnOverPermanentEmployee?.fyCurrent?.employees?.male
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyCurrent: {
                        ...turnOverPermanentEmployee.fyCurrent,
                        employees: {
                          ...turnOverPermanentEmployee.fyCurrent.employees,
                          male: e.target.value,
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
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="cyef"
                  defaultValue={
                    turnOverPermanentEmployee?.fyCurrent?.employees?.female
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyCurrent: {
                        ...turnOverPermanentEmployee.fyCurrent,
                        employees: {
                          ...turnOverPermanentEmployee.fyCurrent.employees,
                          female: e.target.value,
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
                  disable={true}
                  type="number"
                  placeholder="total"
                  className="input inputWithoutBg"
                  name="cyet"
                  defaultValue={
                    turnOverPermanentEmployee?.fyCurrent?.employees?.total
                  }
                  value={
                    parseInt(
                      turnOverPermanentEmployee?.fyCurrent?.employees?.male || 0
                    ) +
                    parseInt(
                      turnOverPermanentEmployee?.fyCurrent?.employees?.female ||
                        0
                    )
                  }
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
                  name="pyem"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPrev?.employees?.male
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyPrev: {
                        ...turnOverPermanentEmployee.fyPrev,
                        employees: {
                          ...turnOverPermanentEmployee.fyPrev.employees,
                          male: e.target.value,
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
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="pyef"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPrev?.employees?.female
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyPrev: {
                        ...turnOverPermanentEmployee.fyPrev,
                        employees: {
                          ...turnOverPermanentEmployee.fyPrev.employees,
                          female: e.target.value,
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
                  placeholder="total"
                  className="input inputWithoutBg"
                  name="pyet"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPrev?.employees?.total
                  }
                  value={
                    parseInt(
                      turnOverPermanentEmployee?.fyPrev?.employees?.male || 0
                    ) +
                    parseInt(
                      turnOverPermanentEmployee?.fyPrev?.employees?.female || 0
                    )
                  }
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
                  name="ppyem"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPriPrev?.employees?.male
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyPriPrev: {
                        ...turnOverPermanentEmployee.fyPriPrev,
                        employees: {
                          ...turnOverPermanentEmployee.fyPriPrev.employees,
                          male: e.target.value,
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
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="ppyef"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPriPrev?.employees?.female
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyPriPrev: {
                        ...turnOverPermanentEmployee.fyPriPrev,
                        employees: {
                          ...turnOverPermanentEmployee.fyPriPrev.employees,
                          female: e.target.value,
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
                  placeholder="total"
                  className="input inputWithoutBg"
                  name="ppyet"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPriPrev?.employees?.total
                  }
                  value={
                    parseInt(
                      turnOverPermanentEmployee?.fyPriPrev?.employees?.male || 0
                    ) +
                    parseInt(
                      turnOverPermanentEmployee?.fyPriPrev?.employees?.female ||
                        0
                    )
                  }
                />
              </FormGroup>
            </td>
          </tr>
          <tr>
            <td className="tableHeading" style={{ textAlign: "left" }}>
              {" "}
              &nbsp;Workers
            </td>
            <td className="tableHeading">
              <FormGroup className="m-0">
                <Input
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="cywm"
                  defaultValue={
                    turnOverPermanentEmployee?.fyCurrent?.workers?.male
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyCurrent: {
                        ...turnOverPermanentEmployee.fyCurrent,
                        workers: {
                          ...turnOverPermanentEmployee.fyCurrent.workers,
                          male: e.target.value,
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
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="cywf"
                  defaultValue={
                    turnOverPermanentEmployee?.fyCurrent?.workers?.female
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyCurrent: {
                        ...turnOverPermanentEmployee.fyCurrent,
                        workers: {
                          ...turnOverPermanentEmployee.fyCurrent.workers,
                          female: e.target.value,
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
                  placeholder="total"
                  className="input inputWithoutBg"
                  name="cywt"
                  defaultValue={
                    turnOverPermanentEmployee?.fyCurrent?.workers?.total
                  }
                  value={
                    parseInt(
                      turnOverPermanentEmployee?.fyCurrent?.workers?.male || 0
                    ) +
                    parseInt(
                      turnOverPermanentEmployee?.fyCurrent?.workers?.female || 0
                    )
                  }
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
                  name="pywm"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPrev?.workers?.male
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyPrev: {
                        ...turnOverPermanentEmployee.fyPrev,
                        workers: {
                          ...turnOverPermanentEmployee.fyPrev.workers,
                          male: e.target.value,
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
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="pywf"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPrev?.workers?.female
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyPrev: {
                        ...turnOverPermanentEmployee.fyPrev,
                        workers: {
                          ...turnOverPermanentEmployee.fyPrev.workers,
                          female: e.target.value,
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
                  placeholder="total"
                  className="input inputWithoutBg"
                  name="pyet"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPrev?.workers?.total
                  }
                  value={
                    parseInt(
                      turnOverPermanentEmployee?.fyPrev?.workers?.male || 0
                    ) +
                    parseInt(
                      turnOverPermanentEmployee?.fyPrev?.workers?.female || 0
                    )
                  }
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
                  name="ppywm"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPriPrev?.workers?.male
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyPriPrev: {
                        ...turnOverPermanentEmployee.fyPriPrev,
                        workers: {
                          ...turnOverPermanentEmployee.fyPriPrev.workers,
                          male: e.target.value,
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
                  disabled={!isEditable ? true : false}
                  type="number"
                  placeholder="no."
                  className={isEditable ? "input" : "input inputWithoutBg"}
                  name="ppywf"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPriPrev?.workers?.female
                  }
                  onChange={(e) => {
                    setTurnOverPermanentEmployee({
                      ...turnOverPermanentEmployee,
                      fyPriPrev: {
                        ...turnOverPermanentEmployee.fyPriPrev,
                        workers: {
                          ...turnOverPermanentEmployee.fyPriPrev.workers,
                          female: e.target.value,
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
                  placeholder="total"
                  className="input inputWithoutBg"
                  name="ppyet"
                  defaultValue={
                    turnOverPermanentEmployee?.fyPriPrev?.workers?.total
                  }
                  value={
                    parseInt(
                      turnOverPermanentEmployee?.fyPriPrev?.workers?.male || 0
                    ) +
                    parseInt(
                      turnOverPermanentEmployee?.fyPriPrev?.workers?.female || 0
                    )
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
              id="save3"
              className="mt-4 mb-4"
              color="primary"
              style={{ width: 100 }}
              onClick={() => saveTurnOverPermanentEmployee()}
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
            <TooltipComp message={"save"} openTooltipN={0} target={"save3"} />
          </>
        )}
        <Toast error={err} setError={setErr} msg={msg} color={color} />
      </div>
    </>
  );
};

export default TurnoverRate20;
