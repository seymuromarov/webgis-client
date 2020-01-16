import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {
        getToken(state, response) {
            // state.token = response.token
            // state.auth = response
        },
        deleteToken(state, token) {
            state.token = null;
        }
    },
    actions: {},
    modules
});
