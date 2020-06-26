import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import { layerHelper, bunchHelper } from "@/helpers";
import layer from "@/api/layer";
import bunch from "@/api/bunch";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    deleteToken(state) {
      state.token = null;
    },
  },
  actions: {
    async getLayers({ dispatch }) {
      let layerResponse = await layer.getLayers();

      let layers = layerHelper.mapLayers(layerResponse.data);
      let baseLayerList = layers.baseLayers;
      let dynamicLayerList = layers.dynamicLayers;
      dispatch("saveDynamicLayerList", dynamicLayerList);
      dispatch("saveBaseLayerList", baseLayerList);

      let layerColorOderList = dynamicLayerList.map((x) => {
        return 0;
      });
      dispatch("SAVE_LAYER_COLOR_ORDER_LIST", layerColorOderList);

      let bunchResponse = await bunch.getAll();
      let bunchMapResult = bunchHelper.mapBunchs(bunchResponse.data);
      dispatch("saveBunchLayerList", bunchMapResult);
    },
  },
  modules,
});
