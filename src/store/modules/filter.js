const state = {
  filterQueryIsSum:false,
  filterQueryArithmeticColumn:'',
}

const mutations = {
  SET_FILTER_QUERY_IS_SUM(state, filterQueryIsSum) {
    state.filterQueryIsSum = filterQueryIsSum;
  },
  SET_FILTER_QUERY_ARITHMETIC_COLUMN(state, filterQueryArithmeticColumn) {
    state.filterQueryArithmeticColumn = filterQueryArithmeticColumn;
  },
}

const actions = {
   SAVE_FILTER_QUERY_IS_SUM(context, filterQueryIsSum) {
    context.commit("SET_FILTER_QUERY_IS_SUM", filterQueryIsSum);
  },
  SAVE_FILTER_QUERY_ARITHMETIC_COLUMN(context, filterQueryArithmeticColumn) {
    context.commit("SET_FILTER_QUERY_ARITHMETIC_COLUMN", filterQueryArithmeticColumn);
  },

}

export default {
    state,
    mutations,
    actions
}