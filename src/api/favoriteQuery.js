import request from "@/utils/request";
import { FAVORITEQUERY_URLS } from "@/config/urls";

export default {
  get(id) {
    return request.get(FAVORITEQUERY_URLS.GET_TABLE_INFO + "/" + id);
  },
  getAll(params) {
    return request.get(FAVORITEQUERY_URLS.GET_ALL, { params });
  },
  add(data) {
    return request.post(FAVORITEQUERY_URLS.ADD, data);
  },
  edit(data) {
    return request.post(FAVORITEQUERY_URLS.EDIT, data);
  },
  delete(id) {
    return request.post(FAVORITEQUERY_URLS.DELETE + "/" + id);
  },
};
