import i18n, { getLanguage } from "@/lang/index";
import api from "@/api/language";

const state = {
  language: getLanguage(),
  locales: [],
  messages: [],
};
const mutations = {
  SET_LANGUAGE(state, payload) {
    state.language = payload;
  },
  SET_LOCALES(state, payload) {
    state.locales = payload;
  },
  SET_MESSAGES(state, payload) {
    state.messages = payload;
  },
};
const actions = {
  saveLanguage(context, payload) {
    context.commit("SET_LANGUAGE", payload);
    localStorage.setItem("language", payload);
  },
  async fetchRemoteMessages(context) {
    const msg = await api.getLanguages();

    context.commit("SET_MESSAGES", msg);
    var keys = Object.keys(msg);
    context.commit("SET_LOCALES", keys);
    for (let i = 0; i < keys.length; i++) {
      const lng = keys[i];
      i18n.mergeLocaleMessage(lng, msg[lng]);
    }
  },
};
const getters = {
  language: (state) => state.language,
  locales: (state) => state.locales,
  messages: (state) => state.messages,
};
export default {
  state,
  mutations,
  actions,
  getters,
};
