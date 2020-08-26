import $store from "@/store/store.js";
import Vue from "vue";
const vm = new Vue();
const functions = {
  showSumResultModal() {
    vm.$moodal.sumResultModal.show();
  },
  showFilterModal() {
    vm.$moodal.filterModal.show();
  },
  hideFilterModal() {
    vm.$moodal.filterModal.hide();
  },

  showNdviAssessmentModal() {
    vm.$moodal.ndviAssessmentModal.show();
  },
  hideNdviAssessmentModal() {
    vm.$moodal.ndviAssessmentModal.hide();
  },
  showDataAddEditModal() {
    vm.$moodal.dataAddEditModal.show();
  },
  hideDataAddEditModal() {
    vm.$moodal.dataAddEditModal.hide();
  },
  showGeometryModal() {
    vm.$moodal.geometryModal.show();
  },
  hideGeometryModal() {
    vm.$moodal.geometryModal.hide();
  },
  showColorPickerModal() {
    vm.$moodal.colorPickerModal.show();
  },
  hideImageUploadModal() {
    vm.$moodal.imageUploadModal.hide();
  },
  showImageUploadModal() {
    vm.$moodal.imageUploadModal.show();
  },
  hideProfileModalModal() {
    vm.$moodal.profileModal.hide();
  },
  showProfileModalModal() {
    vm.$moodal.profileModal.show();
  },
  hideFavoriteQueryModal() {
    vm.$moodal.favoriteQueryModal.hide();
  },
  showFavoriteQueryModal() {
    vm.$moodal.favoriteQueryModal.show();
  },
  hideServiceSelectionModal() {
    vm.$moodal.serviceSelectionModal.hide();
  },
  showServiceSelectionModal() {
    vm.$moodal.serviceSelectionModal.show();
  },
  hideDataModal() {
    vm.$moodal.dataModal.hide();
  },
  showDataModal() {
    vm.$moodal.dataModal.show();
  },
  hideBlindSpotModal() {
    vm.$moodal.blindSpotModal.hide();
  },
  showBlindSpotModal() {
    vm.$moodal.blindSpotModal.show();
  },

  hideComparerModal() {
    vm.$moodal.comparerModal.hide();
  },
  showComparerModal() {
    vm.$moodal.comparerModal.show();
  },
  hidePrintModal() {
    vm.$moodal.printModal.hide();
  },
  showPrintModal() {
    vm.$moodal.printModal.show();
  },
};

const getters = {
  getMoodal() {
    return $store.getters.vm.$moodal;
  },
};
const setters = {
  setSumResultVisibility(val) {
    $store.dispatch("saveSumResultModalVisibility", val);
  },
};
export default { ...functions, ...getters, ...setters };
