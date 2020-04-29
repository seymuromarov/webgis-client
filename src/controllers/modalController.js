import $store from "@/store/store.js";
const functions = {
  showSumResultModal() {
    let moodal = getters.getMoodal();
    moodal.sumResultModal.show();
  },
  showFilterModal() {
    let moodal = getters.getMoodal();
    moodal.filterModal.show();
  },
  showColorPickerModal() {
    let moodal = getters.getMoodal();
    moodal.colorPickerModal.show();
  },
};

const getters = {
  getMoodal() {
    return $store.getters.moodal;
  },
};
const setters = {
  setSumResultVisibility(val) {
    $store.dispatch("saveSumResultModalVisibility", val);
  },
};
export default { ...functions, ...getters, ...setters };
