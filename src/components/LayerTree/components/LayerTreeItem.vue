<template>
  <li class="list__item">
    <span class="item__header" :style="`padding-left: ${paddingLeft}`">
      <span class="title">
        <!-- Switch -->
        <ToggleSwitch v-if="!isCategory" class="pre" v-model="switchModel" />
        <i class="far fa-folder pre" v-else></i>
        {{ isLayer ? (isCategory ? data.name : data.showingLabel) : data.name }}
      </span>

      <!-- Caret icons -->
      <span v-if="caretIconsVisibility">
        <i
          class="fas fa-caret-down"
          v-show="subListVisibility"
          @click="toggleSubList"
        />
        <i
          class="fas fa-caret-left"
          v-show="!subListVisibility"
          @click="toggleSubList"
        />
      </span>

      <!-- Color and Table icons -->
      <span v-if="operationsVisibility" class="icons">
        <img
          v-if="colorIconVisibility"
          src="@/assets/images/icons/color_fill.svg"
          alt=""
          @click="toggleColorPicker"
        />

        <img
          v-if="tableIconVisibility"
          src="@/assets/images/icons/list.svg"
          alt=""
          @click="getTableData(data)"
        />
        <img
          v-if="deleteIconVisibility"
          src="@/assets/images/icons/delete.svg"
          alt=""
          @click="deleteBunch"
        />
      </span>
    </span>

    <div v-if="colorPickerVisibility" class="mt-2 item__colorpicker__content">
      <div v-if="isLayerColorExist" style="display: contents;">
        <a
          role="button"
          class="condition-modal-btn "
          @click="showConditionModal"
          >{{ $t("general.showConditionsButtonTitle") }}</a
        >
        <ColorConditionInfoModal :data="conditions" />

        <v-select
          v-if="isLayerColorExist"
          class="condition__select"
          v-model="selectedColorConditionId"
          :clearable="false"
          label="title"
          :options="conditions"
          :reduce="(c) => c.id"
        ></v-select>
      </div>

      <!-- Color Picker -->
      <LayerColorPicker
        :borderColor="currentConditionColor.borderColor"
        :fillColor="currentConditionColor.fillColor"
        @onSave="onColorPickerSave"
        @onClose="colorPickerOnClose"
      />
    </div>

    <ul v-if="data.layers && subListVisibility" class="list__content">
      <Draggable
        v-model="children"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="onDraggableMoveCallback"
      >
        <layer-tree-item
          v-for="(child, index) in children"
          :key="child.name + index"
          :item="child"
          @updateList="
            (val) => {
              var d = data;
              d.children[index] = val;
              $emit('updateList', d);
            }
          "
          :parent="data"
          :layerType="layerType"
          :loop="loop + 1"
          :dragOptions="dragOptions"
        />
      </Draggable>
      <Draggable
        v-model="layers"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="onDraggableMoveCallback"
      >
        <layer-tree-item
          v-for="(layer, index) in layers"
          :key="layer.name + index"
          :item="layer"
          @updateList="
            (val) => {
              var d = data;
              d.layers[index] = val;
              $emit('updateList', d);
            }
          "
          :parent="data"
          :layerType="layerType"
          :loop="loop + 1"
          :dragOptions="dragOptions"
        />
      </Draggable>
    </ul>
  </li>
</template>

<script>
import ToggleSwitch from "@/components/common/ToggleSwitch";
import LayerColorPicker from "@/components/LayerColorPicker";
import ColorConditionInfoModal from "@/components/modals/ColorConditionInfoModal";

