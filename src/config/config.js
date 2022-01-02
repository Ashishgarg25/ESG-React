import { getToken } from "../utils/LocalStorage/LocalStorage";
const token = getToken();
// console.log('vvvvv',token);
const apiVersion = "/api/v2/";

var apiUrl = "https://oneesgapi.bytesbrick.com:3009" + apiVersion;
  
// if (window.location.hostname === "myesg.bytesbrick.com")
//   apiUrl = "https://myesgapi.bytesbrick.com:3008" + apiVersion;
// else if (window.location.hostname === "oneesg.bytesbrick.com") {
//   apiUrl = "https://oneesgapi.bytesbrick.com:3009" + apiVersion;
// }
export { apiUrl };
