import $store from "@/store/store.js";
import { tableController } from "@/controllers";
import { serviceHelper } from "@/helpers";
import { layerService } from "@/services";

const functions = {};

const getters = {
  async getFilterColumnValues(id, column) {
    console.log("getFilterColumnValues -> id, column", column);

    const serviceData = tableController.getServiceData(id);
    console.log("getFilterColumnValues -> serviceData", serviceData);
    const service = serviceData.service;
    let filterColumnValues = [];
    const params = { id };

    if (serviceHelper.isLocalService(service)) {
      const getLayerColumnsDistinctData = await layerService.getLayerColumnsDistinctData(
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
      const keys = Object.keys(serviceData.tableHeadersWithAlias);
      for (let i = 0; i < keys.length; i++) {
        if (serviceData.tableHeadersWithAlias[keys[i]] === column) {
          column = keys[i];
          break;
        }
      }
      for (let i = 0; i < serviceData.tableData.length; i++) {
        if (
          !filterColumnValues.includes(
            serviceData.tableData[i].attributes[column]
          )
        ) {
          filterColumnValues.push(serviceData.tableData[i].attributes[column]);
        }
      }
    }

    return filterColumnValues;
  },
};
const setters = {};
export default { ...functions, ...getters, ...setters };