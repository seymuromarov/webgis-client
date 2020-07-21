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
  showDataAddEditModal() {
    let moodal = getters.getMoodal();
    moodal.dataAddEditModal.show();
  },
  hideDataAddEditModal() {
    let moodal = getters.getMoodal();
    moodal.dataAddEditModal.hide();
  },
  showGeometryModal() {
    let moodal = getters.getMoodal();
    moodal.geometryModal.show();
  },
  hideGeometryModal() {
    let moodal = getters.getMoodal();
    moodal.geometryModal.hide();
  },
  showColorPickerModal() {
    let moodal = getters.getMoodal();
    moodal.colorPickerModal.show();
  },
  hideImageUploadModal() {
    let moodal = getters.getMoodal();
    moodal.imageUploadModal.hide();
  },
  showImageUploadModal() {
    let moodal = getters.getMoodal();
    moodal.imageUploadModal.show();
  },
  hideProfileModalModal() {
    let moodal = getters.getMoodal();
    moodal.profileModal.hide();
  },
  showProfileModalModal() {
    let moodal = getters.getMoodal();
    moodal.profileModal.show();
  },
  hideFavoriteQueryModal() {
    let moodal = getters.getMoodal();
    moodal.favoriteQueryModal.hide();
  },
  showFavoriteQueryModal() {
    let moodal = getters.getMoodal();
    moodal.favoriteQueryModal.show();
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
