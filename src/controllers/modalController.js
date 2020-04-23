import $store from "@/store/store.js";
const functions = {
  showSumResultModal() {
    setters.setSumResultVisibility(true);
  },
  hideSumResultModal() {
    setters.setSumResultVisibility(false);
  },
};

const getters = {
  getSumResultVisibility() {
    return $store.getters.sumResultModalVisibility;
  },
};
const setters = {
  setSumResultVisibility(val) {
    $store.dispatch("saveSumResultModalVisibility", val);
  },
};
export default { ...functions, ...getters, ...setters };
