<template>
  <Modal
    name="computedLayerModal"
    title="Customized layers"
    :width="400"
    :height="300"
  >
    <form>
      <div class="row mt-3">
        <div class="col-md-12">
          <div class="form-group" ref="computedForm">
            <label for="label">Label</label>
            <input
              type="text"
              class="form-control"
              id="label"
              v-model="data.label"
            />
          </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label for="layers">Layers</label>
            <treeselect
              v-model="data.layers"
              :multiple="true"
              :show-count="true"
              :options="dynamicOptions"
              :limit="4"
              :disable-branch-nodes="true"
              search-nested
            />
          </div>
        </div>
        <div class="col-md-12">
          <button
            type="button"
            class="btn btn-primary float-right"
            @click="add"
          >
            Add
          </button>
        </div>
      </div>

      <!-- <div class="form-group">
              <label for="layers">Layers</label>
              <Multiselect
                id="layers"
                v-model="data.layers"
                :options="dynamicLayersList"
                :multiple="true"
                :close-on-select="false"
                :limit="4"
                :maxHeight="200"
                label="name"
                track-by="name"
                placeholder="Select layers"
              />
            </div> -->
    </form>
  </Modal>
</template>

<script>
import Modal from "../common/Modal";
import Multiselect from "vue-multiselect";
import { bunchService } from "@/services";
import { layerController, bunchController } from "@/controllers";
import { layerHelper } from "@/helpers";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: "ComputedLayersModal",
  components: {
    Modal,
    Multiselect,
    Treeselect,
  },
  updated() {
    var a = this.dynamicOptons;
  },
  data() {
    return {
      value: null,
      isLoading: false,
      data: {
        label: "",
        layers: [],
      },
    };
  },
  methods: {
    resetData() {
      this.data = {
        label: "",
        layers: [],
      };
    },
    add() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.$refs.computedForm,
        canCancel: false,
      });
      const { label, layers } = this.data;
      if (label != "" && layers.length > 0) {
        bunchService.add(this.data).then((response) => {
          bunchController.add(response.data);
          this.resetData();
          this.$moodal.computedLayerModal.hide();
          loader.hide();
        });
      }
    },
  },
  computed: {
    dynamicOptions() {
      let options = layerController.getDynamicLayerAsTreeSelect();
      return options;
    },
    dynamicLayersList() {
      let dynamicLayers = layerController.getDynamicLayersWithoutCategory(true);
      let options = dynamicLayers.map((item, index) => {
        return { id: item.id, name: item.name };
      });
      return options;
    },
  },
};
</script>

<style lang="scss">
// TODO Make this (.multiselect) styles global (without '!important')

.submit-btn {
  width: 20%;
  float: right;
}

#computedLayerModal .modal__body {
  overflow: unset;
}
</style>
