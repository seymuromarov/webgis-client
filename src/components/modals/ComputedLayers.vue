<template>
  <Modal
    name="computedLayerModal"
    title="Computed layers"
    :width="400"
    :height="400"
  >
    <form>
      <div class="form-group">
        <label for="label">Label</label>
        <input
          type="text"
          class="form-control"
          id="label"
          v-model="data.label"
        />
      </div>

      <div class="form-group">
        <label for="layers">Layers</label>
        <treeselect
          :options="optionsTree"
          :disable-branch-nodes="true"
          :multiple="true"
          :flatten-search-results="true"
          :show-count="true"
          placeholder="Where are you from?"
        />
        <!-- <Multiselect
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
        /> -->
      </div>

      <button type="button" class="btn btn-primary submit-btn" @click="add">
        Add
      </button>
    </form>
  </Modal>
</template>

<script>
import Modal from "../common/Modal";
import Multiselect from "vue-multiselect";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { bunchService } from "@/services";
import { layerController, bunchController } from "@/controllers";
export default {
  name: "ComputedLayersModal",
  components: {
    Modal,
    Multiselect,
    Treeselect
  },
  mounted() {},
  data() {
    return {
      value: null,
      optionsTree: [
        {
          id: "a",
          label: "a",
          children: [
            {
              id: "aa",
              label: "aa"
            },
            {
              id: "ab",
              label: "ab"
            }
          ]
        },
        {
          id: "b",
          label: "b"
        },
        {
          id: "c",
          label: "c"
        }
      ],
      valueTree: null,
      options: ["let", "the", "body", "set", "the", "flow"],
      data: {
        label: "",
        layers: []
      }
    };
  },
  methods: {
    resetData() {
      this.data = {
        label: "",
        layers: []
      };
    },
    add() {
      const { label, layers } = this.data;
      this.data.layers = this.data.layers.map((item, index) => {
        return item.id;
      });
      if (label != "" && layers.length > 0) {
        bunchService
          .add(this.data)
          .then(response => {
            bunchController.add(response.data);
            this.resetData();
            this.$moodal.computedLayerModal.hide();
          })
          .catch(() => {
            "faild";
          });
      }
    }
  },
  computed: {
    dynamicLayersList() {
      let dynamicLayers = layerController.getDynamicLayersWithoutCategory(true);
      let options = dynamicLayers.map((item, index) => {
        return { id: item.id, name: item.name };
      });
      return options;
    }
  }
};
</script>

<style lang="scss">
// TODO Make this (.multiselect) styles global (without '!important')
.multiselect {
  font-size: 14px !important;
}

.multiselect__option:after {
  line-height: 30px !important;
}

.multiselect__option--highlight {
  &,
  &:after {
    background: var(--primary-color-opacity-85) !important;
  }

  &.multiselect__option--selected {
    &,
    &:after {
      background: #e32222 !important;
    }
  }
}

.multiselect__placeholder {
  margin: 0 !important;
}

.multiselect__select {
  height: 30px !important;
}

.multiselect__option {
  padding: 6px 12px !important;
  min-height: 30px !important;
}

.multiselect__tags {
  min-height: 30px !important;
  padding: 2px 40px 0 8px !important;
}

.multiselect__tag {
  background: var(--primary-color-opacity-85) !important;
}

.multiselect__tag-icon:after {
  color: var(--white) !important;
}

.multiselect--active .multiselect__tags {
  padding: 8px 40px 0 8px !important;
}

.submit-btn {
  width: 20%;
  float: right;
}

#computedLayerModal .modal__body {
  overflow: unset;
}
</style>
