const state = {
    isSumFilter: false,
    sumFilterColumn: "",
    isRequiredServiceRefresh: false,
};

const mutations = {
    SET_IS_SUM_FILTER(state, payload) {
        state.isSumFilter = payload;
    },
    SET_SUM_FILTER_COLUMN(state, payload) {
        state.sumFilterColumn = payload;
    },
    SET_IS_REQUIRED_SERVICE_REFRESH(state, payload) {
        state.isRequiredServiceRefresh = payload;
    },
};

const actions = {
    saveIsSumFilter(context, payload) {
        context.commit("SET_IS_SUM_FILTER", payload);
    },
    saveSumFilterColumn(context, payload) {
        context.commit("SET_SUM_FILTER_COLUMN", payload);
    },
    saveIsRequiredServiceRefreshStatus(context, payload) {
        context.commit("SET_IS_REQUIRED_SERVICE_REFRESH", payload);
    },
};
const getters = {
    isSumFilter: (state) => {
        return state.isSumFilter;
    },
    sumFilterColumn: (state) => {
        return state.sumFilterColumn;
    },
    isRequiredServiceRefresh: (state) => {
        return state.isRequiredServiceRefresh;
    },
};

export default {
    state,
    mutations,
    actions,
    getters,
};
