import $store from "@/store/store.js";
const functions = {};

const getters = {
  getNdviExtent() {
    return $store.getters.ndviExtent;
  },
};
const setters = {
  setNdviExtent(val) {
    $store.dispatch("saveNdviExtent", val);
  },
};
export default { ...functions, ...getters, ...setters };
