const state = {
  historyIndex: 0,
  isNeedUpdate: false,
  isNextExist: false,
  isPreviousExist: false,
  history: [],
};

const mutations = {
  SET_HISTORY_INDEX(state, payload) {
    state.historyIndex = payload;
  },
  SET_HISTORY_IS_NEED_UPDATE(state, payload) {
    state.isNeedUpdate = payload;
  },
  SET_HISTORY_IS_NEXT_EXIST(state, payload) {
    state.isNextExist = payload;
  },
  SET_HISTORY_IS_PREVIOUS_EXIST(state, payload) {
    state.isPreviousExist = payload;
  },
  SET_HISTORY(state, payload) {
    state.history = payload;
  },
};

const actions = {
  saveHistoryIndex(context, payload) {
    context.commit("SET_HISTORY_INDEX", payload);
  },
  saveHistoryIsNeedUpdate(context, payload) {
    context.commit("SET_HISTORY_IS_NEED_UPDATE", payload);
  },
  saveHistoryIsNextExist(context, payload) {
    context.commit("SET_HISTORY_IS_NEXT_EXIST", payload);
  },
  saveHistoryIsPreviousExist(context, payload) {
    context.commit("SET_HISTORY_IS_PREVIOUS_EXIST", payload);
  },
  saveHistory(context, payload) {
    context.commit("SET_HISTORY", payload);
  },
};
const getters = {
  historyIndex: (state) => {
    return state.historyIndex;
  },
  historyIsNeedUpdate: (state) => {
    return state.isNeedUpdate;
  },
  historyIsNextExist: (state) => {
    return state.isNextExist;
  },
  historyIsPreviousExist: (state) => {
    return state.isPreviousExist;
  },
  history: (state) => {
    return state.history;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
