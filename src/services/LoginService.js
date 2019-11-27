import request from "../utils/request";
import { baseUrl, ACCOUNT_URL } from "../config/baseUrl";

export default {
  // getToken(params) {
  //     return request.post("/api.php", {
  //         action: 'getToken',
  //         username: params.username,
  //         password: params.password,
  //     })
  // },
  getToken(params) {
    const getUrl = window.location;
    let host = getUrl.hostname;
    if (host === "localhost") {
      host = "webgis.azercosmos.az";
    }
    return request.get(ACCOUNT_URL.LOGIN_URL, {
      params: {
        request: "gettoken",
        username: params.username,
        password: params.password,
        // expiration: 1440,
        // client: 'referrer',
        // referer: host,
        f: "json"
      }
    });
  },
  getEmlakToken() {
    return request.get(baseUrl + "/emlak", {
      params: {
        f: "json"
      }
    });
  }
};
