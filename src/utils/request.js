import axios from "axios";
import { baseUrl } from "../config/baseUrl";
import { getToken } from "./token";
const service = axios.create({
  baseURL: `${baseUrl}/arcgis/rest/services`,
  withCredentials: false
});

// request interceptor
service.interceptors.request.use(
  request => {
    // do something before request is sent
    console.log("request start");

    request.headers["Authorization"] = "Bearer " + getToken();
    console.log("TCL: getToken()", getToken());

    return request;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response;
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code && res.code !== 20000) {
      // Message({
      //   message: res.message || "Error",
      //   type: "error",
      //   duration: 5 * 1000
      // });

      // // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm(
      //     "You have been logged out, you can cancel to stay on this page, or log in again",
      //     "Confirm logout",
      //     {
      //       confirmButtonText: "Re-Login",
      //       cancelButtonText: "Cancel",
      //       type: "warning"
      //     }
      //   ).then(() => {
      //     store.dispatch("user/resetToken").then(() => {
      //       location.reload();
      //     });
      //   });
      // }
      console.log("TCL: res", res);
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    // console.log("err mesaji" + error); // for debug
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
);

export default service;
// export default () => {
//   return axios.create({
//     baseURL: `${baseUrl}/arcgis/rest/services`,
//     withCredentials: false,
//     headers: {
//       Accept: "*",
//       "Content-Type": "application/json"
//     }
//   });
// };
