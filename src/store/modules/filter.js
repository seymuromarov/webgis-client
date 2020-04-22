const state = {
  isSumFilter: false,
  sumFilterColumn: "",
};

const mutations = {
  SET_IS_SUM_FILTER(state, payload) {
    state.isSumFilter = payload;
  },
  SET_SUM_FILTER_COLUMN(state, filterQueryArithmeticColumn) {
    state.filterQueryArithmeticColumn = filterQueryArithmeticColumn;
  },
};

const actions = {
  saveIsSumFilter(context, filterQueryIsSum) {
    context.commit("SET_IS_SUM_FILTER", filterQueryIsSum);
  },
  saveSumFilterColumn(context, filterQueryArithmeticColumn) {
    context.commit("SET_SUM_FILTER_COLUMN", filterQueryArithmeticColumn);
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
};
