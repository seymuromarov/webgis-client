const state = {
  activeMenuTab: "",
  isInformationModalVisible: false,
};

const mutations = {
  SET_ACTIVE_MENU_TAB(state, payload) {
    state.activeMenuTab = payload;
  },
  SET_INFORMATION_MODAL_VISIBILITY(state, payload) {
    state.isInformationModalVisible = payload;
  },
};

const actions = {
  saveInformationModalVisibility(context, payload) {
    context.commit("SET_INFORMATION_MODAL_VISIBILITY", payload);
  },
  saveActiveMenuTab(context, payload) {
    context.commit("SET_ACTIVE_MENU_TAB", payload);
  },
};

const getters = {
  activeMenuTab: (state) => state.activeMenuTab,
  isInformationModalVisible: (state) => state.isInformationModalVisible,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
