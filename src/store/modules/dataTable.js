const defaultService = {
    serviceInfo: {},
    layerId: 0,
    isSimpleFilterVisible: false,
    tableName: "",
    serviceName: "",
    serviceResourceType: "",
    layer: "",
    tableHeaders: [],
    tableHeadersWithAlias: [],
    tableData: [],
    target: undefined,
    checkedColumnsData: [],
    checkedColumns: [],
    lastBBOXOfShape: [],
    totalCount: 0,
};

const state = {
    tabs: [],
    activeService: null,
    data: [],
    isVisible: false,
    loading: false,
    paging: {
        isBusy: false,
        page: 1,
        limit: 25,
    },
};

const mutations = {
    SET_DATATABLE_VISIBLE(state, isVisible) {
        state.isVisible = isVisible;
    },
    SET_DATATABLE_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_SIMPLE_FILTER_VISIBLE(state, isSimpleFilterVisible) {
        state.isSimpleFilterVisible = isSimpleFilterVisible;
    },
    SET_DATATABLE_SERVICE_NAME(state, serviceName) {
        state.serviceName = serviceName;
    },
    SET_DATATABLE_SERVICE_INFO(state, { id, serviceInfo }) {
        state.services[id].serviceInfo = serviceInfo;
    },
    SET_DATATABLE_LAYER_ID(state, layerId) {
        state.layerId = layerId;
    },
    SET_DATATABLE_NAME(state, { id, tableName }) {
        state.services[id].tableName = tableName;
    },
    SET_DATATABLE_HEADERS(state, { id, tableHeaders }) {
        state.services[id].tableHeaders = tableHeaders;
    },
    SET_DATATABLE_STACKED_HEADERS(state, { id, tableStackedHeaders }) {
        state.services[id].tableStackedHeaders = tableStackedHeaders;
    },
    SET_DATATABLE_HEADERS_WITH_ALIAS(state, { id, tableHeadersWithAlias }) {
        state.services[id].tableHeadersWithAlias = tableHeadersWithAlias;
    },
    SET_DATATABLE_DATA(state, { id, tableData }) {
        state.services[id].tableData = tableData;
    },
    SET_DATATABLE_TARGET(state, { id, target }) {
        state.services[id].target = target;
    },
    SET_DATATABLE_CHECKED_COLUMNS_DATA(state, { id, value }) {
        state.data.find(x => x.service.id === id).data.checkedColumns = value;
    },
    SET_DATATABLE_CHECKED_COLUMNS(state, { id, value }) {
        state.data.find(
            x => x.service.id === id
        ).data.checkedColumnsData = value;
    },
    SET_DRAW_BBOX(state, drawBBOX) {
        state.lastBBOXOfShape = drawBBOX;
    },
    SET_SERVICE_RESOURCE_TYPE(state, serviceResourceType) {
        state.serviceResourceType = serviceResourceType;
    },

    SET_DATATABLE_TOTAL_COUNT(state, { id, totalCount }) {
        state.services[id].totalCount = totalCount;
    },
    SET_DATATABLE_PAGING(state, paging) {
        state.paging = paging;
    },
    SET_DATATABLE(state, payload) {
        state.data = payload;
    },
    SET_DATATABLE_TABS(state, payload) {
        state.tabs = payload;
    },
    SET_DATATABLE_ACTIVE_SERVICE(state, payload) {
        state.activeService = payload;
    },
    SET_DATATABLE_QUERY(state, { id, query }) {
        state.data.find(x => x.service.id === id).service.query.where = query;
    },
};

