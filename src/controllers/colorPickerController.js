import $store from "@/store/store.js";
const setters = {
  setShapeBorderColor(val) {
    $store.dispatch("SAVE_COLORPICKER_SHAPEBORDERCOLOR", val);
  },
  setShapeFillColor(val) {
    $store.dispatch("SAVE_COLORPICKER_SHAPEFILLCOLOR", val);
  },
};
const getters = {
  getShapeBorderColor() {
    return $store.getters.shapeBorderColor;
  },
  getShapeFillColor() {
    return $store.getters.shapeFillColor;
  },
};

export default {
  ...getters,
  ...setters,
};
