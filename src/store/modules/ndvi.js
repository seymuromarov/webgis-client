const state = {
  ndviExtent: null,
};

const mutations = {
  SET_NDVI_EXTENT(state, payload) {
    state.ndviExtent = payload;
  },
};
const actions = {
  saveNdviExtent(context, payload) {
    context.commit("SET_NDVI_EXTENT", payload);
  },
};
const getters = {
  ndviExtent: (state) => state.ndviExtent,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
