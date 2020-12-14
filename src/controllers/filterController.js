import $store from "@/store/store.js";
import {
  tableController,
  serviceController,
  layerController,
} from "@/controllers";
import { serviceHelper } from "@/helpers";
import datatable from "@/api/datatable";

const functions = {};

const getters = {
  async getFilterColumnValues(id, column) {
    const service = layerController.getDynamicLayer(id);
    let filterColumnValues = [];
    const layerId = service.id;
    const response = await datatable.getDistinctValues(layerId);
    const result = response;

    filterColumnValues =
      result[
        Object.keys(result).find(
          (key) => key.toLowerCase() === column.toLowerCase()
        )
      ];

    return filterColumnValues;
  },
  getIsRequiredServiceRefresh() {
    return $store.getters.isRequiredServiceRefresh;
  },
};
const setters = {
  setIsRequiredServiceRefresh(val) {
    $store.dispatch("saveIsRequiredServiceRefreshStatus", val);
  },
};
export default { ...functions, ...getters, ...setters };
