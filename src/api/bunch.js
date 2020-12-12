import request from "@/utils/request";
import { BUNCH_URLS } from "@/config/urls";

export default {
  get(id) {
    return request.get(BUNCH_URLS.GET(id));
  },
  getAll() {
    return request.get(BUNCH_URLS.GET_ALL);
  },
  add(data) {
    return request.post(BUNCH_URLS.ADD, data);
  },
  edit(data) {
    return request.put(BUNCH_URLS.ADD, data);
  },
  remove(id) {
    return request.delete(BUNCH_URLS.DELETE(id));
  },
};
