import request from "@/utils/request";
import { DEFAULTLAYER_URLS } from "@/config/urls";

export default {
  getAll() {
    return request.get(DEFAULTLAYER_URLS.GET_ALL);
  },
  set(data) {
    return request.post(DEFAULTLAYER_URLS.SET, data);
  },
};
