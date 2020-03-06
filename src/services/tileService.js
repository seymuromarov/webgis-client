import request from "../utils/request";
import qs from "qs";
let get = (url, params) => {
  return request.get(url, {
    params,
    paramsSerializer: params => {
      return qs.stringify(params, { arrayFormat: "indices", allowDots: true });
    }
  });
};

export default { get };
