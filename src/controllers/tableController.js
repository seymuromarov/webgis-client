import $store from "@/store/store.js";
import { serviceHelper } from "@/helpers";
import { tokenService } from "@/services";
import layer from "@/api/layer";
import {
  mapController,
  layerController,
  modalController,
  filterController,
} from "@/controllers";

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

    setters.setTableData(dataObj);
    setters.setTablePaging(paging);
  },

  getTable: async (service) => {
    service = layerController.getDynamicLayer(service.id);
    setters.setTableVisible();
    setters.setTableLoading(true);

    let response = await functions.getTableResponse(service);
    let isSumFilter = getters.getIsSumFilter();

    let isLayer = serviceHelper.isLayer(service);
    let isLocalService = serviceHelper.isLocalService(service);
    let isBunch = serviceHelper.isBunch(service);

    if (isLocalService || isBunch) {
      if (isSumFilter && isLayer && !isBunch) {
        setters.setSumData(response.data.result);
        modalController.showSumResultModal();
      }

      if (filterController.getIsRequiredServiceRefresh())
        mapController.refreshService(service);
    }

    if (response.data.error !== undefined) {
      return;
    }

    if (!isSumFilter) {
      setters.setTableUnvisible();

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
      response = await layer.getTableData(params);
    } else {
      var isBunch = serviceHelper.isBunch(service);
      if (isBunch) {
        params = service.layers.map((item, index) => {
          return {
            layerId: item.id,
            query: { ...item.query },
          };
        });
        response = await layer.getIntersectLocalTableData(service.id, {
          layerQueries: params,
          paging: paging,
        });
      } else {
        params = {
          layerId: service.id,
          ...service.query,
          paging: paging,
          returnGeom: true,
        };
        let isSumFilter = getters.getIsSumFilter();

        if (isSumFilter) {
          params.isSum = isSumFilter;
          params.ArithmeticColumnName = getters.getSumFilterColumn();

          response = await layer.getLocalArithmeticData(params);
          // this.ArithmeticDataResult = response.data.result;
          // setters.setSumData(response.data.result);
          // this.$moodal.arithmeticResultModal.show();
        } else {
          response = await layer.getLocalTableData(params);
        }
      }
    }

    return response;
  },
  async getGeometryData(layerId, coords) {
    let response = null;
    let geometry = null;
    let service = layerController.getDynamicLayer(layerId);
    if (serviceHelper.isLayer(service)) {
      if (serviceHelper.isDynamicFromArcgis(service)) {
        geometry = coords[0] + "," + coords[1];
        var params = {
          token: tokenService.getToken(),
          name: service.name,
          layer: service.name,
          where: service.query.where,
          geometry: geometry,
        };
        response = await layer.getGeometryData(params);
      } else {
        var params = {
          layerId: service.id,
          where: service.query.where,
          geometry: coords[0] + "," + coords[1],
        };
        response = await layer.getLocalTableData(params);
      }
      return response;
      // if (response.data.totalCount > 0) {
      //   let features = response.data.features[0];
      //   this.$refs.dataTable.showDataModal(features.attributes);
      //   this.mapSetCenter(features);
      // }
    }
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
  getIsEditData() {
    return $store.getters.isEditData;
  },
  getEditDataGid() {
    return $store.getters.editDataGid;
  },
  getInfoData() {
    return $store.getters.infoData;
  },
};

const setters = {
  setTableData(val) {
    $store.dispatch("SAVE_DATATABLE", val);
  },
  setIsEditData(val) {
    $store.dispatch("saveIsEditData", val);
  },
  setEditDataGid(val) {
    $store.dispatch("saveEditDataGid", val);
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

  setTableUnvisible() {
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
  setInfoData(val) {
    $store.dispatch("saveInfoData", val);
  },
};
export default { ...functions, ...getters, ...setters };