const getters = {
    isVisible: state => state.isVisible,
    dataTableLoading: state => state.loading,
    tableData: state => state.data,
    tableActiveService: state => state.activeService,
};
const actions = {
    SAVE_DATATABLE_VISIBLE(context, isVisible) {
        context.commit("SET_DATATABLE_VISIBLE", isVisible);
    },
    SAVE_DATATABLE_LOADING(context, loading) {
        context.commit("SET_DATATABLE_LOADING", loading);
    },
    SAVE_SIMPLE_FILTER_VISIBLE(context, isSimpleFilterVisible) {
        context.commit("SET_SIMPLE_FILTER_VISIBLE", isSimpleFilterVisible);
    },
    SAVE_DATATABLE_CHECKED_COLUMNS(context, { id, value }) {
        context.commit("SET_DATATABLE_CHECKED_COLUMNS", { id, value });
    },
    SAVE_DATATABLE_CHECKED_COLUMNS_DATA(context, { id, value }) {
        context.commit("SET_DATATABLE_CHECKED_COLUMNS_DATA", { id, value });
    },
    SAVE_DATATABLE_SERVICE_NAME(context, serviceName) {
        context.commit("SET_DATATABLE_SERVICE_NAME", serviceName);
    },
    SAVE_DATATABLE_SERVICE_INFO(context, { id, serviceInfo }) {
        context.commit("SET_DATATABLE_SERVICE_INFO", { id, serviceInfo });
    },
    SAVE_DATATABLE_LAYER_ID(context, layerId) {
        context.commit("SET_DATATABLE_LAYER_ID", layerId);
    },
    SAVE_DATATABLE_DATA(context, tableData) {
        context.commit("SET_DATATABLE_DATA", { id, tableData });
    },
    SAVE_DRAW_BBOX(context, drawBBOX) {
        context.commit("SET_DRAW_BBOX", drawBBOX);
    },
    SAVE_SERVICE_RESOURCE_TYPE(context, serviceResourceType) {
        context.commit("SET_SERVICE_RESOURCE_TYPE", serviceResourceType);
    },
    SAVE_DATATABLE_TOTAL_COUNT(context, { id, totalCount }) {
        context.commit("SET_DATATABLE_TOTAL_COUNT", { id, totalCount });
    },
    SAVE_DATATABLE_PAGING(context, paging) {
        context.commit("SET_DATATABLE_PAGING", paging);
    },
    SAVE_DATATABLE_CONFIGURATION(context, { id, data }) {
        const {
            totalCount,
            serviceInfo,
            tableName,
            tableHeaders,
            tableStackedHeaders,
            tableHeadersWithAlias,
            tableData,
            target,
            checkedColumnsData,
            checkedColumns,
        } = data;

        context.commit("SET_DATATABLE_TOTAL_COUNT", { id, totalCount });
        context.commit("SET_DATATABLE_SERVICE_INFO", { id, serviceInfo });
        context.commit("SET_DATATABLE_NAME", { id, tableName });
        context.commit("SET_DATATABLE_HEADERS", { id, tableHeaders });
        context.commit("SET_DATATABLE_STACKED_HEADERS", {
            id,
            tableStackedHeaders,
        });
        context.commit("SET_DATATABLE_HEADERS_WITH_ALIAS", {
            id,
            tableHeadersWithAlias,
        });
        context.commit("SET_DATATABLE_DATA", { id, tableData });
        context.commit("SET_DATATABLE_TARGET", { id, target });
        context.commit("SET_DATATABLE_CHECKED_COLUMNS_DATA", {
            id,
            checkedColumnsData,
        });
        context.commit("SET_DATATABLE_CHECKED_COLUMNS", { id, checkedColumns });
    },

    SAVE_DATATABLE(context, payload) {
        context.commit("SET_DATATABLE", payload);
    },
    SAVE_DATATABLE_ACTIVE_SERVICE(context, payload) {
        context.commit("SET_DATATABLE_ACTIVE_SERVICE", payload);
    },

    SAVE_DATATABLE_TABS(context, payload) {
        context.commit("SET_DATATABLE_TABS", payload);
    },
    SAVE_DATATABLE_QUERY(context, { id, query }) {
        context.commit("SET_DATATABLE_QUERY", { id, query });
    },

    RESET_DATATABLE(context) {
        context.commit("SET_DATATABLE", []);
    },
};

export default { state, mutations, actions, getters };
