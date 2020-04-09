const state = {
  mapLayer: null,
  graticuleLayer: null,
  n: null,
};

const mutations = {
  SET_MAP(state, payload) {
    state.mapLayer = payload;
  },
  SET_GRATICULE(state, payload) {
    state.graticuleLayer = payload;
  },
  SET_DRAW(state, payload) {
    state.draw = payload;
  },
};

const actions = {
  saveMap(context, payload) {
    context.commit("SET_MAP", payload);
  },
  saveGraticule(context, payload) {
    context.commit("SET_GRATICULE", payload);
  },
  saveDraw(context, payload) {
    context.commit("SET_DRAW", payload);
  },
};

const getters = {
  mapLayer: (state) => {
    return state.mapLayer;
  },
  graticuleLayer: (state) => {
    return state.graticuleLayer;
  },
  draw: (state) => {
    return state.draw;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
