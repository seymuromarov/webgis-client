import request from "../utils/request";

import { NDVI_URL } from "../config/urls";

export default {
  getNdvis() {
    return request.get(NDVI_URL.GET_ALL);
  },
};
