const state = {
  isVisible: false
};

const mutations = {
  SET_DATATABLE_VISIBLE(state, isVisible) {
    state.isVisible = isVisible;
    console.log("setted");
  }
};

const actions = {
  SAVE_DATATABLE_VISIBLE(context, payload) {
    context.commit("SET_DATATABLE_VISIBLE", payload);
  }
};

export default {
  state,
  mutations,
  actions
};
