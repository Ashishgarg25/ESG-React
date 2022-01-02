import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import store from "../../Redux/Store/Store";

export function setToken(token) {
  return window.localStorage.setItem("token", token);
}

export function getToken() {
  try {
    // const state = store.getState();
    const token = window.localStorage.getItem("token");
    return token;
  } catch (err) {
    return null;
  }
}
