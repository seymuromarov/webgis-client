import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth
    }

})
