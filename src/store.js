import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import axios from 'axios'
import {colorPickerConst} from './constants/';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ...colorPickerConst.state
    },
    getters : {
        ...colorPickerConst.getters
    },
    mutations: {
        getToken(state, response) {
            // state.token = response.token
            // state.auth = response

        },
        deleteToken(state, token) {
            state.token = null
        },
  
       ...colorPickerConst.mutations
    },
    actions: {

     
      ...colorPickerConst.actions

    },
    modules: {
        auth
    }

})
