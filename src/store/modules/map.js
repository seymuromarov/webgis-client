const state = {
  mapLayer: null,
  graticuleLayer: null,
  draw: null,
  drawSource: null
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
  SET_DRAW_SOURCE(state, payload) {
    state.drawSource = payload;
  }
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
  saveDrawSource(context, payload) {
    context.commit("SET_DRAW_SOURCE", payload);
  }
};

const getters = {
  mapLayer: state => {
    return state.mapLayer;
  },
  graticuleLayer: state => {
    return state.graticuleLayer;
  },
  draw: state => {
    return state.draw;
  },
  drawSource: state => {
    return state.drawSource;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
