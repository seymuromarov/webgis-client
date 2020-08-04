const state = {
  dynamicLayerList: [],
  baseLayerList: [],
  bunchLayerList: [],
  favoriteBaseLayerIds: [],
  favoriteDynamicLayerIds: [],
  defaultBaseLayerIds: [],
  defaultDynamicLayerIds: [],
  focusedPolygonVector: null,
};

const mutations = {
  SET_FOCUSED_POLYGON_VECTOR(state, payload) {
    state.focusedPolygonVector = payload;
  },
  SET_DYNAMIC_LAYER_LIST(state, payload) {
    state.dynamicLayerList = payload;
  },

  SET_BASE_LAYER_LIST(state, payload) {
    state.baseLayerList = payload;
  },
  SET_BUNCH_LAYER_LIST(state, payload) {
    state.bunchLayerList = payload;
  },

  SET_FAVORITE_BASE_LAYER_IDS(state, payload) {
    state.favoriteBaseLayerIds = payload;
  },
  SET_FAVORITE_DYNAMIC_LAYER_IDS(state, payload) {
    state.favoriteDynamicLayerIds = payload;
  },
  SET_DEFAULT_DYNAMIC_LAYER_IDS(state, payload) {
    state.defaultDynamicLayerIds = payload;
  },
  SET_DEFAULT_BASE_LAYER_IDS(state, payload) {
    state.defaultBaseLayerIds = payload;
  },
};

const actions = {
  saveFocusePolygonVector(context, payload) {
    context.commit("SET_FOCUSED_POLYGON_VECTOR", payload);
  },
  saveDynamicLayerList(context, payload) {
    context.commit("SET_DYNAMIC_LAYER_LIST", payload);
  },

  saveBaseLayerList(context, payload) {
    context.commit("SET_BASE_LAYER_LIST", payload);
  },
  saveBunchLayerList(context, payload) {
    context.commit("SET_BUNCH_LAYER_LIST", payload);
  },

  saveFavoriteDyanmicLayerIds(context, payload) {
    context.commit("SET_FAVORITE_DYNAMIC_LAYER_IDS", payload);
  },
  saveFavoriteBaseLayerIds(context, payload) {
    context.commit("SET_FAVORITE_BASE_LAYER_IDS", payload);
  },
  saveDefaultDynamicLayerIds(context, payload) {
    context.commit("SET_DEFAULT_DYNAMIC_LAYER_IDS", payload);
  },
  saveDefaultBaseLayerIds(context, payload) {
    context.commit("SET_DEFAULT_BASE_LAYER_IDS", payload);
  },
};

const getters = {
  dynamicLayerList: (state) => {
    return state.dynamicLayerList;
  },
  baseLayerList: (state) => {
    return state.baseLayerList;
  },
  bunchLayerList: (state) => {
    return state.bunchLayerList;
  },

  favoriteBaseLayerIds: (state) => {
    return state.favoriteBaseLayerIds;
  },
  favoriteDynamicLayerIds: (state) => {
    return state.favoriteDynamicLayerIds;
  },
  defaultDynamicLayerIds: (state) => {
    return state.defaultDynamicLayerIds;
  },
  defaultBaseLayerIds: (state) => {
    return state.defaultBaseLayerIds;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
