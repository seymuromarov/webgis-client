const state = {
  moodal: null,
};

const mutations = {
  SET_MOODAL(state, payload) {
    state.moodal = payload;
  },
};
const actions = {
  saveMoodal(context, payload) {
    context.commit("SET_MOODAL", payload);
  },
};
const getters = {
  moodal: (state) => state.moodal,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
