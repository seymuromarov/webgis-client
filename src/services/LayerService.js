import Api from './Api'

export default {
    getLayers(params) {
        return Api().get("/", {
            params: {
                token: params.token,
                f: 'json'
            }
        })
    },
    getLayerDynamic(params) {
        return Api().get("/" + params.name + "/MapServer/layers", {
            params: {
                f: 'json',
                token: params.token,
            }
        });
    },
    getDynamicLayers(params) {
        return Api().get("/" + params.name + "/MapServer", {
            params: {
                token: params.token,
                f: 'json'
            }
        })
    },
    getTableData(params) {
        return Api().get("/" + params.name + "/MapServer/" + params.layer + "/query/", {
            params: {

                token: params.token,
                f: 'json',
                where: params.where,
                returnGeometry: false,
                outFields: '*',
            }
        })
    },
    getGeometryData(params) {
        return Api().get("/" + params.name + "/MapServer/" + params.layer + "/query/", {
            params: {
                token: params.token,
                f: 'json',
                where: params.where,
                returnGeometry: true,
                geometryType: 'esriGeometryPoint',
                geometry:params.geometry,
                outFields: '*',
            }
        })
    },
    // getLayers(params) {
    //     return Api().post("/api.php", {
    //         action: 'getServices',
    //         token: params.token
    //     })
    // },
    // getDynamicLayers(params) {
    //     return Api().post("/api.php", {
    //         action: 'getLayersTypes',
    //         service: params.name,
    //         token: params.token
    //     })
    // },
    // getTableData(params) {
    //     return Api().post("/api.php", {
    //         action: 'getTableData',
    //         service: params.name,
    //         layerId: params.layer,
    //         token: params.token
    //     })
    //
    // },
    // getLayerDynamic(params) {
    //     return Api().post("/api.php", {
    //         token: params.token,
    //         service: params.name,
    //         action: 'getLayers',
    //     });
    // },


}
