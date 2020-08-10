import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import { layerHelper, bunchHelper } from "@/helpers";
import layer from "@/api/layer";
import notification from "@/api/notification";
import favoriteLayer from "@/api/favoriteLayer";
import defaultLayer from "@/api/defaultLayer";
import bunch from "@/api/bunch";
Vue.use(Vuex);

const getLayers = async ({ dispatch }) => {
  let layerResponse = await layer.getLayers();
  let favoriteLayerResponse = await favoriteLayer.getAll();
  let defaultLayerResponse = await defaultLayer.getAll();

  let favoriteDynamicLayerIds = [];
  let favoriteBaseLayerIds = [];
  let defaultDynamicLayerIds = [];
  let defaultBaseLayerIds = [];
  if (favoriteLayerResponse.data && favoriteLayerResponse.data != "") {
    favoriteDynamicLayerIds = favoriteLayerResponse.data
      .filter((c) => c.layer.mapTypeId == "dynamic")
      .map((c) => c.layer.id);
    favoriteBaseLayerIds = favoriteLayerResponse.data
      .filter((c) => c.layer.mapTypeId == "basemap")
      .map((c) => c.layer.id);
  }
  if (defaultLayerResponse.data && defaultLayerResponse.data != "") {
    defaultDynamicLayerIds = defaultLayerResponse.data
      .filter((c) => c.layer.mapTypeId == "dynamic")
      .map((c) => c.layer.id);
    defaultBaseLayerIds = defaultLayerResponse.data
      .filter((c) => c.layer.mapTypeId == "basemap")
      .map((c) => c.layer.id);
  }

  let layers = layerHelper.mapLayers(layerResponse.data);
  let baseLayerList = layers.baseLayers;
  let dynamicLayerList = layers.dynamicLayers;
  dispatch("saveDynamicLayerList", dynamicLayerList);
  dispatch("saveBaseLayerList", baseLayerList);
  dispatch("saveFavoriteDyanmicLayerIds", favoriteDynamicLayerIds);

  dispatch("saveFavoriteBaseLayerIds", favoriteBaseLayerIds);
  dispatch("saveDefaultDynamicLayerIds", defaultDynamicLayerIds);

  dispatch("saveDefaultBaseLayerIds", defaultBaseLayerIds);

  let layerColorOderList = dynamicLayerList.map((x) => {
    return 0;
  });
  dispatch("SAVE_LAYER_COLOR_ORDER_LIST", layerColorOderList);

  let bunchResponse = await bunch.getAll();
  let bunchMapResult = bunchHelper.mapBunchs(bunchResponse.data);
  dispatch("saveBunchLayerList", bunchMapResult);
};
const setNotificationCounts = async ({ dispatch }) => {
  var response = await notification.getUnradNotificationCount();
  dispatch("saveNotificationCount", response.data);
};
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    deleteToken(state) {
      state.token = null;
    },
  },
  actions: {
    async init({ dispatch }) {
      await getLayers({ dispatch });
      await setNotificationCounts({ dispatch });
    },
    setNotificationCounts,
    getLayers,
  },
  modules,
});
