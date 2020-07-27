const state = {
  activeMenuTab: "",
  isInformationModalVisible: false,
  notificationCount: 0,
};

const mutations = {
  SET_ACTIVE_MENU_TAB(state, payload) {
    state.activeMenuTab = payload;
  },
  SET_INFORMATION_MODAL_VISIBILITY(state, payload) {
    state.isInformationModalVisible = payload;
  },
  SET_NOTIFICATION_COUNT(state, payload) {
    state.notificationCount = payload;
  },
};

const actions = {
  saveInformationModalVisibility(context, payload) {
    context.commit("SET_INFORMATION_MODAL_VISIBILITY", payload);
  },
  saveActiveMenuTab(context, payload) {
    context.commit("SET_ACTIVE_MENU_TAB", payload);
  },
  saveNotificationCount(context, payload) {
    context.commit("SET_NOTIFICATION_COUNT", payload);
  },
};

const getters = {
  activeMenuTab: (state) => state.activeMenuTab,
  isInformationModalVisible: (state) => state.isInformationModalVisible,
  notificationCount: (state) => state.notificationCount,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
