import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import { bunchService, layerService } from "@/services";
import { layerHelper, bunchHelper } from "@/helpers";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    deleteToken(state, token) {
      state.token = null;
    }
  },
  actions: {
    async getLayers({ commit }) {
      let layerResponse = await layerService.getLayers();

      let layers = layerHelper.mapLayers(layerResponse.data);
      // let e = { target: { checked: true } };
      let baseLayerList = layers.baseLayers;
      let dynamicLayerList = layers.dynamicLayers;
      commit("SER_DYNAMIC_LAYER_LIST", dynamicLayerList);
      commit("SET_BASE_LAYER_LIST", baseLayerList);

      let bunchResponse = await bunchService.getAll();
      let bunchMapResult = bunchHelper.mapBunchs(bunchResponse.data);
      commit("SET_BUNCH_LAYER_LIST", bunchMapResult);
      // console.log("getLayers -> response", response);
    }
  },
  modules
});
