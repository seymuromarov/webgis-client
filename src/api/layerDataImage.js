import request from "@/utils/request";
import { LAYER_DATA_IMAGE_URLS } from "@/config/urls";

export default {
  get(id) {
    return request.get(LAYER_DATA_IMAGE_URLS.GET(id));
  },
  getAll() {
    return request.get(LAYER_DATA_IMAGE_URLS.GET_ALL);
  },

  getFile(id) {
    return request.get(LAYER_DATA_IMAGE_URLS.GET_BASE64_FILE(id));
  },
  getAll(layerId, gid) {
    const params = { layerId, gid };
    return request.get(LAYER_DATA_IMAGE_URLS.GET_ALL, { params });
  },
  add(data) {
    return request.post(LAYER_DATA_IMAGE_URLS.ADD, data);
  },
  delete(id) {
    return request.post(LAYER_DATA_IMAGE_URLS.DELETE(id));
  },
};
