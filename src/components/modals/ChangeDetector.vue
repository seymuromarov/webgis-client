<template>
  <CustomModal
    name="detectorModal"
    title="Change detection"
    :width="800"
    :minHeight="400"
    @afterHide="$emit('close')"
  >
    <div class="row form-group">
      <div class="col-md-12">
        <div class="detector">
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
      </div>
    </div>

    <!-- <div class="detector-wrapper"> -->

    <!-- </div> -->
  </CustomModal>
</template>

<script>
import Multiselect from "vue-multiselect";
import { URL } from "@/config/urls";
import { layerController } from "@/controllers";
import { fromLonLat, Polygon } from "@/wrappers/openLayerImports";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Multiselect,
    Treeselect,
  },
  props: {
    bbox: {
      required: true,
      type: Array,
    },
    token: {
      // required: true,
      type: String,
    },
    visible: {
      type: Boolean,
    },
  },
  watch: {
    selectedLayers: async function(arr) {
      this.exportedImages = [];

      var extent = new Polygon([this.bbox]).getExtent();
      for (let item of arr) {
        let url =
          URL +
          "/api/service/arcgis/" +
          item.label +
          `/?token=${this.token}&` +
          `f=image&` +
          `format=png8&` +
          `transparent=true&` +
          `size=1024,1024&` +
          `bbox=${extent.toString()}&` +
          `bboxsr=4326&` +
          `imagesr=4326&` +
          `dpi=90`;

        this.exportedImages.push({
          image: url,
          label: item.label,
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
    },
  },

  data() {
    return {
      selectedLayers: [],
      exportedImages: [],
    };
  },
  computed: {
    baseOptions() {
      let options = layerController.getBasemapLayerAsTreeSelect();
      return options;
    },
    // selectedLayers() {

    // }
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
