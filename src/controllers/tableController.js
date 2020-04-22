import $store from "@/store/store.js";
import { serviceHelper, layerHelper } from "@/helpers";
import { layerService, tokenService } from "@/services";
import { mapController } from "@/controllers";
const tableData = {
  get() {
    return $store.getters.tableData;
  },
  set(val) {
    $store.dispatch("SAVE_DATATABLE", val);
  },
};
const functions = {
  buildTableData(dataArr) {
    var dataTableArr = [];
    for (let i = 0; i < dataArr.length; i++) {
      const item = dataArr[i];
      let target = item.fieldAliases;
      let tableHeadersWithAlias = item.fieldAliases;
      let tableHeaders = Object.keys(tableHeadersWithAlias);
      let checkedColumnsData = [];
      let checkedColumns = [];

      let defaultUnCheckedColumns = ["OBJECTID", "Shape_Length", "Shape_Area"];

      for (let alias in tableHeaders) {
        if (!defaultUnCheckedColumns.includes(tableHeaders[alias])) {
          checkedColumnsData.push(tableHeaders[alias]);
          checkedColumns.push(tableHeaders[alias]);
        }
      }

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

      checkedColumns = checkedColumns.map((item, index) => {
        return tableHeadersWithAlias[item];
      });

      dataTableArr.push({
        service: item.service,
        data: {
          totalCount: item.totalCount,
          tableName: item.service.name,
          tableHeaders: tableHeaders,
          tableStackedHeaders: Object.keys(tableHeadersWithAlias),
          tableHeadersWithAlias,
          tableData: item.features,
          filterValues: [],
          target,
          checkedColumnsData,
          checkedColumns,
        },
        paging: {
          isBusy: false,
          page: 1,
          limit: 25,
        },
      });
    }

    let tableData = getters.setTableData();
    let activeService = getters.getTableActiveService();
    if (serviceHelper.isBunch(activeService)) {
      for (let i = 0; i < dataTableArr.length; i++) {
        const item = dataTableArr[i];
        let isExist = tableData.some((c) => c.service.id === item.service.id);

        if (isExist) {
          tableData = tableData.map((val) => {
            const { service, data } = item;

            if (val.service.id === item.service.id) {
              val.service = service;
              val.data = data;
            }
            return val;
          });
        } else {
          tableData.push(item);
        }
      }
    } else {
      tableData = dataTableArr;
    }
    let tabs = tableData.map((item, index) => {
      return {
        id: item.service.id,
        name: item.service.name,
      };
    });
    setters.setTableData(tableData);
    setters.setTableTabs(tabs);
    // this.$store.dispatch("SAVE_DATATABLE", tableData);
    // this.$store.dispatch("SAVE_DATATABLE_TABS", tabs);
  },
  async getTableData(service) {
    setters.setVisible();
    setters.setLoading(true);

    let response = functions.getTableResponse();
    let isSumFilter = getters.getIsSumFilter();
    let activeService = getters.getTableActiveService();
    let isLayer = serviceHelper.isLayer(activeService);
    let isLocalService = serviceHelper.isLocalService(activeService);

    if (isLocalService) {
      if (isSumFilter && isLayer) {
        setters.setSumData(response.data.result);
        this.$moodal.arithmeticResultModal.show();
      }

      if (serviceHelper.isQueryExist(service))
        mapController.refreshService(activeService);
    }

    let data = [];

    if (!Array.isArray(response.data)) {
      response.data["service"] = service;
      data = [response.data];
    } else {
      data = response.data;
    }

    setters.setLoading(false);
    if (response.data.error !== undefined) {
      return;
    }

    if (!isSumFilter) {
      setters.setUnvisible();

      functions.buildTableData(data);

      setters.setVisible();
    }
    setters.setIsSumFilter(false);
  },
  getTableResponse: async () => {
    let response;
    let params = {};
    let token = tokenService.getToken();
    let paging = tableController.getDefaultPagingOptions();
    let isArcgisService = serviceHelper.isArcgisService(service);

    if (isArcgisService) {
      let params = {
        token: token,
        name: service.name,
        layer: service.id,
        ...service.query,
      };
      response = await LayerService.getTableData(params);
    } else {
      var isBunch = serviceHelper.isBunch(this.tableActiveService);
      if (isBunch) {
        var isSameService = this.tableActiveService.type === service.type;

        var queryParams;
        if (isSameService) {
          queryParams = service.layers.map((item, index) => {
            return {
              layerId: item.id,
              query: { ...item.query, paging: paging },
            };
          });
        } else {
          queryParams = [
            {
              layerId: service.id,
              query: { ...service.query, paging: paging },
            },
          ];
        }

        var params = { layerQueries: queryParams };
        response = await layerService.getIntersectLocalTableData(
          this.tableActiveService.id,
          params
        );

        response.data = response.data.map((item) => {
          item.service = layerHelper.dynamicMapping(item.service);
          return item;
        });
      } else {
        let params = {
          layerId: service.id,
          ...query,
          paging: this.tablePaging,
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
  setTableData(serviceId) {
    let data = tableData.get();
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
    };
  },
  getIsSumFilter() {
    return $store.getters.isSumFilter;
  },
  getSumFilterColumn() {
    return $store.getters.sumFilterColumn;
  },
};

const setters = {
  setTableData(val) {
    $store.dispatch("SAVE_DATATABLE", val);
  },
  setTableTabs(val) {
    $store.dispatch("SAVE_DATATABLE_TABS", val);
  },
  setVisible() {
    $store.dispatch("SAVE_DATATABLE_VISIBLE", true);
  },

  setUnvisible() {
    $store.dispatch("SAVE_DATATABLE_VISIBLE", false);
  },
  setLoading(val) {
    $store.dispatch("SAVE_DATATABLE_LOADING", true);
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
  setPaging(serviceId, val) {
    let data = tableData.get();
    data = data.map((item) => {
      if (item.service.id === serviceId) item.paging = val;
      return item;
    });
    tableData.set(data);
  },
};
export default { ...functions, ...getters, ...setters };