import Draggable from "vuedraggable";
import { layerHelper, serviceHelper } from "@/helpers";
import { guid } from "@/utils";
import { notifyService } from "@/services";
import {
  bunchController,
  mapController,
  serviceController,
  tableController,
  modalController,
  layerController,
} from "@/controllers";
import bunch from "@/api/bunch";
export default {
  name: "LayerTreeItem",
  components: {
    ToggleSwitch,
    Draggable,
    LayerColorPicker,
    ColorConditionInfoModal,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },

    parent: {
      type: Object,
    },
    loop: {
      type: Number,
      default: 1,
    },
    layerType: {
      type: String,
      required: true,
      default: "",
    },
    dragOptions: {
      type: Object,
      default: function() {
        return {
          disabled: false,
        };
      },
    },
  },
  data() {
    return {
      subListVisibility: false,
      layerIsSelected: false,
      isDragging: false,
      isColorConditionInfoModalVisible: false,
      selectedColorConditionId: -1, //default
    };
  },

  mounted() {},

  computed: {
    data: {
      get() {
        return this.item;
      },
      set(val) {
        this.$emit("updateList", val);
      },
    },
    children: {
      get() {
        return this.data.children;
      },
      set(val) {
        var data = this.data;
        data.children = val;
        this.data = data;
      },
    },

    layers: {
      get() {
        return this.data.layers;
      },
      set(val) {
        var data = this.data;
        data.layers = val;
        this.data = data;
      },
    },
    currentConditionColor() {
      var condition = this.conditions.find(
        (c) => c.id === parseInt(this.selectedColorConditionId)
      );
      var borderColor = condition.borderColor;
      var fillColor = condition.fillColor;

      return { borderColor, fillColor };
    },

    conditions() {
      var options = layerController.getLayerColorConditionList(this.data);
      return options;
    },
    switchModel: {
      get() {
        return this.data.isSelected;
      },
      set(e) {
        if (e.target.checked === false) {
          this.subListVisibility = false;
        }

        this.layerPicker(e);
      },
    },
    paddingLeft() {
      return this.loop * 16 + "px";
    },
    isCategory() {
      return serviceHelper.isCategory(this.data);
    },
    isLayer() {
      return serviceHelper.isLayer(this.data);
    },

    caretIconsVisibility() {
      return (
        this.isCategory ||
        (serviceHelper.isLayer(this.data) &&
          serviceHelper.isDynamicFromArcgis(this.data) &&
          this.data.isSelected)
      );
    },
    tableIconVisibility() {
      return (
        this.data.isSelected &&
        (serviceHelper.isSublayer(this.data) ||
          serviceHelper.isBunch(this.data) ||
          (serviceHelper.isLayer(this.data) &&
            serviceHelper.isDynamicFromLocal(this.data)))
      );
    },
    isLayerColorExist() {
      return this.data.layerColor && this.data.layerColor.conditions.length > 0;
    },
    colorIconVisibility() {
      return (
        this.data.isSelected &&
        this.data.isColorEnabled &&
        (serviceHelper.isSublayer(this.data) ||
          serviceHelper.isBunch(this.data) ||
          (serviceHelper.isLayer(this.data) &&
            serviceHelper.isDynamicFromLocal(this.data)))
      ); // && this.color;
    },
    deleteIconVisibility() {
      return this.data.isColorEnabled && serviceHelper.isBunch(this.data); // && this.color;
    },
    operationsVisibility() {
      return (
        this.tableIconVisibility ||
        this.colorIconVisibility ||
        this.deleteIconVisibility
      );
    },
    colorPickerVisibility() {
      return (
        this.data.isSelected && this.activeColorPickerId === this.getLayerId()
      );
    },
    activeColorPickerId: {
      get() {
        return this.$store.getters.activeColorPickerId;
      },
      set(value) {
        this.$store.dispatch("SAVE_ACTIVE_COLOR_PICKER_ID", value);
      },
    },
  },
  methods: {
    showConditionModal() {
      this.isColorConditionInfoModalVisible = true;
      modalController.showColorConditionInfoModal();
    },

    updateList(val) {
      this.$emit("updateList", val);
    },
    onDraggableMoveCallback() {
      serviceController.onDraggableMoveCallback(this.layerType);
    },
    toggleSubList() {
      this.subListVisibility = !this.subListVisibility;

      // this.dynamicLayersReset(this.data, this.subListVisibility);
    },
    onColorPickerSave(color) {
      new Promise((resolve, reject) => {
        serviceController.saveColor(
          this.data,
          color,
          this.selectedColorConditionId
        );
        resolve();
      }).then(() => {
        mapController.refreshService(this.data);
      });
    },
    colorPickerOnClose() {
      this.activeColorPickerId = null;
    },
    layerPicker(event) {
      let isChecked = event.target.checked;

      if (serviceHelper.isSublayer(this.data)) {
        serviceController.selectSubLayer(
          this.parent,
          this.parent.order,
          this.data.id,
          isChecked
        );
      } else {
        serviceController.selectService(this.data, isChecked);
      }
    },

    async getTableData(data) {
      var service = serviceHelper.isSublayer(data) ? data.parent : data;

      await tableController.getTable(service);
    },
    getLayerId() {
      var id = 0;
      if (serviceHelper.isSublayer(this.data)) {
        id = this.data.uid;
      } else if (
        serviceHelper.isLayer(this.data) &&
        serviceHelper.isDynamicFromLocal(this.data)
      ) {
        id = this.data.id;
      }
      return id;
    },
    toggleColorPicker() {
      if (this.activeColorPickerId === this.getLayerId()) {
        this.activeColorPickerId = null;
      } else {
        this.activeColorPickerId = this.getLayerId();
      }
    },
    deleteBunch() {
      notifyService.areYouSureDeleteRecord((result) => {
        if (result.isConfirmed) {
          bunch.delete(this.data.id).then((response) => {
            this.$store.dispatch("fetchBunchList");
            mapController.deleteService(this.data);
          });
          notifyService.deleted();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .condition__select {
  border-radius: 0px;
  background-color: var(--primary-color);
  width: 90%;
  color: white;
  .vs__selected {
    color: white;
  }
  .vs__search::placeholder,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    background-color: var(--primary-color);
    color: white;
  }
  .vs__selected,
  .vs__dropdown-option {
    color: white;
  }
  .vs__clear,
  .vs__open-indicator {
    fill: var(--primary-color-lighten-200);
  }
}

.condition-modal-btn {
  text-decoration: none;
  color: #4fc3f7;
  width: 90%;
  &:hover,
  &:focus {
    // color: var(--primary-color);
    color: #01579b;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;
  }
}
</style>
