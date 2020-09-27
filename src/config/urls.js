import { urlHelper } from "@/helpers";

const getUrl = window.location;
let server_url = getUrl.protocol + "//webgis.azercosmos.az";

const baseUrl = server_url;
const URL =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_BASE_API
    : getUrl.protocol + "//" + process.env.VUE_APP_BASE_API;

const USER_URLS = {
  GET_INFO_URL: URL + "/api/user/GetInfo",
  GET_URL: URL + "/api/user/Get",
};
const ACCOUNT_URL = {
  LOGIN_URL: URL + "/api/account/gettoken",
};
const LANGUAGE_URL = {
  GET_LANGUAGE: URL + "/api/language/getlanguages",
};
const BUNCH_URLS = {
  ADD: URL + "/api/bunch/add",
  EDIT: URL + "/api/bunch/edit",
  DELETE: URL + "/api/bunch/delete",
  GET: URL + "/api/bunch/get",
  GET_ALL: URL + "/api/bunch/getall",
};
const FAVORITEQUERY_URLS = {
  ADD: URL + "/api/favoritequery/add",
  EDIT: URL + "/api/favoritequery/edit",
  DELETE: URL + "/api/favoritequery/delete",
  GET: URL + "/api/favoritequery/get",
  GET_ALL: URL + "/api/favoritequery/getall",
};
const FAVORITELAYER_URLS = {
  SET: URL + "/api/favoritelayer/set",
  GET_ALL: URL + "/api/favoritelayer/getall",
};
const WORKSPACE_URLS = {
  SET: URL + "/api/workspace/set",
  GET: URL + "/api/workspace/get",
  DELETE: URL + "/api/workspace/delete",
};
const DEFAULTLAYER_URLS = {
  SET: URL + "/api/defaultlayer/set",
  GET_ALL: URL + "/api/defaultlayer/getall",
};
const NOTIFICATION_URLS = {
  GET_ALL: URL + "/api/notification/getall",
  SET_READED: URL + "/api/notification/setreaded",
  GET_UNREAD_NOTIFICATION_COUNT:
    URL + "/api/notification/GetUnreadNotificationCount",
};
const NDVI_URLS = {
  GET_ALL: URL + "/api/ndviassessment/getall",
};
const LAYER_URLS = {
  GET_ALL: URL + "/api/Map/GetLayers",
};
const DATATABLE_URLS = {
  GET_TABLE_INFO: URL + "/api/datatable/GetTableInfo",
  ADD_OR_EDIT: URL + "/api/datatable/AddOrEdit",
  GET_ITEM: URL + "/api/datatable/GetItem",
};

const LAYER_DATA_IMAGE_URLS = {
  GET: URL + "/api/layerdataimage/Get",
  GET_ALL: URL + "/api/layerdataimage/GetAll",
  ADD: URL + "/api/layerdataimage/Add",
  GET_BASE64_FILE: URL + "/api/layerdataimage/GetBase64File",
  DELETE: URL + "/api/layerdataimage/Delete",
};

const MAP_URLS = {
  MVT: "api/Tile/VectorAsMvt",
};

const ARCGIS_URLS = {
  EXPORT_IMAGE_URL: (name, params) => {
    let url =
      URL +
      "/api/service/arcgis/" +
      name +
      "/?" +
      urlHelper.formatQueryString(params);
    return url;
  },
  SERVICE_URl: URL + "/api/map/service",
};

export {
  baseUrl,
  URL,
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
  MAP_URLS,
  NDVI_URLS,
  ARCGIS_URLS,
};
