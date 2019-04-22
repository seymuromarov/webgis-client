import Api from './Api'

export default {
    // getLayers(params) {
    //     return Api().get("http://azcgisiis.gis.az/arcgis/rest/services/", {
    //         params: {
    //             token: params.token,
    //             f: 'json'
    //         }
    //     })
    // },
    getLayerDynamic(params) {
        return Api().post("/api.php", {
            token: params.token,
            service: params.name,
            action: 'getLayers',
        });
    },
    getLayers(params) {
        return Api().post("/api.php", {
            action: 'getServices',
            token: params.token
        })
    },
    // getDynamicLayers(params) {
    //     return Api().get("http://azcgisiis.gis.az/arcgis/rest/services/" + params.name + "/MapServer", {
    //         params: {
    //             token: params.token,
    //             f: 'json'
    //         }
    //     })
    // },
    getDynamicLayers(params) {
        return Api().post("/api.php", {
            action: 'getLayersTypes',
            service: params.name,
            token: params.token
        })
    },
    getTableData(params) {
        return Api().post("/api.php", {
            action: 'getTableData',
            service: params.name,
            layerId: params.layer,
            token: params.token
        })

    }

}
