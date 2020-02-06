import request from "../utils/request";
import { baseUrl, ACCOUNT_URL } from "../config/baseUrl";

export default {
  getToken(params) {
    const getUrl = window.location;
    let host = getUrl.hostname;
    if (host === "localhost") {
      host = "webgis.azercosmos.az";
    }
    return request.post(ACCOUNT_URL.LOGIN_URL, {
      request: "gettoken",
      emailOrUsername: params.username,
      password: params.password,
      // expiration: 1440,
      // client: 'referrer',
      // referer: host,
      f: "json"
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
