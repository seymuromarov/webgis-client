import request from "../utils/request";
import { emlakUrl, URL } from "../config/urls";

const parseParams = params => {
  const keys = Object.keys(params);
  let options = "";

  keys.forEach(key => {
    const isParamTypeObject = typeof params[key] === "object";
    const isParamTypeArray = isParamTypeObject && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach(element => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};
export default {
  getUserRelatedLayers() {
    return request.get(URL + "/api/userlayer/getuserlayers");
  },
  getLayers(params) {
    return request.get("/", {
      params: {
        token: params.token,
        f: "json"
      }
    });
  },
  getLayerColumnsDistinctData(params) {
    return request.get(URL + "/api/DataTable/GetDistinctValues/" + params.id, {
      params: {
        f: "json"
      }
    });
  },

  getLayersWithFullData(params) {
    return request.get("/", {
      params: {
        token: params.token,
        f: "json",
        option: "footprints"
      }
    });
  },
  getLayersWithFullDataFromServer(params) {
    return request.get(URL + "/api/Map/GetLayers", {
      params: {
        token: params.token,
        f: "json",
        option: "footprints"
      }
    });
  },
  // getLocalLayerDynamic(params) {
  //     return request.get(URL + "/api/data/", {
  //         params: {
  //             f: "json",
  //             token: params.token
  //         }
  //     });
  // },
  getLayerDynamic(params) {
    return request.get(
      URL + "/api/map/service/" + params.name + "/MapServer/layers",
      {
        params: {
          f: "json",
          token: params.token
        }
      }
    );
  },
  getDynamicLayers(params) {
    return request.get(
      URL + "/api/map/service/" + params.name + "/MapServer/",
      {
        params: {
          token: params.token,
          f: "json"
        }
      }
    );
  },
  getLayerForEmlakService(params) {
    return request.get(
      emlakUrl +
        "/arcgis/rest/services/AZERCOSMOS/" +
        params.name +
        "/MapServer",
      {
        params: {
          token: params.token,
          f: "json"
        }
      }
    );
  },
  getLocalTableData(params) {
    return request.get(
      URL + "/api/datatable/GetDatas/" + params.layerId + "/",
      {
        params: params
      }
    );
  },
  getLocalArithmeticData(params) {
    return request.get(
      URL + "/api/datatable/GetArithmeticData/" + params.layerId + "/",
      {
        params: params
      }
    );
  },
  getTableData(params) {
    return request.get(
      URL +
        "/api/data/get/" +
        params.name +
        "/MapServer/" +
        params.layer +
        "/query/",
      {
        params: {
          f: "json",
          ...params,
          returnGeometry: true,
          outFields: "*"
        }
      }
    );
  },

  getGeometryData(params) {
    return request.get(
      URL +
        "/api/data/get/" +
        params.name +
        "/MapServer/" +
        params.layer +
        "/query/",
      {
        params: {
          token: params.token,
          f: "json",
          where: params.where,
          returnGeometry: true,
          geometryType: "esriGeometryPoint",
          geometry: params.geometry,
          outFields: "*"
        }
      }
    );
  },
  getLocalGeometryData(params) {
    return request.get(URL + "/api/geo/vectordata/" + params.layerId + "/", {
      params: params
    });
  }
};
