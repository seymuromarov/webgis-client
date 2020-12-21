import bunch from "@/api/bunch";
import layer from "@/api/layer";
import favoriteLayer from "@/api/favoriteLayer";
import defaultLayer from "@/api/defaultLayer";
import { layerHelper, bunchHelper } from "@/helpers";
const state = {
  dynamicLayerList: [],
  baseLayerList: [],
  bunchLayerList: [],
  favoriteBaseLayerIds: [],
  favoriteDynamicLayerIds: [],
  defaultBaseLayerIds: [],
  defaultDynamicLayerIds: [],
  focusedPolygonVector: null,
  layerColorOrderList: [],
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
  SET_LAYER_COLOR_ORDER_LIST(state, payload) {
    state.layerColorOrderList = payload;
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
  saveLayerColorOrderList(context, payload) {
    context.commit("SET_LAYER_COLOR_ORDER_LIST", payload);
  },

  async fetchBunchList({ commit }) {
    let bunchResponse = await bunch.getAll();
    let bunchMapResult = bunchHelper.mapBunchs(bunchResponse);
    commit("SET_BUNCH_LAYER_LIST", bunchMapResult);
  },
  async fetchLayerList({ commit }) {
    let layerResponse = await layer.getLayers();
    let layers = layerHelper.mapLayers(layerResponse);

    let baseLayerList = layers.baseLayers;
    let dynamicLayerList = layers.dynamicLayers;

    commit("SET_DYNAMIC_LAYER_LIST", dynamicLayerList);
    commit("SET_BASE_LAYER_LIST", baseLayerList);

    let layerColorOderList = dynamicLayerList.map((x) => {
      return 0;
    });
    commit("SET_LAYER_COLOR_ORDER_LIST", layerColorOderList);
  },
  async fetchFavoriteLayerList({ commit }) {
    let favoriteLayerResponse = await favoriteLayer.getAll();
    let favoriteDynamicLayerIds = [];
    let favoriteBaseLayerIds = [];
    if (favoriteLayerResponse && favoriteLayerResponse.length > 0) {
      favoriteDynamicLayerIds = favoriteLayerResponse
        .filter((c) => c.layer.mapTypeId == "dynamic")
        .map((c) => c.layer.id);
      favoriteBaseLayerIds = favoriteLayerResponse
        .filter((c) => c.layer.mapTypeId == "basemap")
        .map((c) => c.layer.id);
    }

    commit("SET_FAVORITE_DYNAMIC_LAYER_IDS", favoriteDynamicLayerIds);
    commit("SET_FAVORITE_BASE_LAYER_IDS", favoriteBaseLayerIds);
  },
  async fetchDefaultLayerList({ commit }) {
    let defaultLayerResponse = await defaultLayer.getAll();
    let defaultDynamicLayerIds = [];
    let defaultBaseLayerIds = [];

    if (defaultLayerResponse && defaultLayerResponse.length > 0) {
      defaultDynamicLayerIds = defaultLayerResponse
        .filter((c) => c.layer.mapTypeId == "dynamic")
        .map((c) => c.layer.id);

      defaultBaseLayerIds = defaultLayerResponse
        .filter((c) => c.layer.mapTypeId == "basemap")
        .map((c) => c.layer.id);
    }

    commit("SET_DEFAULT_DYNAMIC_LAYER_IDS", defaultDynamicLayerIds);

    commit("SET_DEFAULT_BASE_LAYER_IDS", defaultBaseLayerIds);
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
  layerColorOrderList: (state) => {
    return state.layerColorOrderList;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
