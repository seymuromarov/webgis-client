import request from "@/utils/request";
import { WORKSPACE_URLS } from "@/config/urls";

export default {
  get() {
    return request.get(WORKSPACE_URLS.GET);
  },
  set(data) {
    return request.post(WORKSPACE_URLS.SET, data);
  },
  delete() {
    return request.post(WORKSPACE_URLS.DELETE);
  },
};
