import Api from './Api'

export default {
    // getToken(params) {
    //     return Api().post("/api.php", {
    //         action: 'getToken',
    //         username: params.username,
    //         password: params.password,
    //     })
    // },
    getToken(params) {
        const getUrl = window.location;
        let baseUrl = 'https://' + getUrl.hostname + ":7777";
        return Api().get(baseUrl + "/arcgis/tokens/", {
            params: {
                request: 'gettoken',
                username: params.username,
                password: params.password,
                expiration: 60,
                f: 'json'
            }
        })
    }

}
