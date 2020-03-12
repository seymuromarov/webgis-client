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
        async getLayers({ dispatch }) {
            let layerResponse = await layerService.getLayers();

            let layers = layerHelper.mapLayers(layerResponse.data);
            let baseLayerList = layers.baseLayers;
            let dynamicLayerList = layers.dynamicLayers;
            dispatch("saveDynamicLayerList", dynamicLayerList);
            dispatch("saveBaseLayerList", baseLayerList);

            let bunchResponse = await bunchService.getAll();
            let bunchMapResult = bunchHelper.mapBunchs(bunchResponse.data);
            dispatch("saveBunchLayerList", bunchMapResult);
        }
    },
    modules
});
