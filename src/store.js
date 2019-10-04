import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // token: null,
        // auth: null
    },
    mutations: {
        getToken(state, response) {
            // state.token = response.token
            // state.auth = response

        },
        deleteToken(state, token) {
            state.token = null
        }

    },
    actions: {},
    modules: {
        auth
    }

})
