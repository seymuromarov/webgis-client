import axios from "axios";
import { baseUrl } from "@/config/urls";
import { tokenService } from "@/services";
import { urlHelper } from "@/helpers";
const service = axios.create({
  baseURL: `${baseUrl}/arcgis/rest/services`,
  withCredentials: false,

  returnFullResponse: false,
  popupErrorMessage: true,
  paramsSerializer: (params) => urlHelper.formatQueryString(params),
});

const getErrorMessage = (response) => {
  let message = "";
  if (response.message || response.responseException) {
    if (response.message) {
      message = response.message;
    } else {
      var keys = Object.keys(
        response.responseException.exceptionMessage.errors
      );
      var firstKey = keys[0];
      message = response.responseException.exceptionMessage.errors[firstKey][0];
    }
  } else message = "Error";

  return message;
};

service.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] = "Bearer " + tokenService.getToken();

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.resolve(error.response);
  }
);

export default service;
