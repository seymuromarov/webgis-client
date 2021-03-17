import request from "@/utils/request";
import { LAYER_URLS, DATATABLE_URLS } from "@/config/urls";

export default {
  getLayers() {
    return request.get(LAYER_URLS.GET_ALL);
  },
  getData(url, params) {
    return request.get(url, {
      params,
    });
  },
  postData(url, params) {
    return request.post(url, params);
  },
};
