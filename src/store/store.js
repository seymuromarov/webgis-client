import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import notification from "@/api/notification";

Vue.use(Vuex);

const getLayers = async ({ dispatch }) => {
  dispatch("fetchLayerList");
  dispatch("fetchBunchList");
  dispatch("fetchFavoriteLayerList");
  dispatch("fetchDefaultLayerList");
};
const setNotificationCounts = async ({ dispatch }) => {
  var response = await notification.getUnradNotificationCount();
  dispatch("saveNotificationCount", response);
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
