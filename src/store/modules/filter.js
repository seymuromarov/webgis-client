const state = {
  isSumFilter: false,
  sumFilterColumn: "",
};

const mutations = {
  SET_IS_SUM_FILTER(state, payload) {
    state.isSumFilter = payload;
  },
  SET_SUM_FILTER_COLUMN(state, payload) {
    state.sumFilterColumn = payload;
  },
};

const actions = {
  saveIsSumFilter(context, payload) {
    context.commit("SET_IS_SUM_FILTER", payload);
  },
  saveSumFilterColumn(context, payload) {
    context.commit("SET_SUM_FILTER_COLUMN", payload);
  },
};
const getters = {
  isSumFilter: (state) => {
    return state.isSumFilter;
  },
  sumFilterColumn: (state) => {
    return state.sumFilterColumn;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
