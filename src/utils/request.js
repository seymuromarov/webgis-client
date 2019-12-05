import axios from "axios";
import { baseUrl } from "../config/baseUrl";
import { getToken } from "./token";

const service = axios.create({
  baseURL: `${baseUrl}/arcgis/rest/services`,
  withCredentials: false
});

service.interceptors.request.use(
  request => {
    request.headers["Authorization"] = "Bearer " + getToken();
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
