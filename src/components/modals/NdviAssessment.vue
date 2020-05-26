<template>
  <CustomModal
    name="ndviAssessmentModal"
    title="NDVI Assessment"
    :width="800"
    :minHeight="400"
    @afterHide="$emit('close')"
  >
    <div class="row ">
      <div class="col-md-12 form-group">
        <label for="layers">Layers</label>
        <Multiselect
          id="ndvis"
          v-model="selectedNdvis"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          :custom-label="ndviCustomLabel"
          label="ndvi"
          track-by="ndvi"
          placeholder="Select Ndvis"
        />
      </div>
    </div>
  </CustomModal>
</template>

<script>
import { Modal as CustomModal } from "@/components";
import { ndviService } from "@/services";
import { layerHelper } from "@/helpers";
import Multiselect from "vue-multiselect";
export default {
  components: {
    CustomModal,
    Multiselect,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  data() {
    return {
      options: [],
      selectedNdvis: [],
    };
  },
  mounted() {
    this.getNdvis();
  },
  methods: {
    async getNdvis() {
      let { data } = await ndviService.getNdvis();
      data = data.map((item) => {
        item.basemaps = item.basemaps.map((x) => layerHelper.basemapMapping(x));
        item.ndvi = layerHelper.basemapMapping(item.ndvi);
        return item;
      });

      this.options = data;
      console.log("getNdvis -> this.options", this.options);
    },
    onChange(value) {
      console.log(this.selectedNdvis);
    },
    ndviCustomLabel(item) {
      return item.ndvi.name;
    },
  },

  computed: {},
};
</script>
