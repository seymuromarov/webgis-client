import request from "../utils/request";
import { emlakUrl, URL } from "../config/urls";

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
  getData(url, params) {
    return request.get(url, {
      params
    });
  },
  postData(url, params) {
    return request.post(url, params);
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
    return request.get(URL + "/api/Map/GetLayers");
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
