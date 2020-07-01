import request from "@/utils/request";
import { DATATABLE_URLS } from "@/config/urls";

export default {
  getTableInfo(layerId) {
    return request.get(DATATABLE_URLS.GET_TABLE_INFO + "/" + layerId);
  },
  addData(params) {
    return request.post(DATATABLE_URLS.ADD, params);
  },
};
