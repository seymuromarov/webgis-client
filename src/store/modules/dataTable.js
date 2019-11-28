const state = {
  isVisible: false,
  tableName: "",
  serviceName: "",
  layer: "",
  tableHeaders: [],
  tableHeadersWithAlias: [],
  tableData: [],
  target: undefined,
  checkedColumnsData: [],
  checkedColumns: [],
  lastBBOXOfShape: []
};

const mutations = {
  SET_DATATABLE_VISIBLE(state, isVisible) {
    state.isVisible = isVisible;
  },
  SET_DATATABLE_SERVICE_NAME(state, serviceName) {
    state.serviceName = serviceName;
  },
  SET_DATATABLE_LAYER_ID(state, layerId) {
    state.layerId = layerId;
  },
  SET_DATATABLE_NAME(state, tableName) {
    state.tableName = tableName;
  },
  SET_DATATABLE_HEADERS(state, tableHeaders) {
    state.tableHeaders = tableHeaders;
  },
  SET_DATATABLE_STACKED_HEADERS(state, tableStackedHeaders) {
    state.tableStackedHeaders = tableStackedHeaders;
  },
  SET_DATATABLE_HEADERS_WITH_ALIAS(state, tableHeadersWithAlias) {
    state.tableHeadersWithAlias = tableHeadersWithAlias;
  },
  SET_DATATABLE_DATA(state, tableData) {
    state.tableData = tableData;
  },
  SET_DATATABLE_TARGET(state, target) {
    state.target = target;
  },
  SET_DATATABLE_CHECKED_COLUMNS_DATA(state, checkedColumnsData) {
    state.checkedColumnsData = checkedColumnsData;
  },
  SET_DATATABLE_CHECKED_COLUMNS(state, checkedColumns) {
    state.checkedColumns = checkedColumns;
  },
  SET_DRAW_BBOX(state, drawBBOX) {
    state.lastBBOXOfShape = drawBBOX;
  }
};

const getters = {
  isVisible: state => state.isVisible
};
const actions = {
  SAVE_DATATABLE_VISIBLE(context, isVisible) {
    context.commit("SET_DATATABLE_VISIBLE", isVisible);
  },
  SAVE_DRAW_BBOX(context, drawBBOX) {
    context.commit("SET_DRAW_BBOX", drawBBOX);
  },
  SAVE_DATATABLE_CONFIGURATION(context, data) {
    console.log("TCL: SAVE_DATATABLE_CONFIGURATION -> data", data);
    const {
      isVisible,
      layerId,
      serviceName,
      tableName,
      tableHeaders,
      tableStackedHeaders,
      tableHeadersWithAlias,
      tableData,
      target,
      checkedColumnsData,
      checkedColumns
    } = data;

    context.commit("SET_DATATABLE_VISIBLE", isVisible);
    context.commit("SET_DATATABLE_LAYER_ID", layerId);
    context.commit("SET_DATATABLE_SERVICE_NAME", serviceName);
    context.commit("SET_DATATABLE_NAME", tableName);
    context.commit("SET_DATATABLE_HEADERS", tableHeaders);
    context.commit("SET_DATATABLE_STACKED_HEADERS", tableStackedHeaders);
    context.commit("SET_DATATABLE_HEADERS_WITH_ALIAS", tableHeadersWithAlias);
    context.commit("SET_DATATABLE_DATA", tableData);
    context.commit("SET_DATATABLE_TARGET", target);
    context.commit("SET_DATATABLE_CHECKED_COLUMNS_DATA", checkedColumnsData);
    context.commit("SET_DATATABLE_CHECKED_COLUMNS", checkedColumns);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};