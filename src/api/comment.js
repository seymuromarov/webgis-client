import request from "@/utils/request";
import { COMMENT_URLS } from "@/config/urls";

export default {
  get(id) {
    return request.get(COMMENT_URLS.GET(id));
  },

  add(data) {
    return request.post(COMMENT_URLS.ADD, data);
  },

  delete(id) {
    return request.delete(COMMENT_URLS.DELETE(id));
  },
};
