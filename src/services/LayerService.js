import request from "../utils/request";
import {emlakUrl, URL} from "../config/baseUrl";

export default {
    getUserRelatedLayers() {
        return request.get(URL + "/api/userlayer/getuserlayers")
    },
    getLayers(params) {
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
        return request.get(URL + '/api/Map/GetLayers', {
            params: {
                token: params.token,
                f: "json",
                option: "footprints"
            }
        });
    },
    getLayerDynamic(params) {
        return request.get(URL + "/api/map/service/" + params.name + "/MapServer/layers", {
            params: {
                f: "json",
                token: params.token
            }
        });
    },
    getDynamicLayers(params) {
        return request.get(URL + "/api/map/service/" + params.name + "/MapServer/", {
            params: {
                token: params.token,
                f: "json"
            }
        });
    },
    getLayerForEmlakService(params) {
        return request.get(emlakUrl + "/arcgis/rest/services/AZERCOSMOS/" + params.name + "/MapServer", {
            params: {
                token: params.token,
                f: "json"
            }
        });
    },

    getTableData(params) {
        return request.get(URL + "/api/data/get/" + params.name + "/MapServer/" + params.layer + "/query/", {
            params: {
                f: "json",
                ...params,
                returnGeometry: true,
                outFields: "*"
            }
        });
    },

    getGeometryData(params) {
        return request.get(URL + "/api/data/get/" + params.name + "/MapServer/" + params.layer + "/query/", {
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
