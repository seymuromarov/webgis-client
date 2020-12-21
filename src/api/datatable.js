import request from "@/utils/request";
import { DATATABLE_URLS } from "@/config/urls";

export default {
  getTableInfo(layerId) {
    return request.get(DATATABLE_URLS.GET_TABLE_INFO(layerId));
  },
  getItem(layerId, gid) {
    return request.get(DATATABLE_URLS.GET_ITEM(layerId, gid));
  },
  addOrEditData(params) {
    return request.post(DATATABLE_URLS.CREATE_OR_UPDATE, params);
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
