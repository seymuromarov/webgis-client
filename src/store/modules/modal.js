const state = {
  sumResultModalVisibility: false,
  filterModalVisibility: false,
  colorPickerModalVisibility: false,
  detectorModalVisibility: false,
};

const mutations = {
  SET_SUM_RESULT_MODAL_VISIBILITY(state, payload) {
    state.sumResultModalVisibility = payload;
  },
  SET_FILTER_MODAL_VISIBILITY(state, payload) {
    state.filterModalVisibility = payload;
  },
  SET_COLOR_PICKER_MODAL_VISIBILITY(state, payload) {
    state.colorPickerModalVisibility = payload;
  },
  SET_DETECTOR_MODAL_VSIBILITY(state, payload) {
    state.detectorModalVisibility = payload;
  },
};

const actions = {
  saveSumResultModalVisibility(context, payload) {
    context.commit("SET_SUM_RESULT_MODAL_VISIBILITY", payload);
  },
  saveFilterModalVisibility(context, payload) {
    context.commit("SET_FILTER_MODAL_VISIBILITY", payload);
  },
  saveColorPickerModalVisibility(context, payload) {
    context.commit("SET_COLOR_PICKER_MODAL_VISIBILITY", payload);
  },
  saveDetectorModalVisibility(context, payload) {
    context.commit("SET_DETECTOR_MODAL_VSIBILITY", payload);
  },
};
const getters = {
  sumResultModalVisibility: (state) => state.sumResultModalVisibility,
  filterModalVisibility: (state) => state.filterModalVisibility,
  colorPickerModalVisibility: (state) => state.colorPickerModalVisibility,
  detectorModalVisibility: (state) => state.detectorModalVisibility,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
