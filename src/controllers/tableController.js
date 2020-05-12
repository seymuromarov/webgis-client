import $store from "@/store/store.js";
import { serviceHelper, layerHelper } from "@/helpers";
import { layerService, tokenService } from "@/services";
import {
  mapController,
  modalController,
  filterController,
} from "@/controllers";
const tableData = {
  get() {
    return $store.getters.tableData;
  },
  set(val) {
    $store.dispatch("SAVE_DATATABLE", val);
  },
};
const functions = {
  buildTableData(data, selectedService) {
    const item = data;
    let target = item.fieldAliases;
    let tableHeadersWithAlias = item.fieldAliases;
    let tableHeaders = item.fieldAliases;
    let checkedColumnsData = [];
    let checkedColumns = tableHeaders.map((val, key) => {
      return key;
    });

    // let defaultUnCheckedColumns = ["OBJECTID", "Shape_Length", "Shape_Area"];

    // for (let alias in tableHeaders) {
    //   console.log("buildTableData -> alias", alias);
    //   // if (!defaultUnCheckedColumns.includes(tableHeaders[alias])) {
    //   // checkedColumnsData.push(tableHeaders[alias]);

    //   checkedColumns.push(tableHeaders[alias]);
    //   // }
    // }

    // for (var i = 0; i < tableHeaders.length; i++) {
    //   let key = parseInt(i);
    //   let val = parseInt(tableHeaders[i]);
    //   // if (!defaultUnCheckedColumns.includes(tableHeaders[alias])) {
    //   // checkedColumnsData.push(tableHeaders[alias]);

    //   checkedColumns.push(key);
    //   // }
    // }

    tableHeaders = tableHeaders.map((item, index) => {
      let name = item;
      for (let k in target) {
        if (typeof target[k] !== "function") {
          if (item === k) {
            name = target[k];
          }
        }
      }
      return name;
    });

    // checkedColumns = checkedColumns.map((item, index) => {
    //   return tableHeadersWithAlias[item];
    // });
    var dataObj = {
      totalCount: item.totalCount,
      tableName: selectedService.name,
      tableHeaders: tableHeaders,
      tableStackedHeaders: Object.keys(tableHeadersWithAlias),
      tableHeadersWithAlias,
      features: item.features,
      filterValues: [],
      target,
      checkedColumnsData,
      checkedColumns,
    };

    let paging = getters.getDefaultPagingOptions();

    // let tableData = getters.getTableData();

    // let activeService = getters.getTableActiveService();
    // if (
    //   serviceHelper.isBunch(selectedService) &&
    //   serviceHelper.isEqual(selectedService, activeService)
    // ) {
    //   for (let i = 0; i < dataTableArr.length; i++) {
    //     const item = dataTableArr[i];
    //     let isExist = tableData.some((c) => c.service.id === item.service.id);

    //     if (isExist) {
    //       tableData = tableData.map((val) => {
    //         const { service, data } = item;

    //         if (val.service.id === item.service.id) {
    //           val.service = service;
    //           val.data = data;
    //         }
    //         return val;
    //       });
    //     } else {
    //       tableData.push(item);
    //     }
    //   }
    // } else {
    //   tableData = dataTableArr;
    // }
    // let tabs = tableData.map((item, index) => {
    //   return {
    //     id: item.service.id,
    //     name: item.service.name,
    //   };
    // });
    setters.setTableData(dataObj);
    setters.setTablePaging(paging);
    // setters.setTableTabs(tabs);
  },

  getTable: async (service) => {
    setters.setTableVisible();
    setters.setTableLoading(true);

    let response = await functions.getTableResponse(service);
    let isSumFilter = getters.getIsSumFilter();
    // let activeService = getters.getTableActiveService();

    let isLayer = serviceHelper.isLayer(service);
    let isLocalService = serviceHelper.isLocalService(service);

    if (isLocalService) {
      if (isSumFilter && isLayer) {
        setters.setSumData(response.data.result);
        modalController.showSumResultModal();
      }

      //if (serviceHelper.isQueryExist(service))
      if (filterController.getIsRequiredServiceRefresh())
        mapController.refreshService(service);
    }

    // let data = [];

    // if (!Array.isArray(response.data)) {
    //   response.data["service"] = service;
    //   data = [response.data];
    // } else {
    //   data = response.data;
    // }

    if (response.data.error !== undefined) {
      return;
    }

    if (!isSumFilter) {
      setters.setUnvisible();

      functions.buildTableData(response.data, service);

      setters.setTableVisible();
    }
    setters.setTableActiveService(service);
    setters.setIsSumFilter(false);
    setters.setTableLoading(false);
  },
  getTableResponse: async (service) => {
    let response;
    let params = {};
    let token = tokenService.getToken();
    let paging = getters.getDefaultPagingOptions();
    let activeService = getters.getTableActiveService();
    let isArcgisService = serviceHelper.isArcgisService(service);

    if (isArcgisService) {
      params = {
        token: token,
        name: service.name,
        layer: service.id,
        ...service.query,
      };
      response = await layerService.getTableData(params);
    } else {
      var isBunch = serviceHelper.isBunch(service);
      if (isBunch) {
        params = service.layers.map((item, index) => {
          return {
            layerId: item.id,
            query: { ...item.query },
          };
        });
        response = await layerService.getIntersectLocalTableData(service.id, {
          layerQueries: params,
          paging: paging,
        });
      } else {
        params = {
          layerId: service.id,
          ...service.query,
          paging: paging,
        };
        let isSumFilter = getters.getIsSumFilter();

        if (isSumFilter) {
          params.isSum = isSumFilter;
          params.ArithmeticColumnName = getters.getSumFilterColumn();

          response = await layerService.getLocalArithmeticData(params);
          // this.ArithmeticDataResult = response.data.result;
          // setters.setSumData(response.data.result);
          // this.$moodal.arithmeticResultModal.show();
        } else {
          response = await layerService.getLocalTableData(params);
        }
      }
    }

    return response;
  },
};

