const state = {
  fill: {
    hex8: "#FFFFFF00",
  },
  border: {
    hex8: "#F44336FF",
  },

  // fillColor: {
  //     hex: "var(--transparent)",
  //     rgba: {
  //         r: 255,
  //         g: 255,
  //         b: 255,
  //         a: 0,
  //     },
  // },
  // borderColor: {
  //     hex: "#000000",
  //     rgba: {
  //         r: 255,
  //         g: 255,
  //         b: 255,
  //         a: 1,
  //     },
  // },
  shapeFillColor: {
    hex8: "var(--transparent)",
    rgba: {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    },
  },
  shapeBorderColor: {
    hex8: "#000000",
    rgba: {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    },
  },
  colorPicker: {
    visibility: false,
    layer: null,
    borderTab: true,
  },
  activeColorPickerId: null,
  layerColorOrderList: [],
};
const getters = {
  colorPicker: (state) => {
    return state.colorPicker;
  },
  activeColorPickerId: (state) => {
    return state.activeColorPickerId;
  },
  layerColorOrderList: (state) => {
    return state.layerColorOrderList;
  },
};
const mutations = {
  SET_COLORPICKER(state, payload) {
    state.colorPicker = payload;
  },
  SET_COLORPICKER_BORDER_TAB(state, payload) {
    state.colorPicker.borderTab = payload;
  },
  SET_COLORPICKER_LAYER(state, payload) {
    state.colorPicker.layer = payload;
  },
  SET_COLORPICKER_VISIBILITY(state, payload) {
    state.colorPicker.visibility = payload;
  },
  SET_COLORPICKER_FILLCOLOR(state, payload) {
    state.fillColor = payload;
  },

  SET_COLORPICKER_BORDERCOLOR(state, payload) {
    state.borderColor = payload;
  },
  SET_COLORPICKER_SHAPEBORDERCOLOR(state, payload) {
    state.shapeBorderColor = payload;
  },
  SET_COLORPICKER_SHAPEFILLCOLOR(state, payload) {
    state.shapeFillColor = payload;
  },
  SET_COLORPICKER_DYNAMICCOLORS(state, payload) {
    state.activeDynamicLayersColorsGetter = payload;
  },
  SET_ACTIVE_COLOR_PICKER_ID(state, payload) {
    state.activeColorPickerId = payload;
  },
  SET_LAYER_COLOR_ORDER_LIST(state, payload) {
    state.layerColorOrderList = payload;
  },
};
const actions = {
  SAVE_COLORPICKER(context, payload) {
    context.commit("SET_COLORPICKER", payload);
  },
  SAVE_COLORPICKER_BORDER_TAB(context, payload) {
    context.commit("SET_COLORPICKER_BORDER_TAB", payload);
  },
  SAVE_COLORPICKER_VISIBILITY(context, payload) {
    context.commit("SET_COLORPICKER_VISIBILITY", payload);
  },
  SAVE_COLORPICKER_LAYER(context, payload) {
    context.commit("SET_COLORPICKER_LAYER", payload);
  },
  SAVE_COLORPICKER_FILLCOLOR(context, payload) {
    context.commit("SET_COLORPICKER_FILLCOLOR", payload);
  },
  SAVE_COLORPICKER_BORDERCOLOR(context, payload) {
    context.commit("SET_COLORPICKER_BORDERCOLOR", payload);
  },
  SAVE_COLORPICKER_SHAPEFILLCOLOR(context, payload) {
    context.commit("SET_COLORPICKER_SHAPEFILLCOLOR", payload);
  },
  SAVE_COLORPICKER_SHAPEBORDERCOLOR(context, payload) {
    context.commit("SET_COLORPICKER_SHAPEBORDERCOLOR", payload);
  },
  SAVE_ACTIVE_COLOR_PICKER_ID(context, payload) {
    context.commit("SET_ACTIVE_COLOR_PICKER_ID", payload);
  },
  SAVE_LAYER_COLOR_ORDER_LIST(context, payload) {
    context.commit("SET_LAYER_COLOR_ORDER_LIST", payload);
  },
};
export default { state, mutations, actions, getters };
