import axios from "axios";
import { notifyService, tokenService } from "@/services";
import { getErrorMessage } from "@/utils/errorMessage";
import { urlHelper } from "@/helpers";
import { getLanguage } from "@/lang/index";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
  withCredentials: false,
  returnFullResponse: false,
  popupErrorMessage: true,
  paramsSerializer: (params) => urlHelper.formatQueryString(params),
});

// request interceptor
service.interceptors.request.use(
  (request) => {
    // do something before request is sent
    var token = tokenService.getToken();
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      request.headers["Authorization"] = "Bearer " + token;
      request.headers["Accept-Language"] = getLanguage();
    }
    return request;
  },
  (error) => {
    // do something with request error
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
  (response) => {
    const res = response.data;

    const result = response.data.result;

    const { config, status } = response;
    if (status !== 200) {
      let errorMessage = "";
      if (status === 401 || status === 403) {
        store.dispatch("user/resetToken").then(() => {
          location.reload();
        });
      } else {
        errorMessage = getErrorMessage(res)[0].reason;
        if (config.popupErrorMessage) {
          notifyService.error(errorMessage || "Error");
        }
      }
      if (config.popupErrorMessage) {
        return Promise.reject(new Error(errorMessage || "Error"));
      } else {
        if (config.returnFullResponse) return res;
        else return result;
      }
    } else {
      if (config.returnFullResponse) return res;
      else return result;
    }
  },
  (error) => {
    var isPopup = error.config.popupErrorMessage;
    var response = error.response.data;
    const message = getErrorMessage(response)[0].reason;

    if (isPopup) notifyService.error(message);

    return Promise.reject(response);
  }
);

export default service;
