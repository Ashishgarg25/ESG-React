import types from "./type";
import { apiUrl } from "../../config/config";
import axios from "axios";
import { setToken } from "../../utils/LocalStorage/LocalStorage";

export const getUserDetails = (data) => {
  return function (dispatch) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await axios.post(apiUrl + "user/login", data);
        if (userDetails.data.code === 200) {
          setToken(userDetails.data.data.token);
          dispatch({
            type: types.LOGGIN,
            payload: { ...userDetails.data.data, type: data.type },
          });
        }
        console.log({ userDetails });
        resolve(userDetails);
      } catch (e) {
        console.log({ e });
        if (e.response.data.code === 401) {
          reject(e.response.data.message);
        }
      }
    });
  };
};
