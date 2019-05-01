import Api from './Api'
import {baseUrl} from "../config/baseUrl";

export default {
    // getToken(params) {
    //     return Api().post("/api.php", {
    //         action: 'getToken',
    //         username: params.username,
    //         password: params.password,
    //     })
    // },
    getToken(params) {
        return Api().get(baseUrl + "/arcgis/tokens/", {
            params: {
                request: 'gettoken',
                username: params.username,
                password: params.password,
                expiration: 1440,
                client: 'referrer',
                referer: "webgis.azercosmos.az",
                f: 'json'
            }
        })
    }

}
