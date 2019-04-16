import Api from './Api'

export default {
    getLayers(params) {
        return Api().post("/api.php", {
            action: 'getServices',
            token: params.token
        })
    }
}
