const state = {
    data: [],
    tabs: [],
    activeTabId: null,
    activeService: null,
    isVisible: false,
    loading: false,
};

const mutations = {
    SET_DATATABLE(state, payload) {
        state.data = payload;
    },
    SET_DATATABLE_TABS(state, payload) {
        state.tabs = payload;
    },
    SET_DATATABLE_ACTIVE_TAB_ID(state, id) {
        state.activeTabId = id;
    },
    SET_DATATABLE_ACTIVE_SERVICE(state, payload) {
        state.activeService = payload;
    },
    SET_DATATABLE_CHECKED_COLUMNS(state, { id, value }) {
        state.data.find(
            x => x.service.id === id
        ).data.checkedColumnsData = value;
    },
    SET_DATATABLE_CHECKED_COLUMNS_DATA(state, { id, value }) {
        state.data.find(x => x.service.id === id).data.checkedColumns = value;
    },
    SET_DATATABLE_VISIBLE(state, isVisible) {
        state.isVisible = isVisible;
    },
    SET_DATATABLE_LOADING(state, loading) {
        state.loading = loading;
    },
    SET_DATATABLE_PAGING(state, paging) {
        state.paging = paging;
    },
    SET_DRAW_BBOX(state, drawBBOX) {
        state.lastBBOXOfShape = drawBBOX;
    },
};

const getters = {
    dataTableLoading: state => state.loading,
    tableData: state => state.data,
    tableActiveService: state => state.activeService,
};

const actions = {
    SAVE_DATATABLE(context, payload) {
        context.commit("SET_DATATABLE", payload);
    },
    SAVE_DATATABLE_TABS(context, payload) {
        context.commit("SET_DATATABLE_TABS", payload);
        context.commit(
            "SET_DATATABLE_ACTIVE_TAB_ID",
            payload.length ? payload[0].id : null
        );
    },
    SAVE_DATATABLE_ACTIVE_TAB_ID(context, id) {
        context.commit("SET_DATATABLE_ACTIVE_TAB_ID", id);
    },
    SAVE_DATATABLE_ACTIVE_SERVICE(context, payload) {
        context.commit("SET_DATATABLE_ACTIVE_SERVICE", payload);
    },
    SAVE_DATATABLE_CHECKED_COLUMNS(context, { id, value }) {
        context.commit("SET_DATATABLE_CHECKED_COLUMNS", { id, value });
    },
    SAVE_DATATABLE_CHECKED_COLUMNS_DATA(context, { id, value }) {
        context.commit("SET_DATATABLE_CHECKED_COLUMNS_DATA", { id, value });
    },
    SAVE_DATATABLE_VISIBLE(context, isVisible) {
        context.commit("SET_DATATABLE_VISIBLE", isVisible);
    },
    SAVE_DATATABLE_LOADING(context, loading) {
        context.commit("SET_DATATABLE_LOADING", loading);
    },
    SAVE_DATATABLE_PAGING(context, paging) {
        context.commit("SET_DATATABLE_PAGING", paging);
    },
    SAVE_DRAW_BBOX(context, drawBBOX) {
        context.commit("SET_DRAW_BBOX", drawBBOX);
    },
    RESET_DATATABLE(context) {
        context.dispatch("SAVE_DATATABLE", []);
        context.dispatch("SAVE_DATATABLE_TABS", []);
    },
};

export default { state, mutations, actions, getters };
