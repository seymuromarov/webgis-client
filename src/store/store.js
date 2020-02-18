import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    deleteToken(state, token) {
      state.token = null;
    }
  },
  actions: {},
  modules
});
