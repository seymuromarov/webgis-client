import { urlHelper } from "@/helpers";

const getUrl = window.location;
let server_url = getUrl.protocol + "//webgis.azercosmos.az";

const baseUrl = server_url;

const URL =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_BASE_API
    : getUrl.protocol + "//" + process.env.VUE_APP_BASE_API;

const ACCOUNT_URL = {
  LOGIN_URL: URL + "/api/account/login",
};
const BUNCH_URL = {
  ADD: URL + "/api/bunch/add",
  EDIT: URL + "/api/bunch/edit",
  DELETE: URL + "/api/bunch/delete",
  GET: URL + "/api/bunch/get",
  GET_ALL: URL + "/api/bunch/getall",
};
const NDVI_URLS = {
  GET_ALL: URL + "/api/ndviassessment/getall",
};
const LAYER_URLS = {
  GET_ALL: URL + "/api/Map/GetLayers",
};
const DATATABLE_URLS = {
  GET_TABLE_INFO: URL + "/api/datatable/GetTableInfo",
};

const MAP_URLS = {
  MVT: "api/Tile/VectorAsMvt",
  GEOJSON: "api/Tile/VectorAsGeoJson",
};

const ARCGIS_URLS = {
  EXPORT_IMAGE_URL: (name, params) => {
    let url =
      URL +
      "/api/map/service/" +
      name +
      "/MapServer/export?" +
      urlHelper.formatQueryString(params);
    return url;
  },
  SERVICE_URl: URL + "/api/map/service",
};

export {
  baseUrl,
  URL,
  BUNCH_URL,
  ACCOUNT_URL,
  LAYER_URLS,
  DATATABLE_URLS,
  MAP_URLS,
  NDVI_URLS,
  ARCGIS_URLS,
};
