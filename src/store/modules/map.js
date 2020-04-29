const state = {
  mapLayer: null,
  graticuleLayer: null,
  selectionLayer: null,
  selectedFeatureId: 0,
  draw: null,
  drawSource: null,
  sketch: null,
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
  },
  SET_SELECTION_LAYER(state, payload) {
    state.selectionLayer = payload;
  },
  SET_SELECTED_FEATURE_ID(state, payload) {
    state.selectedFeatureId = payload;
  },
  SET_SKETCH(state, payload) {
    state.sketch = payload;
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
  saveDrawSource(context, payload) {
    context.commit("SET_DRAW_SOURCE", payload);
  },
  saveSelectionLayer(context, payload) {
    context.commit("SET_SELECTION_LAYER", payload);
  },
  saveSelectedFeatureId(context, payload) {
    context.commit("SET_SELECTED_FEATURE_ID", payload);
  },
  saveSketch(context, payload) {
    context.commit("SET_SKETCH", payload);
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
  drawSource: (state) => {
    return state.drawSource;
  },
  selectionLayer: (state) => {
    return state.selectionLayer;
  },
  selectedFeatureId: (state) => {
    return state.selectedFeatureId;
  },
  sketch: (state) => {
    return state.sketch;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
