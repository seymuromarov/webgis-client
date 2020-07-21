import request from "@/utils/request";
import { FAVORITELAYER_URLS } from "@/config/urls";

export default {
  getAll() {
    return request.get(FAVORITELAYER_URLS.GET_ALL);
  },
  set(data) {
    return request.post(FAVORITELAYER_URLS.SET, data);
  },
};
