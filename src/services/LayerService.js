import Api from './Api'

export default {
    getLayers(params) {
        return Api().post("/api.php", {
            action: 'getServices',
            token: params.token
        })
    },
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
