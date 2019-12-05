import request from "../utils/request";
import { LAYER_URLS } from "../config/baseUrl";

export default {
    getUserRelatedLayers () {
        return request.get(LAYER_URLS.GET_USER_RELATED_LAYERS)
    },
    getLayers(params) {
        return request.get("/", {
            params: {
                token: params.token,
                f: "json"
            }
        });
    },
    getLayersF(params) {
        return request.get("/", {
            params: {
                token: params.token,
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
        return request.get(LAYER_URLS.GET_LAYER_NAMES_URL, {
            params: {
                token: params.token,
                f: "json",
                option: "footprints"
            }
        });
    },
    getLayerDynamic(params) {
        return request.get(LAYER_URLS.GET_LAYER_DYNAMIC_URL(params), {
            params: {
                f: "json",
                token: params.token
            }
        });
    },
    getDynamicLayers(params) {
        var url = LAYER_URLS.GET_DYNAMIC_LAYER_URL(params);
        return request.get(url, {
            params: {
                token: params.token,
                f: "json"
            }
        });
    },
    getLayerForEmlakService(params) {
        return request.get(LAYER_URLS.GET_EMLAK_URL(params), {
            params: {
                token: params.token,
                f: "json"
            }
        });
    },

    getTableData(params) {
        return request.get(LAYER_URLS.GET_TABLE_DATA_URL(params), {
            params: {
                f: "json",
                ...params,
                returnGeometry: true,
                outFields: "*"
            }
        });
    },

    getGeometryData(params) {
        return request.get(LAYER_URLS.GET_GEOMETRY_DATA_URL(params), {
            params: {
                token: params.token,
                f: "json",
                where: params.where,
                returnGeometry: true,
                geometryType: "esriGeometryPoint",
                geometry: params.geometry,
                outFields: "*"
            }
        });
    }
};
