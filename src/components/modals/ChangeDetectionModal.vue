<template>
  <CustomModal
    name="changeDetectionModal"
    title="Change detection"
    :width="800"
    :minHeight="400"
    @beforeShow="onModalOpen"
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
  </CustomModal>
</template>

<script>
import { layerController, toolController } from "@/controllers";
import { urlHelper, mapHelper } from "@/helpers";
import { resourceTypeToEnum } from "@/utils/resourceTypeToEnum";
console.log(
  "🚀 ~ file: ChangeDetectionModal.vue ~ line 45 ~ resourceTypeToEnum",
  resourceTypeToEnum
);
import { resourceTypeEnum } from "@/enums";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      selectedLayers: [],
      exportedImages: [],
    };
  },
  watch: {
    selectedLayers: async function(arr) {
      this.exportedImages = [];

      var extent = mapHelper.bboxToExtent(this.bbox);
      for (let item of arr) {
        var service = layerController.getBaseLayer(item.id);
        var type = resourceTypeToEnum(service.resourceType);
        console.log(
          "🚀 ~ file: ChangeDetectionModal.vue ~ line 72 ~ selectedLayers:function ~ type",
          type
        );
        const url = urlHelper.getImageUrl(item.label, extent, type);

        this.exportedImages.push({
          image: url,
          label: item.label,
        });
      }
    },
  },

  methods: {
    onModalOpen() {
      this.reset();
    },
    reset() {
      this.selectedLayers = [];
      this.exportedImages = [];
    },
  },

  computed: {
    baseOptions() {
      let options = layerController.getBasemapLayerAsTreeSelect();
      return options;
    },
    // selectedLayers() {
    bbox() {
      return toolController.getBbox();
    },
    // }
  },
};
</script>
