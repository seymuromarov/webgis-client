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
    services: {},
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
    SET_DATATABLE_CHECKED_COLUMNS_DATA(state, { id, checkedColumnsData }) {
        state.services[id].checkedColumnsData = checkedColumnsData;
    },
    SET_DATATABLE_CHECKED_COLUMNS(state, { id, checkedColumns }) {
        state.services[id].checkedColumns = checkedColumns;
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
    SET_DATATABLE_SERVICE(state, { id, data }) {
        let service = { ...defaultService };

        service.totalCount = data.totalCount;
        service.serviceInfo = data.serviceInfo;
        service.tableName = data.tableName;
        service.tableHeaders = data.tableHeaders;
        service.tableStackedHeaders = data.tableStackedHeaders;
        service.tableHeadersWithAlias = data.tableHeadersWithAlias;
        service.tableData = data.tableData;
        service.target = data.target;
        service.checkedColumnsData = data.checkedColumnsData;
        service.checkedColumns = data.checkedColumns;

        state.services[id] = service;
    },
};

const getters = {
    isVisible: state => state.isVisible,
    dataTableLoading: state => state.loading,
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
    SAVE_DATATABLE_CHECKED_COLUMNS(context, { id, checkedColumns }) {
        context.commit("SET_DATATABLE_CHECKED_COLUMNS", { id, checkedColumns });
    },
    SAVE_DATATABLE_CHECKED_COLUMNS_DATA(context, checkedColumnsData) {
        context.commit(
            "SET_DATATABLE_CHECKED_COLUMNS_DATA",
            id,
            checkedColumnsData
        );
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
        console.log("dttbl", id, data);
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

    SAVE_DATATABLE_SERVICE(context, { id, data }) {
        console.log(data);
        context.commit("SET_DATATABLE_SERVICE", { id, data });
    },
};

export default { state, mutations, actions, getters };