const getters = {
  getTableData() {
    return $store.getters.tableData;
  },
  getTablePaging() {
    return $store.getters.tablePaging;
  },
  getServiceData(serviceId) {
    let data = getters.getTableData();
    let result = data.find((x) => x.service.id === serviceId);
    return result;
  },
  getTableActiveService() {
    return $store.getters.tableActiveService;
  },
  getDefaultPagingOptions() {
    return {
      page: 1,
      limit: 25,
      isBusy: false,
    };
  },
  getIsSumFilter() {
    return $store.getters.isSumFilter;
  },
  getSumFilterColumn() {
    return $store.getters.sumFilterColumn;
  },
  getTableVisibility() {
    return $store.getters.dataTableVisibleStatus;
  },
  getTableLoadingStatus() {
    return $store.getters.dataTableLoading;
  },
};

const setters = {
  setTableData(val) {
    $store.dispatch("SAVE_DATATABLE", val);
  },
  setTableActiveService(val) {
    $store.dispatch("saveTableActiveService", val);
  },
  setTableTabs(val) {
    $store.dispatch("SAVE_DATATABLE_TABS", val);
  },
  setTableVisible() {
    $store.dispatch("SAVE_DATATABLE_VISIBLE", true);
  },

  setUnvisible() {
    $store.dispatch("SAVE_DATATABLE_VISIBLE", false);
  },
  setTableLoading(val) {
    $store.dispatch("SAVE_DATATABLE_LOADING", val);
  },

  setIsSumFilter(val) {
    $store.dispatch("saveIsSumFilter", val);
  },
  setSumFilterColumn(val) {
    $store.dispatch("saveSumFilterColumn", val);
  },
  setSumData(val) {
    $store.dispatch("saveSumData", val);
  },
  setTablePaging(val) {
    $store.dispatch("saveDataTablePaging", val);
  },
  //   setPaging(serviceId, val) {
  //     let data = tableData.get();
  //     data = data.map((item) => {
  //       if (item.service.id === serviceId) item.paging = val;
  //       return item;
  //     });
  //     tableData.set(data);
  //   },
};
export default { ...functions, ...getters, ...setters };
