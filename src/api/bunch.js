import request from "@/utils/request";
import { BUNCH_URLS } from "@/config/urls";

export default {
  get(data) {
    return request.post(BUNCH_URLS.ADD, data);
  },
  getAll() {
    return request.get(BUNCH_URLS.GET_ALL);
  },
  add(data) {
    return request.post(BUNCH_URLS.ADD, data);
  },
  edit(data) {
    return request.post(BUNCH_URLS.ADD, data);
  },
  remove(id) {
    return request.delete(BUNCH_URLS.DELETE + "/" + id);
  },
};
