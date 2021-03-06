import { serviceHelper } from "@/helpers";
const state = {
  sumData: null,
  infoData: null,
  data: {},
  paging: {},
  activeTabId: null,
  activeService: null,
  isVisible: false,
  loading: false,
  isEditData: false,
  editDataGid: 0,
};

const mutations = {
  SET_DATATABLE(state, payload) {
    state.data = payload;
  },
  SET_DATATABLE_ACTIVE_TAB_ID(state, payload) {
    state.activeTabId = payload;
  },
  SET_DATATABLE_ACTIVE_SERVICE(state, payload) {
    state.activeService = payload;
  },
  SET_IS_EDIT_DATA(state, payload) {
    state.isEditData = payload;
  },
  SET_EDIT_DATA_GID(state, payload) {
    state.editDataGid = payload;
  },
  SET_DATATABLE_CHECKED_COLUMNS(state, { id, value }) {
    state.data.checkedColumnsData = value;
  },
  SET_DATATABLE_CHECKED_COLUMNS_DATA(state, { id, value }) {
    state.data.checkedColumns = value;
  },

  SET_DATATABLE_VISIBILITY(state, payload) {
    state.isVisible = payload;
  },
  SET_DATATABLE_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_DATATABLE_PAGING(state, payload) {
    state.paging = payload;
  },
  SET_SUM_DATA(state, payload) {
    state.sumData = payload;
  },
  SET_INFO_DATA(state, payload) {
    state.infoData = payload;
  },
};

const actions = {
  saveDatatable(context, payload) {
    context.commit("SET_DATATABLE", payload);
  },
  saveIsEditData(context, payload) {
    context.commit("SET_IS_EDIT_DATA", payload);
  },
  saveEditDataGid(context, payload) {
    context.commit("SET_EDIT_DATA_GID", payload);
  },
  saveDatatableActiveTabId(context, id) {
    context.commit("SET_DATATABLE_ACTIVE_TAB_ID", id);
  },
  saveTableActiveService(context, payload) {
    let activeTabId = null;
    if (payload) {
      let isBunch = serviceHelper.isBunch(payload);
      if (isBunch) activeTabId = payload.layers[0].id;
      else activeTabId = payload.id;

      context.commit("SET_DATATABLE_ACTIVE_SERVICE", payload);
      context.commit("SET_DATATABLE_ACTIVE_TAB_ID", activeTabId);
    }
  },
  saveDatatableCheckedColumns(context, { id, value }) {
    context.commit("SET_DATATABLE_CHECKED_COLUMNS", { id, value });
  },
  saveDatatableCheckedColumnsData(context, { id, value }) {
    context.commit("SET_DATATABLE_CHECKED_COLUMNS_DATA", { id, value });
  },

  saveDatatableVisibility(context, isVisible) {
    context.commit("SET_DATATABLE_VISIBILITY", isVisible);
  },
  saveDatatableLoading(context, payload) {
    context.commit("SET_DATATABLE_LOADING", payload);
  },
  saveDataTablePaging(context, payload) {
    context.commit("SET_DATATABLE_PAGING", payload);
  },

  saveSumData(context, payload) {
    context.commit("SET_SUM_DATA", payload);
  },
  saveInfoData(context, payload) {
    context.commit("SET_INFO_DATA", payload);
  },

  resetDataTable(context) {
    context.commit("SET_DATATABLE", {});
    context.commit("SET_IS_EDIT_DATA", false);
    context.commit("SET_EDIT_DATA_GID", 0);
    context.commit("SET_DATATABLE_ACTIVE_TAB_ID", null);
    context.commit("SET_DATATABLE_ACTIVE_SERVICE", null);
    context.commit("SET_DATATABLE_VISIBILITY", false);
    context.commit("SET_DATATABLE_LOADING", false);
    context.commit("SET_DATATABLE_PAGING", {});
    context.commit("SET_SUM_DATA", null);
    context.commit("SET_INFO_DATA", null);
  },
};

const getters = {
  dataTableLoading: (state) => state.loading,
  isEditData: (state) => state.isEditData,
  dataTableVisibleStatus: (state) => state.isVisible,
  tableData: (state) => state.data,
  tablePaging: (state) => state.paging,
  sumData: (state) => state.sumData,
  infoData: (state) => state.infoData,
  editDataGid: (state) => state.editDataGid,
  tableActiveService: (state) => state.activeService,
  // activeTableData: (state) => {
  //   const item = state.data.find((x) => x.service.id === state.activeTabId);
  //   return item ? item.data : {};
  // },
  // activeTableService: (state) => {
  //   const item = state.data.find((x) => x.service.id === state.activeTabId);
  //   return item ? item.data : {};
  // },
};

export default { state, mutations, actions, getters };
