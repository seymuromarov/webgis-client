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
  hideFilterModal() {
    let moodal = getters.getMoodal();
    moodal.filterModal.hide();
  },

  showNdviAssessmentModal() {
    let moodal = getters.getMoodal();
    moodal.ndviAssessmentModal.show();
  },
  hideNdviAssessmentModal() {
    let moodal = getters.getMoodal();
    moodal.ndviAssessmentModal.hide();
  },
  showDataModal() {
    let moodal = getters.getMoodal();
    moodal.dataModal.show();
  },
  hideDataModal() {
    let moodal = getters.getMoodal();
    moodal.dataModal.hide();
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
