import axios from "axios";
import { apiUrl } from "../../config/config";
import { setToken, getToken } from "../../utils/LocalStorage/LocalStorage";

const Get = axios.create({
  baseURL: apiUrl,
  timeout: 250000,
  headers: {
    "Content-Type": "application/json",
  },
});

Get.interceptors.request.use(function (config) {
  const token = getToken() || "";
  console.log({ token });
  config.headers.token = token;
  return config;
});

Get.interceptors.response.use(
  function (res) {
    return res;
  },
  function (error) {
    console.log(error.response.status);
    if (error.response.status == 400)
      alert(JSON.stringify(error.response.data.message.map((el) => el[1])));
    if (error.response.status == 500) alert("Server Error! Please try again.");
    if (error.response.status == 401) Exit();

    return error;
  }
);

function Exit() {
  console.log(getToken());
  setToken("");
  // siteData.setSiteData({});
  // window.location.href = "/"
}

// async function Get(endPoint, type, inputData){
// 	if(endPoint && type && inputData){
// 		await Get({
// 			method: type,
// 			url: endPoint,
// 			data: inputData
// 		}, response=> {
// 			console.log("res", response);
// 		}), error =>{
// 			console.log("error", error);
// 		};
// 	} else
// 		return false;
// }

export default Get;
