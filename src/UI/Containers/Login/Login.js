import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
} from "reactstrap";
import logo from "../../../assets/myytake-logo.png";
import { Link, useHistory } from "react-router-dom";
import RegEx from "../../../utils/RegEx/RegEx";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../Redux/Login/action";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState();
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const history = useHistory();
  let dispatch = useDispatch();
  const userData = useSelector((state) => state.login?.toJS());

  useEffect(() => {
    console.log({ userData });
    if (userData.userid) {
      history.push({
        pathname: "/financialData",
        state: {
          type: userData.type,
        },
      });
    }
  }, [userData, history]);

  useEffect(() => {
    setLoginDetails({
      ...loginDetails,
      type: "Company",
    });
  }, []);

  // useEffect(() => {
  //   document.addEventListener("keyup", function(event) {
  //     if (event.code === "Enter") {
  //       handleLogin()
  //     }
  //   });
  // },[])

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "email") {
      if (isNaN(value) === true) {
        setLoginDetails({
          ...loginDetails,
          email: value,
          phone: null,
        });
      } else {
        console.log("wf");
        setLoginDetails({
          ...loginDetails,
          phone: value,
          email: null,
        });
      }
    } else {
      setLoginDetails({
        ...loginDetails,
        [name]: value,
      });
    }
  };

  const checkIsEmpty = () => {
    const { email, phone, password } = loginDetails;

    if (email !== null) {
      !RegEx.email.test(email)
        ? setEmailErr("Please enter valid email address.")
        : setEmailErr("");
    } else if (phone !== null) {
      !RegEx.phone.test(phone)
        ? setEmailErr("Please enter valid mobile number.")
        : setEmailErr("");
    }

    if (password === " " || password === "") {
      setPasswordErr("Invalid Password");
    } else setPasswordErr("");
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    const { type, email, phone, password } = loginDetails;
    if (!type || !email || !password) checkIsEmpty();
    else {
      const data = { username: email, password, type };
      dispatch(getUserDetails(data))
        .then()
        .catch((e) => {
          setPasswordErr(e);
        });
    }
  };

  const hideToast = () => {
    setSubmitStatus("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {/*
      
        <img src={logo} alt="logo" className={styles.logo} />
      */}
      </div>
      <div className={styles.container1}>
        <div className={styles.loginSection}>
          <h4 className="text-center mb-4">Login</h4>
          <Form onSubmit={(e) => handleLogin(e)}>
            {/* <Label className={styles.label} for="select">User Type</Label> */}
            <Row className="mt-3">
              <Col xs={4} md={4}>
                <FormGroup check className="mt-1">
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="Company"
                      defaultChecked
                      onChange={(e) => handleChange(e)}
                    />{" "}
                    Company
                  </Label>
                </FormGroup>
              </Col>
              <Col xs={4} md={4}>
                <FormGroup check className="mt-1">
                  <Label check>
                    <Input
                    disabled
                      type="radio"
                      name="type"
                      value="Investor"
                      onChange={(e) => handleChange(e)}
                    />{" "}
                    Investor
                  </Label>
                </FormGroup>
              </Col>
              <Col xs={4} md={4}>
                <FormGroup check className="mt-1">
                  <Label check>
                    <Input
                    disabled
                      type="radio"
                      name="type"
                      value="Other"
                      onChange={(e) => handleChange(e)}
                    />{" "}
                    Other
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            {/* 
              <Input className={styles.select} type="radio" name="type" id="select"  onChange={ (e) => handleChange(e) }>
                  <option value="Company">Company</option>
                  <option value="Investor">Investor</option>
                  <option value="Others">Others</option>
              </Input> */}
            <FormGroup className="mt-4">
              <Label className={styles.label} for="Email">
                Email / Phone
              </Label>
              <Input
                invalid={emailErr !== ""}
                className={styles.input}
                type="text"
                name="email"
                id="Email"
                placeholder="Email Address / Phone Number"
                onChange={(e) => handleChange(e)}
                onBlur={() => checkIsEmpty()}
              />
              <FormFeedback>{emailErr}</FormFeedback>
            </FormGroup>

            <FormGroup className="mt-2">
              <div className={styles.passForgot}>
                <Label className={styles.label} for="Password">
                  Password
                </Label>
                <Link to="/forgotPassword" className={styles.textLink}>
                  Forgot Password?
                </Link>
              </div>
              <Input
                invalid={passwordErr !== ""}
                className={styles.input}
                type="password"
                name="password"
                id="Password"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                onBlur={() => checkIsEmpty()}
              />
              <FormFeedback>{passwordErr}</FormFeedback>
            </FormGroup>

            <Button
              type="submit"
              size="md"
              block
              className={"w-100 mt-3 " + styles.btn}
            >
              Login
            </Button>
            <p className={styles.reqLogin}>
              Don't have a login?{" "}
              <Link to="/commingSoon" className={styles.textLink}>
                Request a login
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
