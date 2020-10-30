import request from "@/utils/request";
import { URL, LAYER_URLS, DATATABLE_URLS } from "@/config/urls";

export default {
  getUserRelatedLayers() {
    return request.get(URL + "/api/userlayer/getuserlayers");
  },
  getLayers() {
    return request.get(LAYER_URLS.GET_ALL);
  },
  getData(url, params) {
    return request.get(url, {
      params,
    });
  },
  postData(url, params) {
    return request.post(url, params);
  },
  getLayerColumnsDistinctData(params) {
    return request.get(URL + "/api/DataTable/GetDistinctValues/" + params.id, {
      params: {
        f: "json",
      },
    });
  },

  getLayersWithFullData(params) {
    return request.get("/", {
      params: {
        token: params.token,
        f: "json",
        option: "footprints",
      },
    });
  },
  getLayersWithFullDataFromServer(params) {
    return request.get(URL + "/api/Map/GetLayers");
  },

  getLayerDynamic(params) {
    return request.get(
      URL + "/api/map/service/" + params.name + "/MapServer/layers",
      {
        params: {
          f: "json",
          token: params.token,
        },
      }
    );
  },
  getDynamicLayers(params) {
    return request.get(
      URL + "/api/map/service/" + params.name + "/MapServer/",
      {
        params: {
          token: params.token,
          f: "json",
        },
      }
    );
  },

  getLocalTableData(params) {
    return request.get(
      URL + "/api/datatable/GetDatas/" + params.layerId + "/",
      {
        params,
      }
    );
  },
  getIntersectLocalTableData(bunchId, params) {
    return request.get(
      URL + "/api/datatable/Intersect/GetData/" + bunchId + "/",
      {
        params,
        // paramsSerializer: (params) => {
        //   return urlHelper.formatQueryString(params);
        // },
      }
    );
  },
  getLocalArithmeticData(params) {
    return request.get(
      URL + "/api/datatable/GetArithmeticData/" + params.layerId + "/",
      {
        params: params,
      }
    );
  },
  getTableHeaders(layerId) {
    return request.get(DATATABLE_URLS.GET_TABLE_INFO + `/${layerId}`);
  },
};
