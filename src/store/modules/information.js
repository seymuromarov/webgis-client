const state = {
  faq: {
    data: [],
  },
  releaseNotes: {
    data: [],
  },
};

const mutations = {
  SET_FAQ_DATA(state, payload) {
    state.faq.data = payload;
  },
  SET_RELEASE_NOTES_DATA(state, payload) {
    state.releaseNotes.data = payload;
  },
};

export default {
  state,
  mutations,
};
