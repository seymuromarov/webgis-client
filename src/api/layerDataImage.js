import request from "@/utils/request";
import { LAYER_DATA_IMAGE_URLS } from "@/config/urls";

export default {
  get(id) {
    const params = { id };
    return request.get(LAYER_DATA_IMAGE_URLS.GET_TABLE_INFO, { params });
  },
  getAll() {
    return request.get(LAYER_DATA_IMAGE_URLS.GET_ALL);
  },
  getAll(layerId) {
    const params = { layerId };
    return request.get(LAYER_DATA_IMAGE_URLS.GET_ALL, { params });
  },
  getFile(id) {
    return request.get(LAYER_DATA_IMAGE_URLS.GET_BASE64_FILE + "/" + id);
  },
  getAll(layerId, gid) {
    const params = { layerId, gid };
    return request.get(LAYER_DATA_IMAGE_URLS.GET_ALL, { params });
  },
  add(params) {
    return request.post(LAYER_DATA_IMAGE_URLS.ADD, { params });
  },
  delete(id) {
    return request.post(LAYER_DATA_IMAGE_URLS.DELETE + "/" + id);
  },
};
