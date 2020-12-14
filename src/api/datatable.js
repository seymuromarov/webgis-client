import request from "@/utils/request";
import { DATATABLE_URLS } from "@/config/urls";

export default {
  getTableInfo(layerId) {
    return request.get(DATATABLE_URLS.GET_TABLE_INFO(layerId));
  },
  getItem(layerId, gid) {
    let params = { gid };

    return request.get(DATATABLE_URLS.GET_ITEM + "/" + layerId + "/", {
      params,
    });
  },
  addOrEditData(params) {
    return request.post(DATATABLE_URLS.ADD_OR_EDIT, params);
  },
  getData(layerId, params) {
    return request.get(DATATABLE_URLS.GET_DATA(layerId), {
      params,
    });
  },
  getIntersectedData(bunchId, params) {
    return request.get(DATATABLE_URLS.GET_INTERSECT_DATA(bunchId), {
      params,
    });
  },
  getArithmeticData(layerId, params) {
    return request.get(DATATABLE_URLS.GET_ARITHMETIC_DATA(layerId), {
      params,
    });
  },
  getDistinctValues(layerId, params) {
    return request.get(DATATABLE_URLS.GET_DISTINCT_VALUES(layerId));
  },
};
