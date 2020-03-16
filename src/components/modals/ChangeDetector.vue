<template>
  <CustomModal
    name="detectorModal"
    title="Change detection"
    :width="800"
    :minHeight="400"
    @afterHide="$emit('close')"
  >
    <!-- <div class="detector-wrapper"> -->
    <div class="detector">
      <!-- <p class="detector-title"></p> -->
      <!-- <button @click="$emit('close')">&#x2715;</button> -->

      <treeselect
        v-model="selectedLayers"
        :multiple="true"
        :show-count="true"
        :options="baseOptions"
        :limit="4"
        valueFormat="object"
        :disable-branch-nodes="true"
        search-nested
      />
      <div class="detector-list row">
        <div
          :key="index"
          v-for="(exported, index) in exportedImages"
          class="detector-list-item col-md-4"
        >
          <p>{{ exported.label }}</p>
          <div class="image-wrapper">
            <img :src="exported.image" />
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </CustomModal>
</template>

<script>
import Multiselect from "vue-multiselect";
import LayerService from "@/services/LayerService";
import { URL } from "@/config/urls";
import { Modal as CustomModal } from "../";
import { layerController } from "@/controllers";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Multiselect,
    CustomModal,
    Treeselect
  },
  props: {
    lastBBOXOfShape: {
      required: true,
      type: Array
    },
    token: {
      // required: true,
      type: String
    },
    visible: {
      type: Boolean
    }
  },
  watch: {
    selectedLayers: async function(arr) {
      this.exportedImages = [];

      for (let item of arr) {
        let url =
          URL +
          "/api/map/service/" +
          item.label +
          "/MapServer/export" +
          "?" +
          `token=${this.token}&` +
          `f=image&` +
          `format=png8&` +
          `transparent=true&` +
          `size=1024,1024&` +
          `bbox=${this.lastBBOXOfShape.toString()}&` +
          `bboxsr=3857&` +
          `imagesr=3857&` +
          `dpi=90`;

        this.exportedImages.push({
          image: url,
          label: item.label
        });
      }
    },
    visible(value) {
      if (value) {
        this.selectedLayers = layerController.getSelectedBasemaps();

        this.$moodal.detectorModal.show();
      } else {
        this.$moodal.detectorModal.hide();
      }
    }
  },

  data() {
    return {
      selectedLayers: [],
      exportedImages: []
    };
  },
  computed: {
    baseOptions() {
      let options = layerController.getBasemapLayerAsTreeSelect();
      return options;
    }
    // selectedLayers() {

    // }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
