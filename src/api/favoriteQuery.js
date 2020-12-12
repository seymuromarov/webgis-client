import request from "@/utils/request";
import { FAVORITEQUERY_URLS } from "@/config/urls";

export default {
  get(id) {
    return request.get(FAVORITEQUERY_URLS.GET(id));
  },
  getAll(params) {
    return request.get(FAVORITEQUERY_URLS.GET_ALL, { params });
  },
  add(data) {
    return request.post(FAVORITEQUERY_URLS.ADD, data);
  },
  edit(data) {
    return request.put(FAVORITEQUERY_URLS.EDIT, data);
  },
  delete(id) {
    return request.delete(FAVORITEQUERY_URLS.DELETE(id));
  },
};
