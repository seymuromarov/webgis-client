import { urlHelper } from "@/helpers";
const apiUrl = process.env.VUE_APP_BASE_API;
const USER_URLS = {
  GET_INFO_URL: "/user/GetInfo",
  GET_URL: "/user",
};
const ACCOUNT_URL = {
  LOGIN_URL: "/gettoken",
};
const LANGUAGE_URL = {
  GET_LANGUAGE: "/language",
};
const BUNCH_URLS = {
  ADD: "/bunch",
  EDIT: "/bunch",
  DELETE: (id) => `/bunch/${id}`,
  GET: (id) => `/bunch/${id}`,
  GET_ALL: "/bunch",
};
const FAVORITEQUERY_URLS = {
  ADD: "/favoritequery",
  EDIT: "/favoritequery",
  DELETE: (id) => `/favoritequery/${id}`,
  GET: (id) => `/favoritequery/${id}`,
  GET_ALL: "/favoritequery",
};
const FAVORITELAYER_URLS = {
  SET: "/favoritelayer",
  GET_ALL: "/favoritelayer",
};
const WORKSPACE_URLS = {
  SET: "/workspace",
  GET: "/workspace",
  RESET: "/workspace",
};
const DEFAULTLAYER_URLS = {
  SET: "/defaultlayer",
  GET_ALL: "/defaultlayer",
};
const NOTIFICATION_URLS = {
  GET_ALL: "/notification",
  SET_READED: (id) => `/notification/${id}/setreaded`,
  GET_UNREAD_NOTIFICATION_COUNT: "/notification/GetUnreadNotificationCount",
};
const NDVI_URLS = {
  GET_ALL: "/ndviassessment",
};
const LAYER_URLS = {
  GET_ALL: "/layer/GetCategorizedLayers",
};
const DATATABLE_URLS = {
  GET_TABLE_INFO: (id) => `/datatable/${id}/GetTableInfo`,
  ADD_OR_EDIT: "/datatable/AddOrEdit",
  GET_ITEM: "/datatable/GetItem",
  GET_DATA: (layerId) => `/datatable/${layerId}/GetData`,
};

const LAYER_DATA_IMAGE_URLS = {
  GET: "/layerdataimage",
  GET_ALL: "/layerdataimage",
  ADD: "/layerdataimage",
  GET_BASE64_FILE: (id) => `/layerdataimage/${id}/GetBase64File`,
  DELETE: (id) => `/layerdataimage/${id}`,
};

const ARCGIS_URLS = {
  EXPORT_IMAGE_URL: (name, params) => {
    let url =
      apiUrl +
      "/service/arcgis/" +
      name +
      "/?" +
      urlHelper.formatQueryString(params);
    return url;
  },
  SERVICE_URl: "/service/arcgis",
};

export {
  LAYER_DATA_IMAGE_URLS,
  USER_URLS,
  LANGUAGE_URL,
  FAVORITEQUERY_URLS,
  DEFAULTLAYER_URLS,
  FAVORITELAYER_URLS,
  NOTIFICATION_URLS,
  WORKSPACE_URLS,
  BUNCH_URLS,
  ACCOUNT_URL,
  LAYER_URLS,
  DATATABLE_URLS,
  NDVI_URLS,
  ARCGIS_URLS,
};
