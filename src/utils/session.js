import React from "react";
import { Redirect } from "react-router-dom";

let Session = (props) => {
  var checktoken = localStorage.getItem("token");
  return <>{checktoken ? <Redirect to="/"></Redirect> : <props.nosession />}</>;
};

export default Session;
