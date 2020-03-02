const getUrl = window.location;
let server_url = getUrl.protocol + "//webgis.azercosmos.az";

const baseUrl = server_url;
const emlakUrl = getUrl.protocol + "//webgis.azercosmos.az/emlak";

// const SERVER_URL = "http://webgis1.azercosmos.az";
// const LOCAL_URL = "https://localhost:5001";
console.log(process.env);
const URL =
  process.env.NODE_ENV === "development"
    ? process.env.VUE_APP_BASE_API
    : getUrl.protocol + "//" + process.env.VUE_APP_BASE_API;

const ACCOUNT_URL = {
  LOGIN_URL: URL + "/api/account/login"
};
const LAYER_URLS = {
  // GET_LAYER_NAMES_URL: URL + "/api/Map/GetLayers", // local server
  // GET_LAYER_DYNAMIC_URL: params => {
  //   return URL + "/api/map/service/" + params.name + "/MapServer/layers";
  // },
  // GET_DYNAMIC_LAYER_URL: params => {
  //   return URL + "/api/map/service/" + params.name + "/MapServer/";
  // },
  // GET_EMLAK_URL: params => {
  //   return (
  //     emlakUrl +
  //     "/arcgis/rest/services/AZERCOSMOS/" +
  //     params.name +
  //     "/MapServer"
  //   );
  // },
  // GET_TABLE_DATA_URL: params => {
  //   return (
  //     URL +
  //     "/api/data/get/" +
  //     params.name +
  //     "/MapServer/" +
  //     params.layer +
  //     "/query/"
  //   );
  // },
  // GET_GEOMETRY_DATA_URL: () => {
  //   return (
  //     URL +
  //     "/api/data/get/" +
  //     params.name +
  //     "/MapServer/" +
  //     params.layer +
  //     "/query/"
  //   );
  // },
  // GET_USER_RELATED_LAYERS: URL + "/api/userlayer/getuserlayers",
  // GET_DRAWN_AREA_IMAGE: params => {
  //   return LAYER_URLS.GET_DYNAMIC_LAYER_URL(params) + "export";
  // }
};

const MAP_URLS = {
  MVT: "api/Tile/VectorAsMvt",
  GEOJSON: "api/Tile/VectorAsGeoJson"
};

export { baseUrl, URL, emlakUrl, ACCOUNT_URL, LAYER_URLS, MAP_URLS };