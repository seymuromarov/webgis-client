import $store from "@/store/store.js";
import {
  tableController,
  serviceController,
  layerController,
} from "@/controllers";
import { serviceHelper } from "@/helpers";
import layer from "@/api/layer";

const functions = {};

const getters = {
  async getFilterColumnValues(id, column) {
    const service = layerController.getDynamicLayer(id);
    console.log("getFilterColumnValues -> service", service);
    let filterColumnValues = [];
    const params = { id };

    if (serviceHelper.isLocalService(service)) {
      const getLayerColumnsDistinctData = await layer.getLayerColumnsDistinctData(
        params
      );
      const result = getLayerColumnsDistinctData.data.result;

      filterColumnValues =
        result[
          Object.keys(result).find(
            (key) => key.toLowerCase() === column.toLowerCase()
          )
        ];
    } else {
      const tableData = tableController.getTableData();

      const keys = Object.keys(tableData.tableHeadersWithAlias);
      for (let i = 0; i < keys.length; i++) {
        if (tableData.tableHeadersWithAlias[keys[i]] === column) {
          column = keys[i];
          break;
        }
      }
      for (let i = 0; i < tableData.features.length; i++) {
        if (
          !filterColumnValues.includes(tableData.features[i].attributes[column])
        ) {
          filterColumnValues.push(tableData.features[i].attributes[column]);
        }
      }
    }

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
