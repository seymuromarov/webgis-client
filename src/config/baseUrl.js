const getUrl = window.location;
let server_url = getUrl.protocol + "//webgis.azercosmos.az";

const baseUrl = server_url;
const emlakUrl = getUrl.protocol + "//webgis.azercosmos.az/emlak";

const LOCAL_URL = "https://localhost:5001";

const ACCOUNT_URL = {
  LOGIN_URL: LOCAL_URL + "/api/account/GetToken/"
};
const LAYER_URLS = {
  GET_LAYER_NAMES_URL: LOCAL_URL + "/api/Map/GetArcgisLayers", //local server
  GET_LAYER_DYNAMIC_URL: params => {
    return LOCAL_URL + "/api/map/service/" + params.name + "/MapServer/layers";
  },
  GET_DYNAMIC_LAYER_URL: params => {
    return LOCAL_URL + "/api/map/service/" + params.name + "/MapServer/";
  },
  GET_EMLAK_URL: params => {
    return (
      emlakUrl +
      "/arcgis/rest/services/AZERCOSMOS/" +
      params.name +
      "/MapServer"
    );
  },
  GET_TABLE_DATA_URL: params => {
    return (
      LOCAL_URL +
      "/api/data/get/" +
      params.name +
      "/MapServer/" +
      params.layer +
      "/query/"
    );
  },
  GET_GEOMETRY_DATA_URL: () => {
    return (
      LOCAL_URL +
      "/api/data/get/" +
      params.name +
      "/MapServer/" +
      params.layer +
      "/query/"
    );
  }
};

export { baseUrl, emlakUrl, ACCOUNT_URL, LAYER_URLS };
